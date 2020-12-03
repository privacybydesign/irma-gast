use wasm_bindgen::prelude::*;

use irmaseal_core::api::*;
use irmaseal_core::stream::{OpenerSealed, Sealer};
use irmaseal_core::{Error, Identity, Readable, UserSecretKey, Writable};

use js_sys::Error as JsError;
use js_sys::{Date, Number, Uint8Array};

use std::cmp::min;
use std::io::{Cursor, Read, Seek, SeekFrom, Write};

// Wrap errors that occur in IRMASeal
pub struct IRMASealError(pub Error);

impl From<IRMASealError> for JsValue {
    fn from(err: IRMASealError) -> Self {
        JsError::new(match err.0 {
            Error::NotIRMASEAL => "Not IRMAseal",
            Error::IncorrectVersion => "Incorrect version",
            Error::ConstraintViolation => "Constraint violation",
            Error::FormatViolation => "Format violation",
            Error::UpstreamWritableError => "Upstream writable error",
            Error::EndOfStream => "End of stream",
            Error::PrematureEndError => "Premature end",
        })
        .into()
    }
}

// Wrap Cursor<Vec<u8>> to be a Writable
struct Buf {
    pub c: Cursor<Vec<u8>>,
    buf: [u8; 1024],
}

impl Buf {
    pub fn new(v: Vec<u8>) -> Buf {
        let c = Cursor::<Vec<u8>>::new(v);
        let buf = [0u8; 1024];
        Buf { c, buf }
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
        let mut x = [0u8; 1];
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
#[wasm_bindgen(catch)]
pub fn encrypt(
    attribute_type: &str,
    whom: &str,
    what: &Uint8Array,
    pars: &str,
) -> Result<Uint8Array, JsValue> {
    let now = (Date::now() as u64) / 1000;
    let mut rng = rand::thread_rng();
    let id = Identity::new(now, attribute_type, Some(whom)).map_err(IRMASealError)?;
    let ppars: Parameters = serde_json::from_str(pars).unwrap();
    let mut buf = Buf::new(Vec::<u8>::new());

    {
        let mut sealer =
            Sealer::new(&id, &ppars.public_key, &mut rng, &mut buf).map_err(IRMASealError)?;
        sealer.write(&what.to_vec()).map_err(IRMASealError)?;
    }

    buf.c.seek(SeekFrom::Start(0)).unwrap();
    let mut ret = Vec::new();
    buf.c.read_to_end(&mut ret).unwrap();
    Ok((&ret[..]).into())
}

// Extracts timestamp from the identity for the ciphertext.
// Returns -1 on failure.
// TODO: Returning Number we loose some precision here, but not all browsers
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
// Throws a javascript error if the HMAC does not validate.
#[wasm_bindgen(catch)]
pub fn decrypt(ciphertext: &Uint8Array, key: &str) -> Result<Uint8Array, JsValue> {
    let (_, o) = OpenerSealed::new(Buf::new(ciphertext.to_vec())).map_err(IRMASealError)?;
    let pkey: UserSecretKey =
        serde_json::from_str(&serde_json::to_string(key).unwrap()[..]).unwrap();
    let mut o = o.unseal(&pkey).map_err(IRMASealError)?;
    let mut buf = Buf::new(Vec::<u8>::new());

    o.write_to(&mut buf).map_err(IRMASealError)?;

    if let false = o.validate() {
        return Err(JsError::new("HMAC does not validate").into());
    }

    buf.c.seek(SeekFrom::Start(0)).unwrap();
    let mut ret = Vec::new();
    buf.c.read_to_end(&mut ret).unwrap();

    Ok((&ret[..]).into())
}
