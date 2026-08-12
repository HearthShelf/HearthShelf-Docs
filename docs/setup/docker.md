# Docker Setup

HearthShelf ships two images:

- **Slim** (`hearthshelf:latest`) — HearthShelf only. You point it at an AudiobookShelf server you already run. This page covers the slim image.
- **All-in-One** (`hearthshelf-aio:latest`) — HearthShelf *with AudiobookShelf bundled inside*, one container, set up for you. See [All-in-One](/setup/all-in-one).

::: tip Which one?
Already have AudiobookShelf running? Use **slim** (below). Starting fresh, or want a single container that is the whole stack? Use [All-in-One](/setup/all-in-one) — it's the most frictionless setup. Want to consolidate an existing slim + ABS setup down to one container? See [Migrate to All-in-One](/setup/migrate-to-aio).
:::

The slim image uses a **runtime configuration** approach. A single Docker image works for any ABS server URL — no rebuild required. The `ABS_SERVER_URL` environment variable is injected into the nginx config at container start via `envsubst`.

## Basic Setup

```yaml
# docker-compose.yml
services:
  hearthshelf:
    image: ghcr.io/hearthshelf/hearthshelf:latest
    ports:
      - "9277:80"
    environment:
      - ABS_SERVER_URL=http://192.168.1.100:13378
    restart: unless-stopped
```

```bash
docker compose up -d
```

## With ABS on the Same Stack

Run HearthShelf and AudiobookShelf together, with ABS kept internal-only:

```yaml
services:
  hearthshelf:
    image: ghcr.io/hearthshelf/hearthshelf:latest
    ports:
      - "9277:80"
    environment:
      - ABS_SERVER_URL=http://abs:13378
      - PUBLIC_URL=https://books.mydomain.com
    depends_on: [abs]
    networks: [internal]
    restart: unless-stopped

  abs:
    image: ghcr.io/advplyr/audiobookshelf:latest
    volumes:
      - ./audiobooks:/audiobooks
      - ./podcasts:/podcasts
      - ./config:/config
      - ./metadata:/metadata
    # NO ports: mapping — ABS only reachable via HearthShelf
    networks: [internal]
    restart: unless-stopped

networks:
  internal:
```

::: tip Native app compatibility
With the `internal` network setup and no `ports:` on ABS, the [transparent reverse-proxy](/setup/reverse-proxy) configuration lets a native AudiobookShelf mobile app use the same `PUBLIC_URL` as the browser. Users need only one address for everything.
:::

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `ABS_SERVER_URL` | Yes | — | Internal URL of your ABS server. An origin only — `http://192.168.1.100:13378` — with no trailing slash and no path |
| `PUBLIC_URL` | Recommended | — | The `https://` address people use in their browser |

::: warning Set `PUBLIC_URL` when something else terminates HTTPS
HearthShelf uses `PUBLIC_URL` to tell ABS that the browser is on HTTPS. If HTTPS ends at Cloudflare, a reverse proxy, or a tunnel, the container itself is reached over plain HTTP — and without `PUBLIC_URL`, ABS assumes `http://` for the addresses it builds, including the OpenID callback it hands your identity provider. A strict provider will reject that.
:::

### Pointing at an ABS that uses HTTPS

If `ABS_SERVER_URL` is an `https://` address, HearthShelf sends the server name during the TLS handshake (SNI), so an ABS behind Cloudflare, Traefik, Caddy, or any shared-IP host works normally.

Most setups are simpler with a direct internal address — a LAN IP or a Docker service name over plain HTTP — which also keeps traffic between the two containers off the public internet.

## What Happens at Container Start

`docker-entrypoint.sh` injects your environment variables into the nginx config, checks the result with `nginx -t`, and then starts nginx. It also normalizes `ABS_SERVER_URL` (trailing slashes are stripped) and derives the values it needs for TLS and the forwarded scheme.

This means you can change `ABS_SERVER_URL` and restart the container — no image rebuild needed.

If the generated config is invalid, the container stops and prints the problem along with the `ABS_SERVER_URL` it was given, rather than restart-looping on a bare nginx error:

```
[hearthshelf] ERROR: generated nginx config is invalid.
[hearthshelf] ABS_SERVER_URL=http://192.168.1.100:13378/
[hearthshelf] Expected an origin only, e.g. http://192.168.1.5:13378
```

## Updating HearthShelf

```bash
docker compose pull
docker compose up -d
```

## Logs

```bash
docker compose logs -f hearthshelf
```
