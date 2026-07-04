# Configuration

HearthShelf is configured via environment variables passed to the Docker container.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ABS_SERVER_URL` | **Yes** | Internal URL of your AudiobookShelf server. This is the address nginx uses to proxy API requests — it should be reachable from within the container network, not the public internet. Example: `http://192.168.1.100:13378` or `http://abs:13378` if ABS is on the same Docker network. |
| `PUBLIC_URL` | Recommended | Your public-facing hostname. Used for OIDC redirect rewriting so that Location headers from ABS point to your public URL instead of the internal ABS address. Example: `https://books.mydomain.com`. |
| `HS_ABS_DB_PATH` | Optional | Path (inside the container) to AudiobookShelf's `absdatabase.sqlite`, read **read-only** for the [community leaderboard](#community-leaderboard). Default `/config/absdatabase.sqlite`. On All-in-One it just works; on Slim you mount ABS's config dir read-only. Leave the file unavailable and the leaderboard simply hides. |
| `COMMUNITY_DEFAULT_SHARE` | Optional | Default leaderboard visibility for users who haven't chosen for themselves: `on` (opt-out, the default) or `off` (opt-in). Seeds the initial value only — admins change it later under **Config > Community**, and it never overrides a user's own choice. |

## `.env` File

You can place these in a `.env` file alongside your `docker-compose.yml`:

```env
# .env
ABS_SERVER_URL=http://192.168.1.100:13378
PUBLIC_URL=https://books.mydomain.com
```

Then reference it in Compose:

```yaml
services:
  hearthshelf:
    image: ghcr.io/hearthshelf/hearthshelf:latest
    env_file: .env
    ports:
      - "9277:80"
```

## Community leaderboard

The Stats page can show a **server leaderboard** (top listeners by books finished and hours listened) and a per-book **"finished by N people"** count. AudiobookShelf only exposes other users' reading data to admins through its API, so HearthShelf instead reads ABS's own database **read-only** to build these — it never writes to it, and the social features need no admin token.

### All-in-One

Nothing to do. ABS's `/config` is already inside the container, so `HS_ABS_DB_PATH` resolves to `/config/absdatabase.sqlite` and the leaderboard works out of the box.

### Slim

Mount your ABS config directory into the HearthShelf container **read-only** and point `HS_ABS_DB_PATH` at the database file:

```yaml
services:
  hearthshelf:
    image: ghcr.io/hearthshelf/hearthshelf:latest
    environment:
      - HS_ABS_DB_PATH=/abs-config/absdatabase.sqlite
    volumes:
      # ':ro' keeps it read-only — HearthShelf never writes to ABS's database.
      - abs-config:/abs-config:ro
```

Use the same named volume (or host path) that your ABS container mounts at `/config`. Remove the mount and the env var to disable the leaderboard — the Stats page hides the section when the database isn't available.

### Sharing & privacy

Each listener controls their own visibility with the **"Share my reading list"** toggle in Settings. The server-wide default lives under **Config > Community** (seeded from `COMMUNITY_DEFAULT_SHARE`):

- **On — opt-out** (default): listeners appear on the leaderboard unless they turn sharing off.
- **Off — opt-in**: listeners are hidden unless they turn sharing on.

Changing the default is retroactive for people who never made a choice, but never overrides a listener who set their own preference. Guests and inactive ABS accounts are never shown.

## Proxy Routes

HearthShelf nginx handles two categories of routes at runtime:

| Path | Destination | Notes |
|---|---|---|
| `/abs-api/*` | ABS (strips prefix) | HearthShelf SPA's REST calls |
| `/abs-socket/*` | ABS (strips prefix) | HearthShelf SPA's Socket.io |
| `/api/*` | ABS (transparent) | Native ABS clients |
| `/socket.io/*` | ABS (transparent) | Native ABS websocket |
| `/login`, `/logout`, etc. | ABS (transparent) | Native ABS auth endpoints |
| Everything else | SPA (`index.html`) | React Router client-side routes |

See [Reverse Proxy](/setup/reverse-proxy) for the full transparent proxy setup.
