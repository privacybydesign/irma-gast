package main

import (
	"github.com/bwesterb/go-ristretto"
	"github.com/urfave/cli"

	"github.com/privacybydesign/irma-gast/common"

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

	buf, err := common.Decrypt(privateKey, encBuf)
	if err != nil {
		return err
	}

	var data common.Data
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
			what, err := common.DecryptWhat(privateKey, entry.What)
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

	data := common.Data{
		"Cafe Bart": []common.Entry{
			{
				When: when,
				What: common.EncryptWhat(&pk, common.What{EMail: "name@domain.nl"}),
			},
			{
				When: when,
				What: common.EncryptWhat(&pk, common.What{TelNo: "0612345678"}),
			},
		},
		"Cafe Jean": []common.Entry{
			{
				When: when,
				What: common.EncryptWhat(&pk, common.What{EMail: "a@bc.de", TelNo: "044421144"}),
			},
		},
	}

	buf, _ := json.Marshal(data)
	encrypted := common.Encrypt(&pk, buf)

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
