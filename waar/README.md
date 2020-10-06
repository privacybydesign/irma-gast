irma-welkom data back-end
==========================

A Go webserver that handles administrative tasks and (encrypted) data storage for irma-welkom.nl.


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


- `/admin/irmasession_start` retrieves an irma session package, from which a QR can be displayed to direct the organiser to the irma server. The requestor is given a cookie called `irma-gast`.
- `/admin/irmasession_finish` completes the IRMA authentication via email after the organiser has finished the IRMA session. The irma-gast session is now authenticated.

The following endpoints require an authenticated session.
- `/admin/register` expects a JSON body containing fields `name`, `location` and `onetime` and returns a `200` on succces. One-time events are automatically removed 14 days after no check-ins have been made.
- `/admin/overview` returns an overview of all events for this organiser.
- `/admin/results/{location_id}` returns all encrypted ciphertexts (in JWT form) of checked-in guests for a location. The receiver of this data is responsible for verifying these JWTs.

Finally, 
- `/admin/logout` dismisses the current session.

The API exposes one endpoint for dumping ciphertext data (to be used by guests after scanning a QR).
- `/gast/gastsession` expects a JSON body containg fields `location_id` (included in the QR) and `ciphertext`,
a ciphertext of his/her contact information, base64 encoded. Returns a `200` on success.


TODO
===
Admins should be able to delete an event.
...
