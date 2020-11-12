const DOMAIN = "qrona.info";

// URL of waar server
export const WAARSERVERURL = `https://data.${DOMAIN}/api/v1`;

// IRMA server for authenticating guests
export const IRMASERVERURL = `https://${DOMAIN}/irma`;

// Private key generator URL
export const PKGSERVERURL = `https://${DOMAIN}/pkg`;

// Guest QR url
export const guestQRUrl = (id, host) =>
  `https://${DOMAIN}/guest/${encodeURIComponent(id)}/${encodeURIComponent(
    host
  )}`;
