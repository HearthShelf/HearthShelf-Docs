# Remote Access (making your server reachable)

When you connect your server to **app.hearthshelf.com**, the hosted app opens
your library by connecting your browser **straight to your server**. For that to
work, your server needs a **public web address that starts with `https://` and
has a valid certificate** — for example `https://books.example.com`.

A local address like `http://192.168.1.3:9277` will **not** work from the
internet: an `https://` site can't connect to a plain `http://` server, and no
certificate authority will issue a certificate for a bare IP address.

::: tip Local-only is fine without this
You only need a public address if you want to use **app.hearthshelf.com** (reach
your library from anywhere, invite people by email). If you only ever open
HearthShelf on your home network, you can skip this page — just leave
`PUBLIC_URL` blank.
:::

## Pick the option that fits you

### 1. Reverse proxy (nginx or Caddy)

Put a reverse proxy in front of HearthShelf and point a domain you own at it.
**Caddy** is the easiest because it gets a free Let's Encrypt certificate for you
automatically:

```caddy
books.example.com {
    reverse_proxy localhost:9277
}
```

Then set `PUBLIC_URL=https://books.example.com`.

### 2. Cloudflare Tunnel

The easiest option if you **don't want to open ports** or don't have a static IP.
A tunnel gives you a public `https://` address that reaches your server with no
port forwarding and no exposed home IP. After creating the tunnel, set
`PUBLIC_URL` to the tunnel's hostname.

### 3. Dynamic DNS + certificate

If your home IP changes, a dynamic-DNS provider (e.g. **DuckDNS**) gives you a
free hostname like `https://yourname.duckdns.org` that always points at your
home, plus a way to get a certificate for it. Set `PUBLIC_URL` to that hostname.

## After you set it up

Set **`PUBLIC_URL`** to your new `https://` address and restart the container.
In the setup wizard (or **Config → HearthShelf Connect**), re-run the reachability
check — it should turn green. Then pairing with app.hearthshelf.com will succeed.

## Why opening a port isn't enough

Forwarding a port (manually or with UPnP) still leaves visitors connecting to a
**bare IP address**, and no certificate authority will issue a certificate for an
IP — so the browser refuses the secure connection. That's why UPnP or port
forwarding **by itself** doesn't make your server usable from
app.hearthshelf.com. You need a real hostname with a certificate, which is what
all three options above give you.

A "no domain needed" option (an `hs.direct`-style service that hands out a
hostname and certificate automatically) is planned for the future.
