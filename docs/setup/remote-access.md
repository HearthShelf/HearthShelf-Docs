# Remote Access (using your library from anywhere)

When you connect your server to **app.hearthshelf.com**, the website opens your
library by talking **straight to your server** from your browser. For that to
work, your server needs a real web address that starts with `https://`.

The easiest way to get one is **hs.direct** — HearthShelf can hand your server a
working `https://` address automatically, with no domain to buy and no setup. If
you'd rather use your own domain, that works too. Both are below.

::: tip Only using HearthShelf at home? You can skip this page.
You only need a public address if you want to use **app.hearthshelf.com** (open
your library from anywhere, or invite family and friends). If you only ever open
HearthShelf on your home Wi-Fi, leave this alone — it just works.
:::

## The easy way: hs.direct (no domain needed)

On the All-in-One image, this is **automatic** — there's nothing to turn on. When
you pair your server with app.hearthshelf.com, HearthShelf gives it its own secure
`https://` web address and keeps the certificate valid for you. The reachability
check on **Config → HearthShelf Connect** turns green on its own.

::: tip Want to turn it off?
hs.direct stays on as a reliable, monitored connection even if you also set up your
own domain (below). If you really don't want it, set `HSDIRECT_DISABLED=true` in
your container settings.
:::

::: tip What you get
A web address like `https://...hearthshelf.app` that points at your server and
has a proper security certificate, so your browser trusts it. You don't have to
buy a domain, set up a certificate, or keep anything updated — even if your home
internet address changes.
:::

### When hs.direct can't help

hs.direct still needs your server to be **reachable from the internet**. If your
home internet is behind something called **CGNAT** (common with some cell-based or
apartment internet), or you've blocked all incoming connections, the outside world
can't reach your server no matter what address it has. In that case use the
**Cloudflare Tunnel** option below — it pokes a hole out from your server instead
of needing one poked in.

::: details Under the hood (for the curious / technical reader)
hs.direct is HearthShelf's version of what Plex does with `*.plex.direct`. Two
pieces work together:

- **A web address that already knows your IP.** Your server's current internet
  address is encoded right into the hostname, so the name always resolves to your
  server — even when your home IP changes, with nothing to update.
- **An automatic certificate.** Your server makes its own private key (which never
  leaves your machine), and HearthShelf's helper service gets it a free Let's
  Encrypt **wildcard** certificate. HearthShelf never sees your private key.

Because the address can resolve to a private LAN IP, HearthShelf treats these
names carefully on the server side (it refuses to fetch private addresses from the
cloud) to avoid the classic DNS-rebinding trap. If you want the gory details, the
design lives in the WebApp repo's `docs/hs-direct-implementation.md`.
:::

## The advanced way: bring your own domain

Prefer to use a domain you own (e.g. `https://books.example.com`)? Pick whichever
fits. All three give your server a real hostname with a certificate.

::: warning A local address won't work
Something like `http://192.168.1.3:9277` can't be reached from the internet, and
an `https://` website can't talk to a plain `http://` server. You need a real
`https://` hostname — which is exactly what hs.direct (above) or any option below
gives you.
:::

### 1. Reverse proxy (Caddy is easiest)

Put a reverse proxy in front of HearthShelf and point a domain you own at it.
**Caddy** is the simplest because it gets a free certificate for you automatically:

```caddy
books.example.com {
    reverse_proxy localhost:9277
}
```

Then set `PUBLIC_URL=https://books.example.com`. See
[Reverse Proxy](/setup/reverse-proxy) for the full transparent-proxy setup.

### 2. Cloudflare Tunnel (no open ports needed)

The best option if you **don't want to open ports**, don't have a static IP, or
your internet is behind CGNAT. A tunnel gives you a public `https://` address that
reaches your server with no port forwarding and no exposed home IP. After creating
the tunnel, set `PUBLIC_URL` to the tunnel's hostname.

### 3. Dynamic DNS + certificate

If your home IP changes, a dynamic-DNS provider (e.g. **DuckDNS**) gives you a free
hostname like `https://yourname.duckdns.org` that always points at home, plus a way
to get a certificate. Set `PUBLIC_URL` to that hostname.

## After you set it up

Set **`PUBLIC_URL`** to your `https://` address (hs.direct sets this for you), then
restart the container. On **Config → HearthShelf Connect**, re-run the reachability
check — it should turn green. Then pairing with app.hearthshelf.com will succeed.
See [Linking & Invites](/webapp/pairing) for the pairing step itself.

## Why opening a port isn't enough

Forwarding a port (manually or with UPnP) still leaves visitors connecting to a
**bare IP address**, and no certificate authority will issue a certificate for an
IP — so the browser refuses the secure connection. That's why port forwarding **by
itself** doesn't make your server usable from app.hearthshelf.com. You need a real
hostname with a certificate — which hs.direct and all three advanced options above
give you.
