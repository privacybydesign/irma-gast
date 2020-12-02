import init, {encrypt, decrypt, extract_timestamp} from "./wasm.js";

// TODO Check hmac
// TODO Handle parse errors more gracefully
// TODO Use PBKDF server.

class Client {
    // Don't use the constructor -- use Client.build().
    constructor(url, params) {
        this.url = url;
        this.params = params;
    }

    // Creates a new client for the irmaseal-pkg with the given url.
    static async build(url) {
        await init(); // preallocate buffers for wasm bindings and such.
        let resp = await fetch(url + "/v1/parameters");
        let params = await resp.text();
        return new Client(url, params);
    }

    // Returns the timestamp from a ciphertext.
    extractTimestamp(ciphertext) {
        return extract_timestamp(ciphertext);
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
        let paddedLength = ((((l + 1) >> paddingBits) + 1) << paddingBits);
        let buf = new ArrayBuffer(paddedLength);
        let buf8 = new Uint8Array(buf);
        buf8[0] = l >> 8;
        buf8[1] = l & 255;
        new Uint8Array(buf, 2).set(new Uint8Array(bWhat));
        return encrypt( // irmaseal
            whom,
            new Uint8Array(buf),
            this.params
        );
    }

    decrypt(key, ct) {
        let buf =  decrypt(ct, key);
        let len = (buf[0] << 8) | buf[1];
        let decoder = new TextDecoder();
        return JSON.parse(decoder.decode(buf.slice(2, 2 + len)));
    }

    // Request key for whose.  Displays qr in element with id qrId.
    async requestKey(whose, timestamp, qrId) {
        let resp = await fetch(this.url + "/v1/request", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                attribute: {
                    type: "pbdf.pbdf.email.email",
                    value: whose
                }
            })
        });
        let challenge = await resp.json();
        let qr = document.getElementById(qrId);

        new QRCode(qr, challenge.qr);

        while(true) {
            let rawResp = await fetch(this.url + "/v1/request/" + challenge.token
                    + "/" + timestamp.toString());
            resp = await rawResp.json();
            await new Promise(r => setTimeout(r, 500));
            if (resp.status == "CONNECTED") {
                qr.innerText = "Ok, please accept!";
            } else if (resp.status == "CANCELLED") {
                qr.innerText = "You cancelled :(";
            } else if (resp.status == "DONE_VALID") {
                qr.innerText = "Thank you! :)";
                break;
            } else if (resp.status != "INITIALIZED") {
                throw "unknown status: " + resp.status;
            }
        }

        return resp.key;
    }
}

export default Client;
