package common

import (
	"github.com/bwesterb/go-ristretto"

	"crypto/aes"
	"crypto/cipher"
	"encoding/json"
	"fmt"
	"time"
)

type WieCallback struct {
	Token string
	Entry Entry
	Key   string
}

type What struct {
	TelNo string
	EMail string
}

type Entry struct {
	What []byte // encrypted What
	When time.Time
}

type Data map[string][]Entry

func EncryptWhat(pk *ristretto.Point, w What) []byte {
	buf, err := json.Marshal(w)
	if err != nil {
		panic(err)
	}
	return EncryptPadded(pk, buf)
}

func DecryptWhat(sk *ristretto.Scalar, cipherText []byte) (*What, error) {
	var ret What
	buf, err := DecryptPadded(sk, cipherText)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(buf, &ret)
	if err != nil {
		return nil, err
	}
	return &ret, nil
}

func DecryptPadded(sk *ristretto.Scalar, cipherText []byte) ([]byte, error) {
	pt, err := Decrypt(sk, cipherText)
	if err != nil {
		return nil, err
	}
	return pt[1 : pt[0]+1], nil
}

func EncryptPadded(pk *ristretto.Point, plaintext []byte) []byte {
	var padded [101]byte
	if len(plaintext) > 100 {
		panic("Plaintext too large")
	}
	padded[0] = byte(len(plaintext))
	copy(padded[1:], plaintext[:])
	return Encrypt(pk, padded[:])
}

func Decrypt(sk *ristretto.Scalar, cipherText []byte) ([]byte, error) {
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

func Encrypt(pk *ristretto.Point, plaintext []byte) []byte {
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
