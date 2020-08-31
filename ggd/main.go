package main

import (
	"github.com/bwesterb/go-ristretto"
	"github.com/urfave/cli"

	"crypto/aes"
	"crypto/cipher"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"
)

var (
	keyFile = "ggd-irmagast-secret.key"
)

type What struct {
	TelNo string
	EMail string
}

type Entry struct {
	What []byte // encrypted What
	When time.Time
}

type Data map[string][]Entry

func encryptWhat(pk *ristretto.Point, w What) []byte {
	buf, err := json.Marshal(w)
	if err != nil {
		panic(err)
	}
	return encryptPadded(pk, buf)
}

func decryptWhat(sk *ristretto.Scalar, cipherText []byte) (*What, error) {
	var ret What
	buf, err := decryptPadded(sk, cipherText)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(buf, &ret)
	if err != nil {
		return nil, err
	}
	return &ret, nil
}

func decryptPadded(sk *ristretto.Scalar, cipherText []byte) ([]byte, error) {
	pt, err := decrypt(sk, cipherText)
	if err != nil {
		return nil, err
	}
	return pt[1 : pt[0]+1], nil
}

func encryptPadded(pk *ristretto.Point, plaintext []byte) []byte {
	var padded [101]byte
	if len(plaintext) > 100 {
		panic("Plaintext too large")
	}
	padded[0] = byte(len(plaintext))
	copy(padded[1:], plaintext[:])
	return encrypt(pk, padded[:])
}

func decrypt(sk *ristretto.Scalar, cipherText []byte) ([]byte, error) {
	var symKey, rB, c, blind ristretto.Point
	var nonce [12]byte
	err := c.UnmarshalBinary(cipherText[:32])
	if err != nil {
		return nil, fmt.Errorf("Parsing c: %v", err)
	}
	err = rB.UnmarshalBinary(cipherText[32:64])
	if err != nil {
		return nil, fmt.Errorf("Parsing rB: %v", err)
	}
	blind.ScalarMult(&rB, sk)
	symKey.Sub(&c, &blind)
	block, _ := aes.NewCipher(symKey.Bytes())
	gcm, _ := cipher.NewGCM(block)
	pt, err := gcm.Open(nil, nonce[:], cipherText[64:], nil)
	if err != nil {
		return nil, fmt.Errorf("AES GCM: %v", err)
	}
	return pt, nil
}

func encrypt(pk *ristretto.Point, plaintext []byte) []byte {
	// We generate a random Ristretto point whose binary representation we'll
	// use as AES256 GCM key.  This point we encrypt using El'Gamal for
	// the public key.
	var symKey, rB, c ristretto.Point
	var r ristretto.Scalar
	var nonce [12]byte // zero IV is fine as we don't reuse symKey

	r.Rand()
	rB.ScalarMultBase(&r)
	symKey.Rand()
	c.ScalarMult(pk, &r)
	c.Add(&c, &symKey) // c = symKey + r pk

	block, _ := aes.NewCipher(symKey.Bytes())
	gcm, _ := cipher.NewGCM(block)
	symCt := gcm.Seal(nil, nonce[:], plaintext[:], nil)

	return append(
		append(
			c.Bytes(),
			rB.Bytes()...,
		),
		symCt...,
	)
}

func gotKeyFile() bool {
	info, err := os.Stat(keyFile)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}

func loadPrivateKey() (*ristretto.Scalar, error) {
	if !gotKeyFile() {
		return nil, cli.NewExitError("Cannot find private key.", 2)
	}

	buf, err := ioutil.ReadFile(keyFile)
	if err != nil {
		return nil, fmt.Errorf("Error reading file: %v", err)
	}

	var ret ristretto.Scalar
	err = ret.UnmarshalBinary(buf)
	if err != nil {
		return nil, fmt.Errorf("Failed to parse private key: %v", err)
	}

	return &ret, nil
}

func cmdPk(c *cli.Context) error {
	privateKey, err := loadPrivateKey()
	if err != nil {
		return err
	}

	var publicKey ristretto.Point
	publicKey.ScalarMultBase(privateKey)
	fmt.Printf("The public key is: %x\n", publicKey.Bytes())

	return nil
}

func cmdKeyGen(c *cli.Context) error {
	var privateKey ristretto.Scalar
	var publicKey ristretto.Point

	if gotKeyFile() {
		return cli.NewExitError("Keyfile already exists, aborting.", 1)
	}

	privateKey.Rand()
	publicKey.ScalarMultBase(&privateKey)

	err := ioutil.WriteFile(keyFile, privateKey.Bytes(), 0600)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Generated a new keypair.\n")
	fmt.Printf("Private key is stored in: %s\n", keyFile)
	fmt.Printf("The public key is: %x\n", publicKey.Bytes())

	return nil
}

func cmdDecrypt(c *cli.Context) error {
	privateKey, err := loadPrivateKey()
	if err != nil {
		return err
	}

	encBuf, err := ioutil.ReadFile(c.String("in"))
	if err != nil {
		return cli.NewExitError(
			fmt.Sprintf("Error reading %s: %v", c.String("in"), err), 4)
	}

	buf, err := decrypt(privateKey, encBuf)
	if err != nil {
		return err
	}

	var data Data
	err = json.Unmarshal(buf, &data)

	if err != nil {
		return cli.NewExitError(
			fmt.Sprintf("%s: failed to parse JSON: %v", c.String("in"), err), 5)
	}

	f, err := os.Create(c.String("out"))
	if err != nil {
		return cli.NewExitError(
			fmt.Sprintf("%s: failed to create: %v", c.String("out"), err), 6)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	w.Write([]string{
		"When",
		"Where",
		"E-Mail",
		"Telephone number",
	})

	n := 0
	for where, entries := range data {
		for _, entry := range entries {
			what, err := decryptWhat(privateKey, entry.What)
			if err != nil {
				return cli.NewExitError(
					fmt.Sprintf("%s: failed to decrypt entry: %v",
						c.String("out"), err), 8)
			}
			n++
			w.Write([]string{
				entry.When.String(),
				where,
				what.EMail,
				what.TelNo,
			})
		}
	}

	w.Flush()
	if err := w.Error(); err != nil {
		return cli.NewExitError(
			fmt.Sprintf("%s: failed to write: %v", c.String("out"), err), 7)
	}

	fmt.Printf("%s: wrote %d entries\n", c.String("out"), n)

	return nil
}

func cmdTest(c *cli.Context) error {
	privateKey, err := loadPrivateKey()
	if err != nil {
		return err
	}

	var pk ristretto.Point
	pk.ScalarMultBase(privateKey)

	when := time.Now()

	data := Data{
		"Cafe Bart": []Entry{
			{
				When: when,
				What: encryptWhat(&pk, What{EMail: "name@domain.nl"}),
			},
			{
				When: when,
				What: encryptWhat(&pk, What{TelNo: "0612345678"}),
			},
		},
		"Cafe Jean": []Entry{
			{
				When: when,
				What: encryptWhat(&pk, What{EMail: "a@bc.de", TelNo: "044421144"}),
			},
		},
	}

	buf, _ := json.Marshal(data)
	encrypted := encrypt(&pk, buf)

	err = ioutil.WriteFile(c.String("out"), encrypted, 0644)
	if err != nil {
		return cli.NewExitError(
			fmt.Sprintf(
				"Failed to write file: %v", err), 3)
	}

	return nil
}

func main() {
	app := cli.NewApp()

	app.Commands = []cli.Command{
		{
			Name:   "keygen",
			Usage:  "Generate a new keypair",
			Action: cmdKeyGen,
		},
		{
			Name:   "pk",
			Usage:  "Prints the public key",
			Action: cmdPk,
		},
		{
			Name:   "test",
			Usage:  "Creates a test encrypted attendance report",
			Action: cmdTest,
			Flags: []cli.Flag{
				cli.StringFlag{
					Name:  "out, o",
					Usage: "Write attendance to `FILE`",
					Value: "irmagast.csv.encrypted",
				},
			},
		},
		{
			Name:   "decrypt",
			Usage:  "Decrypts an attendance report",
			Action: cmdDecrypt,
			Flags: []cli.Flag{
				cli.StringFlag{
					Name:  "in, i",
					Usage: "Read encrypted attendance from `FILE`",
					Value: "irmagast.csv.encrypted",
				},
				cli.StringFlag{
					Name:  "out, o",
					Usage: "Write attendance to `FILE`",
					Value: "irmagast.csv",
				},
			},
		},
	}

	app.Run(os.Args)
}
