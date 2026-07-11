# FAQ

## Does HearthShelf replace AudiobookShelf?

No. HearthShelf only replaces the web UI. AudiobookShelf continues to manage your files, process uploads, transcode audio, and serve your library. HearthShelf is the face — ABS is the engine.

## Will the native AudiobookShelf mobile apps still work?

Yes. With the transparent reverse-proxy model (see [Reverse Proxy](/setup/reverse-proxy)), you can run both HearthShelf (browser) and the native AudiobookShelf mobile apps through the same public hostname. Your family only needs one address.

## Do I need to modify my ABS server?

No ABS configuration changes are required for basic setup. For the optional transparent reverse-proxy (native-app compatibility), you'll want to set ABS's external/base URL to your public hostname. For OpenID Connect login, your OIDC provider needs to have the HearthShelf callback URL added to its allowed-redirect list.

## Will my ABS progress sync work?

Yes. HearthShelf syncs playback progress with your ABS server every 30 seconds while playing, on pause, and when you close the tab (via `sendBeacon`). Your progress is stored in ABS, not HearthShelf.

## Can my family use HearthShelf with their ABS accounts?

Yes. HearthShelf authenticates against ABS, so every ABS user account works. Each user logs in with their own ABS credentials.

## Do I need to buy a domain to use it from outside my house?

No. On the All-in-One image, **hs.direct** gives your server a free, secure
`https://` web address automatically when you pair with app.hearthshelf.com — no
domain to buy, nothing to set up, and nothing to keep updated. See
[Remote Access](/setup/remote-access). You can still use your own domain if you'd
rather; hs.direct stays on as a reliable backup connection.

## Does HearthShelf support OpenID Connect?

Yes. The OpenID button appears on the login page when your ABS server has OpenID configured. HearthShelf implements the full OAuth2 PKCE flow.

## Is there a HearthShelf mobile app?

Yes. There are native **Android** and **iOS** apps, both in public beta, with in-car playback via **Android Auto** and **CarPlay**. They sign in through `app.hearthshelf.com` and connect to your linked server. Join the beta on [TestFlight (iOS)](https://testflight.apple.com/join/ehxv65Ms) or [Play internal testing (Android)](https://play.google.com/apps/internaltest/4701644118536911529) — see [the Mobile App docs](/mobile/overview) for the full walkthrough. If you'd rather not run a beta, the native AudiobookShelf phone apps still work against your server unchanged (see the native-apps question above).

## Does HearthShelf work offline?

**On the mobile apps, yes.** Download a book on your phone and you can play it with no connection at all — the app launches straight into an offline mode when it can't reach your server, and any progress you make offline syncs back automatically once you're online again. This works in the car too. You can download books by hand or set rules to download automatically, with a storage cap and auto-cleanup — see [Downloads & offline](/mobile/overview#downloads-offline) for every option.

**On the web app, no.** The browser client fetches everything from your server in real time; there's no offline/PWA mode. For offline listening, use the [mobile app](/mobile/overview) (or a native AudiobookShelf app).

## Why is ABS not public-facing in the recommended setup?

In the [transparent reverse-proxy](/setup/reverse-proxy) model, ABS binds only to the internal Docker network and is never exposed directly. All traffic — web and mobile — flows through the HearthShelf nginx container. This keeps ABS as an internal service and gives you a single point of TLS termination.

## What browsers are supported?

Any modern browser that supports ES2022+. Chrome, Firefox, Safari, and Edge are all supported. Mobile browsers work but the layout is desktop-first.

## Can I use HearthShelf with multiple ABS libraries?

Yes. HearthShelf supports multi-library setups. The sidebar lets you switch between your ABS libraries.

## Can users see what other people are reading?

There's a **server leaderboard** on the Stats page - it ranks listeners by books finished and hours listened, and book pages can show how many people have finished a title. Every signed-in listener can see it (not just admins).

Each listener controls their own visibility with a **"Share my reading list"** toggle in Settings. The server admin sets the default for everyone under **Config > Community**: *on* (opt-out - listeners appear unless they hide) or *off* (opt-in - listeners are hidden unless they share). Changing the default applies to people who never picked for themselves, but never overrides someone who already chose. See [Configuration](/setup/configuration#community-leaderboard) to set this up.

## Where is HearthShelf's data stored?

Your library, progress, and playback sessions all live in AudiobookShelf - HearthShelf never duplicates them. HearthShelf keeps only its own small state in an embedded SQLite database (app settings, AI recommendation config and history, and request/feedback data). In the browser, the only thing it persists is your auth token (in `localStorage`) so you stay logged in across sessions.

For the community leaderboard, HearthShelf reads AudiobookShelf's own database **read-only** (it never writes to it) to count finished books across users - data ABS otherwise only gives to admins through its API. This is optional and off unless the database is made available to the container; see [Configuration](/setup/configuration#community-leaderboard).
