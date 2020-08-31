package main

import (
	"github.com/privacybydesign/irmago"
	"github.com/privacybydesign/irmago/server"
	"gopkg.in/yaml.v2"

	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
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
}

type Session struct {
	token   string
	started time.Time
}

var (
	conf = Conf{
		BindAddr:       ":8080",
		PublicKey:      "8e9cdbfac1f7724477e5b4c5520c127b8f4f52d0f1b982f05467e2584bf88c77",
		IrmaConfigPath: "irma_config",
		IrmaServerUrl:  "http://localhost:8088",
		Url:            "http://localhost:8080",
	}

	irmaConf *irma.Configuration
	sessions = make(map[string]Session)
)

func handleCallback(w http.ResponseWriter, r *http.Request) {
	tokens := r.URL.Query()["token"]
	if len(tokens) != 1 {
		http.Error(w, "expected token GET param", http.StatusBadRequest)
		return
	}

	session, ok := sessions[tokens[0]]
	if !ok {
		http.Error(w, "no such session", http.StatusBadRequest)
		return
	}

	result := &server.SessionResult{}
	transport := irma.NewHTTPTransport(conf.IrmaServerUrl+"session/"+
		session.token+"/", false)
	err := transport.Get("result", result)
	if err != nil {
		log.Fatal(err)
	}

	// XXX do we need to check the status field?
	var email, telno string
	for _, as := range result.Disclosed {
		for _, a := range as {
			if a.Identifier == "pbdf.pbdf.mobilenumber.mobilenumber" {
				email = *a.RawValue
			} else if a.Identifier == "pbdf.pbdf.email.email" {
				telno = *a.RawValue
			} else {
				log.Fatalf("Unknown attribute: %s", a.Identifier)
			}
		}
	}

	fmt.Fprintf(w, "%v", result)
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
		log.Fatal(err)
	}

	qr, _ := json.Marshal(pkg.SessionPtr)

	sessions[tokens[0]] = Session{pkg.Token, time.Now()}

	http.Redirect(
		w,
		r,
		"https://irma.app/-/session#"+url.QueryEscape(string(qr)),
		http.StatusFound,
	)
}

func main() {
	var confPath string
	var err error

	flag.StringVar(&confPath, "config", "config.yaml",
		"path to configuration file")
	flag.Parse()

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

	irmaConf, err = irma.NewConfiguration(conf.IrmaConfigPath, irma.ConfigurationOptions{})
	if err != nil {
		log.Fatal(err)
	}

	if err = irmaConf.ParseFolder(); err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/register", handleRegister)
	http.HandleFunc("/callback", handleCallback)

	log.Printf("Listening on %s\n", conf.BindAddr)
	log.Fatal(http.ListenAndServe(conf.BindAddr, nil))
}
