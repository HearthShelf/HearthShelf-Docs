# Getting Started

Get HearthShelf running in under five minutes with Docker Compose. Pick the path that matches your setup.

With the All-in-One image it's the same three steps as standing up a new Plex server: **install** the container, **forward a port** if you want it from outside your home, and **run the setup wizard**.

## Which Setup?

- **Starting fresh / want the simplest install** → use the **All-in-One** image. One container holds HearthShelf *and* AudiobookShelf; it sets ABS up for you. Jump to [All-in-One Quick Start](#all-in-one-quick-start).
- **Already running AudiobookShelf** → use the **Slim** image and point it at your server. Jump to [Slim Quick Start](#slim-quick-start).

::: tip Unraid users
HearthShelf is coming to the **Unraid Community Apps** catalog (both images), so you'll be able to install it from Unraid's own UI without writing compose. Until that lands, follow the Docker steps below. See [All-in-One](/setup/all-in-one) for details.
:::

## Prerequisites

- Docker and Docker Compose installed on your host machine
- For the slim path: a running [AudiobookShelf](https://www.audiobookshelf.org/) server on your network

## All-in-One Quick Start

The simplest way to start. Create a `docker-compose.yml`:

```yaml
services:
  hearthshelf:
    image: ghcr.io/hearthshelf/hearthshelf-aio:latest
    ports:
      - "9277:80"
    environment:
      - PUBLIC_URL=http://localhost:9277
    volumes:
      - ./audiobooks:/audiobooks
      - ./abs-config:/config
      - ./abs-metadata:/metadata
      - ./hearthshelf-data:/app/data
    restart: unless-stopped
```

```bash
docker compose up -d
```

Open `http://localhost:9277`. HearthShelf sets up the bundled AudiobookShelf for you and walks you through a short setup wizard — see the [All-in-One guide](/setup/all-in-one) for what to expect (including your generated admin credentials).

## Slim Quick Start

Use this if you already run AudiobookShelf. Create a `docker-compose.yml`:

```yaml
services:
  hearthshelf:
    image: ghcr.io/hearthshelf/hearthshelf:latest
    ports:
      - "9277:80"
    environment:
      - ABS_SERVER_URL=http://192.168.1.100:13378
    restart: unless-stopped
```

Replace `192.168.1.100:13378` with your ABS server's address, then run:

```bash
docker compose up -d
```

Open `http://localhost:9277` in your browser and log in with your ABS credentials.

::: info
On the slim image HearthShelf does **not** replace your ABS server — it only replaces the web UI. You need ABS running before HearthShelf is useful.
:::

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ABS_SERVER_URL` | Yes | Internal URL of your AudiobookShelf server (e.g. `http://192.168.1.100:13378`) |
| `PORT` | No | Port HearthShelf listens on (default: `80`) |
| `PUBLIC_URL` | Recommended | Your public hostname — used for OIDC redirect rewriting (e.g. `https://books.mydomain.com`). On the All-in-One image, hs.direct sets this for you automatically after pairing. |
| `HSDIRECT_DISABLED` | No | hs.direct gives the All-in-One image a free `https://` address automatically after pairing. Set `true` only to turn it off. See [Remote Access](/setup/remote-access). |

## Accessing HearthShelf

Once the container starts, open HearthShelf at the port you mapped (e.g. `http://localhost:9277`).

Log in with the same username and password you use for AudiobookShelf. HearthShelf validates your token against ABS — no separate account is needed.

## Next Steps

- [All-in-One image guide](/setup/all-in-one) — the single-container setup in detail
- [Migrate to All-in-One](/setup/migrate-to-aio) — consolidate an existing slim + ABS setup
- [Docker configuration details](/setup/docker)
- [Remote Access](/setup/remote-access) — use your library from anywhere (hs.direct: no domain needed)
- [Setting up a reverse proxy](/setup/reverse-proxy) — public HTTPS with your own domain
- [Authentication options](/setup/authentication) — username/password and OpenID Connect
- [Configuration reference](/setup/configuration) — all environment variables
