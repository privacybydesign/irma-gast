Javascript bindings of irmaseal-core
====================================

These are browser bindings to
[irmaseal-core](https://github.com/Wassasin/irmaseal) tailored to
the use in IRMA-Welkom.

Prerequisites
-------------

```
cargo install wasm-pack
cargo +nightly install miniserve
```

Local testing
-------------

#### irmaseal-pkg

Build irmaseal-pkg (the key server) and generate parameters:

```
git clone https://github.com/Wassasin/irmaseal
cd irmaseal
cargo build --release
./release/irmaseal-pkg generate
```

And run it:

```
./release/irmaseal-pkg server
```

(Note that this will use an open IRMA server run at
`https://irma-noauth.demo.sarif.nl` by Wouter.)

#### Build wasm

Next we build irmaseal-js to wasm and generate bindings with
(running in the root of the repository:)

```
wasm-pack build --release --target web --out-name wasm --out-dir ./static
```

Then we can host the test website in `static` with

```
miniserve ./static --index index.html
```

See `static/index.html` for an example of the usage of irmaseal-js.
