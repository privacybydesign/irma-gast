function start_session() {
  const popup = irma.newPopup({
    debugging: true,
    session: {
      url: "http://localhost:8080",
      start: {
        url: (o) => `${o.url}/admin/irmasession_start`,
        method: "GET",
        headers: {},
      },
      mapping: {
        sessionPtr: (r) => r.sessionPtr,
        sessionToken: (r) => r.token,
      },
      result: false
    },
  });

  popup
    .start()
    .then(() => window.location.replace("/admin/irmasession_finish"))
    .catch((error) => console.error("IRMA session failed:", error));
}

start_session();
