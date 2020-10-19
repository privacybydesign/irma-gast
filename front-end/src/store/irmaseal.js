// TODO Check hmac
// TODO Handle parse errors more gracefully
// TODO Use PBDF server.
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
    console.log(`loaded irmaseal-js: ${module}`);
    let resp = await fetch(url + "/v1/parameters");
    let params = await resp.text();
    return new Client(url, params, module);
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
      throw "Too large to encrypt";
    }
    const paddingBits = 9; // pad to 2^9 - 2 = 510
    let paddedLength = (((l + 1) >> paddingBits) + 1) << paddingBits;
    let buf = new ArrayBuffer(paddedLength);
    let buf8 = new Uint8Array(buf);
    buf8[0] = l >> 8;
    buf8[1] = l & 255;
    new Uint8Array(buf, 2).set(new Uint8Array(bWhat));
    return this.module.encrypt(
      // irmaseal
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

  // Request keys for whose, returns a promise of a key
  // TODO: split in two parts
  // 1) Start IRMA session, resulting in a token
  // 2) Acquire a key per timestamp using said token
  requestKey(whose, timestamp) {
    return irmaFrontend.newPopup({
      session: {
        debugging: true,
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
        result: {
          url: (o, { token }) =>
            `${o.url}/v1/request/${token}/${timestamp.toString()}`,
          parse: (r) => r.key,
        },
      },
    }).start();
  }
}

export default Client;
