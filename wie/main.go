package main

import (
	"github.com/privacybydesign/irma-gast/common"

	"github.com/bwesterb/go-ristretto"
	"github.com/privacybydesign/irmago"
	"github.com/privacybydesign/irmago/server"
	"gopkg.in/yaml.v2"

	"bytes"
	"encoding/hex"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"sync"
	"time"
)

// Configuration
type Conf struct {
	// URL of the server
	Url string `yaml:"url"`

	// Address to bind to
	BindAddr string `yaml:"bindAddr"`

	// Public key to encrypt to
	PublicKey string `yaml:"publicKey"`

	// Irma server URL
	IrmaServerUrl string `yaml:"irmaServerUrl"`

	// Path to Irma configuration
	IrmaConfigPath string `yaml:"irmaConfigPath"`

	// Path to the What server
	WhatUrl string `yaml:"whatUrl"`

	// Key to use to authenticate to what server
	WhatKey string `yaml:"whatKey"`
}

type Session struct {
	token   string
	started time.Time
}

var (
	conf = Conf{
		BindAddr:       ":8081",
		PublicKey:      "8e9cdbfac1f7724477e5b4c5520c127b8f4f52d0f1b982f05467e2584bf88c77",
		IrmaConfigPath: "irma_config",
		IrmaServerUrl:  "http://localhost:8088",
		Url:            "http://localhost:8081",
		WhatUrl:        "http://localhost:8080",
	}

	irmaConf *irma.Configuration
	pk       ristretto.Point

	sessions = make(map[string]Session)
	mux      sync.Mutex // protects sessions
)

func handleCallback(w http.ResponseWriter, r *http.Request) {
	log.Printf("Handling callback")
	tokens := r.URL.Query()["token"]
	if len(tokens) != 1 {
		http.Error(w, "expected token GET param", http.StatusBadRequest)
		return
	}

	mux.Lock()
	session, ok := sessions[tokens[0]]
	if ok {
		delete(sessions, tokens[0])
	}
	mux.Unlock()
	if !ok {
		http.Error(w, "no such session", http.StatusBadRequest)
		return
	}

	// Retrieve the result
	result := &server.SessionResult{}
	transport := irma.NewHTTPTransport(conf.IrmaServerUrl+"session/"+
		session.token+"/", false)
	err := transport.Get("result", result)
	if err != nil {
		log.Printf("failed to retrieve result: %v", err)
		return
	}

	// XXX do we need to check the status field?
	var what common.What
	var entry common.Entry
	entry.When = time.Now()

	for _, as := range result.Disclosed {
		for _, a := range as {
			id := a.Identifier.String()
			if id == "pbdf.pbdf.mobilenumber.mobilenumber" {
				what.TelNo = *a.RawValue
			} else if id == "pbdf.pbdf.email.email" {
				what.EMail = *a.RawValue
			} else {
				log.Printf("Unknown attribute: %s", id)
				return
			}
		}
	}

	// Prepare request to waar server
	entry.What = common.EncryptWhat(&pk, what)
	cb := common.WieCallback{Token: tokens[0], Entry: entry, Key: conf.WhatKey}
	cbb, _ := json.Marshal(cb)

	resp, err := http.Post(
		conf.WhatUrl+"/gastsession_results.php",
		"application/json",
		bytes.NewBuffer(cbb),
	)
	log.Printf("posting %v", what)
	if err != nil {
		log.Printf("failed to post to waar server: %v", err)
		return
	} else if resp.StatusCode != 200 {
		log.Printf("waar server responded with %v", resp)
		return
	} else {
		log.Printf("waar server responded with %v", resp)
	}

	// XXX prettier page or redirect.
	fmt.Fprintf(w, "Thank you, your attendance has been registered!")
}

func handleRegister(w http.ResponseWriter, r *http.Request) {
	tokens := r.URL.Query()["token"]
	if len(tokens) != 1 {
		http.Error(w, "expected token GET param", http.StatusBadRequest)
		return
	}

	var request irma.RequestorRequest

	request = &irma.ServiceProviderRequest{
		Request: irma.NewDisclosureRequest(),
	}

	baseReq := request.SessionRequest().Base()
	baseReq.ClientReturnURL = conf.Url + "/callback?token=" + url.QueryEscape(tokens[0])

	request.SessionRequest().(*irma.DisclosureRequest).Disclose = irma.AttributeConDisCon{
		irma.AttributeDisCon{
			// irma.AttributeCon{
			//     irma.NewAttributeRequest("pbdf.pbdf.email.email"),
			//     irma.NewAttributeRequest("pbdf.pbdf.mobilenumber.mobilenumber"),
			// },
			irma.AttributeCon{irma.NewAttributeRequest("pbdf.pbdf.mobilenumber.mobilenumber")},
			irma.AttributeCon{irma.NewAttributeRequest("pbdf.pbdf.email.email")},
		},
	}

	transport := irma.NewHTTPTransport(conf.IrmaServerUrl, false)
	pkg := &server.SessionPackage{}
	err := transport.Post("session", pkg, request)
	if err != nil {
		log.Printf("failed to start session: %v", err)
		return
	}

	qr, _ := json.Marshal(pkg.SessionPtr)

	session := Session{pkg.Token, time.Now()}
	mux.Lock()
	sessions[tokens[0]] = session
	mux.Unlock()

	http.Redirect(
		w,
		r,
		"https://irma.app/-/session#"+url.QueryEscape(string(qr)),
		http.StatusFound,
	)
	log.Printf("Register complete, waiting for callback")
}

func main() {
	var confPath string
	var err error

	flag.StringVar(&confPath, "config", "config.yaml",
		"path to configuration file")
	flag.Parse()

	// Load config
	if _, err := os.Stat(confPath); os.IsNotExist(err) {
		fmt.Printf("Error: could not find configuration file: %s\n\n", confPath)
		fmt.Printf("Example configuration file:\n\n")

		buf, _ := yaml.Marshal(&conf)
		fmt.Printf("%s\n", buf)
		return
	} else {
		buf, err := ioutil.ReadFile(confPath)
		if err != nil {
			log.Fatalf("Could not read %s: %v", confPath, err)
		}
		err = yaml.Unmarshal(buf, &conf)
		if err != nil {
			log.Fatalf("Could not parse config files: %v", err)
		}
	}

	// Load public key
	buf, err := hex.DecodeString(conf.PublicKey)
	if err != nil {
		log.Fatalf("Coudldn't parse public key: %v", err)
	}
	err = pk.UnmarshalBinary(buf)
	if err != nil {
		log.Fatalf("Coudldn't load public key: %v", err)
	}

	// Prepare Irma client
	//irmaConf, err = irma.NewConfiguration(conf.IrmaConfigPath, irma.ConfigurationOptions{})
	//if err != nil {
	//	log.Fatal(err)
	//}

	//if err = irmaConf.ParseFolder(); err != nil {
	//	log.Fatal(err)
	//}

	// Prepare webserver
	http.HandleFunc("/register", handleRegister)
	http.HandleFunc("/callback", handleCallback)

	// Prune sessions older than 5 minutes
	ticker := time.NewTicker(60 * time.Second)
	go func() {
		for _ = range ticker.C {
			mux.Lock()
			threshold := time.Now().Add(-5 * 60 * time.Second)
			for k, session := range sessions {
				if session.started.Before(threshold) {
					delete(sessions, k)
				}
			}
			mux.Unlock()
		}
	}()

	log.Printf("Listening on %s\n", conf.BindAddr)
	log.Fatal(http.ListenAndServe(conf.BindAddr, nil))
}
