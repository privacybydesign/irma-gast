// TODO Check hmac
// TODO Handle parse errors more gracefully
import irmaFrontend from "@privacybydesign/irma-frontend";

class Client {
  // Don't use the constructor -- use Client.build().
  constructor(url, params, module) {
    this.url = url;
    this.params = params;
    this.module = module;
  }

  // Creates a new client for the irmaseal-pkg with the given url.
  static async build(url) {
    let module = await import("irmaseal-js");
    let resp = await fetch(url + "/v1/parameters");
    let params = await resp.text();
    let client = new Client(url, params, module);
    //console.log("initalizing panic hook");
    //client.module.init_panic_hook();
    return client;
  }

  // Returns the timestamp from a ciphertext.
  extractTimestamp(ciphertext) {
    return this.module.extract_timestamp(ciphertext);
  }

  encrypt(whom, what) {
    // We JSON encode the what object, pad it to a multiple of 2^9 bytes
    // with size prefixed and then pass it to irmaseal.
    let encoder = new TextEncoder();
    let bWhat = encoder.encode(JSON.stringify(what));
    let l = bWhat.byteLength;
    if (l >= 65536 - 2) {
      throw new Error("Too large to encrypt");
    }
    const paddingBits = 9; // pad to 2^9 - 2 = 510
    let paddedLength = (((l + 1) >> paddingBits) + 1) << paddingBits;
    let buf = new ArrayBuffer(paddedLength);
    let buf8 = new Uint8Array(buf);
    buf8[0] = l >> 8;
    buf8[1] = l & 255;
    new Uint8Array(buf, 2).set(new Uint8Array(bWhat));
    return this.module.encrypt(
      "pbdf.sidn-pbdf.email.email",
      whom,
      new Uint8Array(buf),
      this.params
    );
  }

  decrypt(key, ct) {
    let buf = this.module.decrypt(ct, key);
    let len = (buf[0] << 8) | buf[1];
    let decoder = new TextDecoder();
    return JSON.parse(decoder.decode(buf.slice(2, 2 + len)));
  }

  // 1) Start IRMA session, resulting in a token
  requestToken(whose) {
    return irmaFrontend
      .newPopup({
        debugging: true,
        session: {
          url: this.url,
          start: {
            url: (o) => `${o.url}/v1/request`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              attribute: {
                type: "pbdf.sidn-pbdf.email.email",
                value: whose,
              },
            }),
          },
          mapping: {
            sessionPtr: (r) => JSON.parse(r.qr),
            sessionToken: (r) => r.token,
          },
          result: false,
        },
      })
      .start()
      .then((map) => map.sessionToken);
  }

  // 2) Acquire a key per timestamp using said token
  requestKey(token, timestamp) {
    let url = this.url;
    return new Promise(function (resolve, reject) {
      fetch(`${url}/v1/request/${token}/${timestamp.toString()}`)
        .then((resp) => {
          return resp.status !== 200
            ? reject(new Error("not ok"))
            : resp.json();
        })
        .then((json) => {
          return json.status !== "DONE_VALID"
            ? reject(new Error("not valid"))
            : resolve(json.key);
        });
    });
  }
}

export default Client;
