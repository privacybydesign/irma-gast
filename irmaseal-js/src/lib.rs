use wasm_bindgen::prelude::*;

use irmaseal_core::api::*;
use irmaseal_core::{Identity,Writable,Readable,Error,UserSecretKey};
use irmaseal_core::stream::{Sealer,OpenerSealed};

use js_sys::{Uint8Array,Date,Number};

use std::io::{Cursor, SeekFrom, Seek, Write, Read};
use std::cmp::min;

// Wrap Cursor<Vec<u8>> to be a Writable
struct Buf {
    pub c: Cursor<Vec<u8>>,
    buf: [u8;1024]
}

impl Buf {
    pub fn new(v: Vec<u8>) -> Buf {
        let c = Cursor::<Vec<u8>>::new(v);
        let buf = [0u8;1024];
        Buf{c,buf}
    }
}

impl Writable for Buf {
    fn write(&mut self, bytes: &[u8]) -> Result<(), Error> {
        self.c.write_all(bytes).unwrap();
        Ok(())
    }
}

impl Readable for Buf {
    fn read_byte(&mut self) -> Result<u8, Error> {
        let mut x = [0u8;1];
        self.c.read_exact(&mut x[..]).unwrap();
        Ok(x[0])
    }

    fn read_bytes(&mut self, n: usize) -> Result<&[u8], Error> {
        let len = self.buf.len();
        let mut ret = &mut self.buf[..min(n, len)];
        let read = self.c.read(&mut ret).unwrap();
        Ok(&ret[..read])
    }
}

// Main part.

// Encrypts the buffer what for the e-mail address whom using the given
// parameters.
#[wasm_bindgen]
pub fn encrypt(whom: &str, what: &Uint8Array, pars: &str) -> Uint8Array {
    let now = (Date::now() as u64) / 1000;
    let mut rng = rand::thread_rng();
    let id = Identity::new(
        now,
        "pbdf.pbdf.email.email",
        Some(whom),
    ).unwrap();
    let ppars : Parameters = serde_json::from_str(pars).unwrap();
    let mut buf = Buf::new(Vec::<u8>::new());

    {
        let mut sealer = Sealer::new(
            &id,
            &ppars.public_key,
            &mut rng,
            &mut buf
        ).unwrap();
        sealer.write(&what.to_vec()).unwrap();
    }

    buf.c.seek(SeekFrom::Start(0)).unwrap();
    let mut ret = Vec::new();
    buf.c.read_to_end(&mut ret).unwrap();
    (&ret[..]).into()
}

// Extracts timestamp from the identity for the ciphertext.
// 
// TODO Returning Number we loose some precission here, but not all browsers
//      support BigInt64Array yet, which wasm_bindgen uses to return i64.
#[wasm_bindgen]
pub fn extract_timestamp(ciphertext: &Uint8Array) -> Number {
    let res = OpenerSealed::new(Buf::new(ciphertext.to_vec()));
    match res {
        Ok((identity, _)) => (identity.timestamp as f64).into(),
        Err(_) => (-1).into(),
    }
}

// Decrypts ct using the given base64 encoded key.
#[wasm_bindgen]
pub fn decrypt(ciphertext: &Uint8Array, key: &str) -> Uint8Array {
    let (_, o) = OpenerSealed::new(Buf::new(ciphertext.to_vec())).unwrap();
    let pkey : UserSecretKey = serde_json::from_str(
        &serde_json::to_string(key).unwrap()[..]).unwrap();
    let mut o = o.unseal(&pkey).unwrap();
    let mut buf = Buf::new(Vec::<u8>::new());
    o.write_to(&mut buf);

    buf.c.seek(SeekFrom::Start(0)).unwrap();
    let mut ret = Vec::new();
    buf.c.read_to_end(&mut ret).unwrap();
    (&ret[..]).into()
}
