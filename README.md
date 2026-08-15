# CodeVent Web Development Course — Payment Worker

This Worker verifies Paystack payments and issues/verifies signed course
access tokens. It is deployed separately from GitHub Pages — GitHub Pages
serves the static course site, this Worker serves the backend API.

## Deploy

From this `worker/` folder, with the Cloudflare CLI (`wrangler`) installed
and logged in to the `emezch93` account:

```
npm install -g wrangler   # if not already installed
wrangler login
wrangler deploy
```

This deploys to:

https://codevent-web-development-course.emezch93.workers.dev

The Worker name in `wrangler.toml` matches the URL already hardcoded in
`access.html`, so no frontend change is needed after deploying.

## Required secrets

Set these once, after the first deploy (they are never stored in the repo):

```
wrangler secret put PAYSTACK_SECRET_KEY
```
Paste your Paystack **test** secret key when prompted (starts with `sk_test_`).
Do not use a live secret key while testing.

```
wrangler secret put ACCESS_TOKEN_SECRET
```
Paste any long random string when prompted — this signs course access
tokens. Generate one locally if you don't have one, for example:
```
openssl rand -hex 32
```

## Verifying the deploy

After `wrangler deploy` and setting both secrets:

```
curl "https://codevent-web-development-course.emezch93.workers.dev/verify-payment?reference=test"
```

should return JSON (not a raw 404 page), something like:

```
{"authorized":false,"message":"Payment reference could not be verified."}
```

That response confirms the route exists and Paystack auth is wired up —
`test` is not a real transaction reference, so an unauthorized result here
is correct. A real reference from a completed Paystack Test Mode payment
should return `{"authorized":true,"token":"..."}`.

## What changed vs. the previous state

There was no Worker source code anywhere in the course repository or its
git history. The Worker name `codevent-web-development-course` existed in
the Cloudflare account (created shortly before this fix) but had no
deployed application code, so every request — including `/verify-payment`
and `/verify-access` — fell through to Cloudflare's default response. That
default response is a 404 with no CORS headers, which is exactly why the
browser reported both a 404 and a CORS policy error at the same time: they
were the same underlying problem, not two separate bugs.
