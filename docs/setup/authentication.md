# Authentication

HearthShelf authenticates against your AudiobookShelf server. No separate HearthShelf account is needed — any ABS user can log in.

## Username & Password

The standard ABS login. Enter the same credentials you use to log into ABS directly.

HearthShelf calls `POST /abs-api/login` with your credentials. On success, ABS returns a token which HearthShelf stores in `localStorage` (token only — no password is ever persisted). The token is validated on every page load via `POST /abs-api/api/authorize`.

## OpenID Connect (OIDC)

When your ABS server has OpenID enabled, a second login button appears automatically — labeled with whatever button text you set in ABS. HearthShelf detects this by checking the `/abs-api/status` endpoint.

**There is nothing to configure on the HearthShelf side, and nothing to add to ABS's "Mobile Redirect URIs".** If you set up OpenID in ABS and it works when you log into ABS directly, the button appears in HearthShelf too.

How it works:

1. You click the OpenID button, and the browser navigates to ABS.
2. ABS redirects you to your identity provider (Authentik, Authelia, Keycloak, and so on).
3. The provider authenticates you and returns to ABS.
4. ABS sends you back to HearthShelf with a session token.
5. Normal session begins.

ABS handles PKCE and state internally as part of this flow — HearthShelf does not manage them, and no redirect URI needs whitelisting anywhere.

### Prerequisites for OIDC

| Requirement | Where to configure |
|---|---|
| ABS has OpenID set up and working | ABS server admin settings |
| Your ABS public URL in the provider's allowed-redirect list | Your identity provider |

::: tip Reverse proxies and multiple addresses
HearthShelf tells ABS to send you back to the same address you arrived on, as a relative path. So the same setup works whether you reach your server on a LAN IP, a domain name, or your connect domain — there is no fixed callback URL to keep in sync.
:::

::: warning If the button doesn't appear
The OpenID button is shown on **self-hosted** servers. If your server is paired to a HearthShelf account, you'll see **Sign in with HearthShelf** instead — that button covers single sign-on for paired servers, and showing both at once was too ambiguous. Local username and password always works either way.
:::

## Sign in with HearthShelf

If your server is paired to a HearthShelf account, the login page shows a **Sign in with HearthShelf** button instead of the OpenID one.

Clicking it sends you to `app.hearthshelf.com`, which signs you in to your HearthShelf account and returns you to your own server — at the same address you started from, so signing in on your LAN keeps you on your LAN. Your server then issues you a token for your ABS user.

This is separate from ABS OpenID: it signs you in with your HearthShelf account rather than your identity provider, and needs no OpenID setup at all. Unpaired, self-hosted servers don't show this button.

## Token Lifecycle

| Event | Action |
|---|---|
| First login | Token stored in `localStorage`, user state in memory |
| Page load | Token read from `localStorage`, validated via `/api/authorize` |
| Token invalid | Cleared, redirected to login |
| Logout | Token cleared from `localStorage` and Zustand store |

Only the token is persisted — user state is re-fetched from ABS on every load.

## Multi-User

Each ABS user account works independently — everyone logs in the same way, with their own AudiobookShelf credentials. Admin-only features (server configuration, user management, and first-run setup) are gated by the role ABS returns for the signed-in user, so regular users simply don't see them.
