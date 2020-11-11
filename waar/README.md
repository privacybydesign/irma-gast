qrona data back-end
==========================

A Go webserver that handles administrative tasks and (encrypted) data storage for qrona.info.


Building
========

``` 
go build
```

Running
=======

The server should have access to an IRMA server for authentication. The server should also have
access to a MySQL database (see `irmagast.sql` for commands to setup such a database).
Make sure these included in the configuration. An example file is included in this directory.
Then run:

```
./waar -config config.yml
```

API
===

The server exposes the following json API, consisting of `admin` endpoints for
authenticating an organiser, creating events, getting information on all events a organiser has
and fetching results (i.e., checkins). 


- `GET /admin/irmasession_start` retrieves an irma session package, from which a QR can be displayed to direct the organiser to the irma server. The requestor is given a cookie called `irma-gast`.
- `GET /admin/irmasession_finish` completes the IRMA authentication via email after the organiser has finished the IRMA session. The irma-gast session is now authenticated.

The following endpoints require an authenticated session. If the request is not authenticated the server replies with a `403`.
- `POST /admin/register` expects a JSON body containing fields `name`, `location` and `onetime` and returns a `200` on succces. One-time events are automatically removed 14 days after no check-ins have been made.
- `GET /admin/overview` returns an overview of all events for this organiser.
- `GET /admin/results/{location_id}` returns all encrypted ciphertexts (in JWT form) of checked-in guests for a location. The receiver of this data is responsible for verifying these JWTs.
- `DELETE /admin/remove/{location_id}` removes a location and corresponding checkins. No going back, so make the admin is sure about the operation. Returns `200` on success.

Finally, 
- `GET /admin/logout` dismisses the current session.

The API exposes one endpoint for dumping ciphertext data (to be used by guests after scanning a QR).
- `POST /gast/gastsession` expects a JSON body containg fields `location_id` (included in the QR) and `ciphertext`,
a ciphertext of his/her contact information, base64 encoded. Returns a `200` on success.
