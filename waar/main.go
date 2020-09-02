package main

import (
	"bytes"
	"encoding/json"

	irma "github.com/privacybydesign/irmago"
	server "github.com/privacybydesign/irmago/server"
	"gopkg.in/yaml.v2"

	"database/sql"
	"encoding/gob"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
)

// Configuration
type Conf struct {
	// URL of the server
	Url string `yaml:"url"`

	// Address to bind to
	BindAddr string `yaml:"bindAddr"`

	// Path to the who-server
	WhoServerUrl string `yaml:"whoServerUrl"`

	// IRMA server url for email authentication
	IrmaServerURL string `yaml:"irmaServerURL"`

	// Database stuff
	DbDriver string `yaml:"db"`
	DbHost   string `yaml:"dbHost"`
	DbUser   string `yaml:"dbUser"`
	DbPass   string `yaml:"dbPass"`
	DbName   string `yaml:"dbName"`
}

type User struct {
	Email         string
	Authenticated bool
	Token         string // irma session token for the to-be-authenticated user
}

var (
	// A standard configuration
	conf = Conf{
		Url:           "http://localhost:8080",
		WhoServerUrl:  "http://localhost:8081",
		IrmaServerURL: "http://localhost:8088",
		DbDriver:      "mysql",
		DbHost:        "localhost",
		DbUser:        "irmagast",
		DbPass:        "irmagast",
		DbName:        "test",
	}

	// The database
	db *sql.DB

	// Session storage
	store *sessions.CookieStore
)

func readConfig(confPath string) {
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
}

func initSessionStorage() {
	authKeyOne := securecookie.GenerateRandomKey(64)
	encryptionKeyOne := securecookie.GenerateRandomKey(32)

	store = sessions.NewCookieStore(
		authKeyOne,
		encryptionKeyOne,
	)

	store.Options = &sessions.Options{
		MaxAge:   60 * 5,
		HttpOnly: true,
	}
	gob.Register(User{})
}

func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "views/index.html")
}

func Login(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "views/login.html")
}

func IrmaSessionStart(w http.ResponseWriter, r *http.Request) {
	log.Println("starting irma session")
	request := irma.NewDisclosureRequest()
	request.Disclose = irma.AttributeConDisCon{
		irma.AttributeDisCon{
			irma.AttributeCon{irma.NewAttributeRequest("pbdf.pbdf.email.email")},
		},
	}
	log.Printf("sending session request to: %v", conf.IrmaServerURL+"/session/")
	requestBytes, _ := json.Marshal(request)
	resp, err := http.Post(conf.IrmaServerURL+"/session/", "application/json", bytes.NewBuffer(requestBytes))
	if err != nil {
		log.Printf("failed to post session request to irma server: %v", err)
		return
	}
	answer, _ := ioutil.ReadAll(resp.Body)
	jsonStr := string(answer)
	log.Printf("Got response: %v", jsonStr)

	var pkg server.SessionPackage
	json.Unmarshal(answer, &pkg)

	// Start a user session
	session, err := store.Get(r, "irmagast")
	if err != nil {
		log.Printf("error getting new session: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	session.Values["user"] = &User{
		Email:         "",
		Authenticated: false,
		Token:         pkg.Token,
	}
	err = session.Save(r, w)
	if err != nil {
		log.Printf("error saving new session: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, jsonStr) // Print the sessionPkg
}

func IrmaSessionFinish(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "irmagast")
	if err != nil {
		log.Printf("no session found: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	token := session.Values["user"].(User).Token

	result := &server.SessionResult{}
	transport := irma.NewHTTPTransport(conf.IrmaServerURL+"/session/"+token, false)
	err = transport.Get("result", result)
	if err != nil {
		log.Printf("Couldn't get session results: %v", err)
		return
	}
	email := result.Disclosed[0][0].RawValue
	log.Printf("updating user with: %v", *email)
	session.Values["user"] = &User{
		Email:         *email,
		Authenticated: true,
	}
	session.Save(r, w)
	http.Redirect(w, r, "overview", http.StatusPermanentRedirect)
}

func Register(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "irmagast")
	if err != nil {
		log.Printf("no session: %v", err)
		return
	}
	switch r.Method {
	case "GET":
		http.ServeFile(w, r, "views/register.html")
	case "POST":
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		name := r.FormValue("name")
		location := r.FormValue("location")
		terms := r.FormValue("terms")
		fmt.Fprintf(w, "%s %s %s", location, name, terms)
		if terms == "yes" {
			stmt, err := db.Prepare("INSERT INTO locations (name, location, email) VALUES (?, ?, ?)")
			defer stmt.Close()
			if err != nil {
				log.Printf("wrong prepared statement: %v", err)
			}
			_, err = stmt.Exec(name, location, session.Values["user"].(User).Email)
			if err != nil {
				log.Printf("failed: %v", err)
			}

		}
	default:
		fmt.Fprintf(w, "only GET and POST methods are supported.")
	}
}

func Overview(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "irmagast")
	if err != nil {
		log.Printf("no session: %v", err)
		return
	}
	fmt.Fprintf(w, "Hoi %s", session.Values["user"].(User).Email)
}

// for gast sessions, NOT admin
func GastSession(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		// Start GUEST_SESSION
		// Handle redirects to self, delete location information from url
	case "POST":
	// Handle incoming results from wie-server with token for GUEST_SESSION
	default:
		fmt.Fprintln(w, "only GET and POST")
	}
}

func main() {
	var confPath string
	var err error

	flag.StringVar(&confPath, "config", "config.yaml", "path to configuration file")
	flag.Parse()

	readConfig(confPath)

	db, err = sql.Open(conf.DbDriver, fmt.Sprintf("%s:%s@tcp(%s:3306)/%s", conf.DbUser, conf.DbPass, conf.DbHost, conf.DbName))
	if err != nil {
		log.Fatalf("Could not connect to the DB %v", err)
	}

	initSessionStorage()

	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets/"))))
	http.HandleFunc("/", Index)

	// "admin" endpoints
	http.HandleFunc("/login", Login)
	http.HandleFunc("/register", Register)
	http.HandleFunc("/overview", Overview)
	http.HandleFunc("/irmasession_start", IrmaSessionStart)
	http.HandleFunc("/irmasession_finish", IrmaSessionFinish)

	// "gastsession" endpoints to start and finish a gastsession
	http.HandleFunc("/gastsession", GastSession)

	log.Printf("Listening on %s\n", conf.BindAddr)
	err = http.ListenAndServe(conf.BindAddr, nil)
	if err != nil {
		log.Fatalf("err: %v", err)
	}
}
