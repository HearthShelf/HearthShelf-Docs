# The Mobile App

HearthShelf Mobile is the native phone app for HearthShelf. It signs in through the [hosted WebApp](/webapp/overview) (`app.hearthshelf.com`), connects to your linked server, and plays your audiobook library — including **in the car via Android Auto**.

::: warning In active development
The mobile app is early. **Android is first** and is distributed today as a sideloadable APK (see [Install](/mobile/install)) while the Play Store listing is prepared. **iOS is a later milestone.** Expect rough edges and frequent changes. If you just want a phone client today, the native AudiobookShelf apps still work against your server unchanged — see the [FAQ](/guide/faq).
:::

## What it is

The same idea as the web experience, in your pocket:

- **One sign-in.** You authenticate once with the hosted WebApp (Google, via Clerk) and connect to the server you've been linked to — no server IP to type, no separate password. This is the exact flow the web app uses.
- **Background audio.** Playback keeps going with the screen off, with lock-screen and notification controls.
- **Android Auto.** Browse and play your library from your car's screen. This is a real native Media3 player, not a mirrored phone screen — see [Android Auto](/mobile/android-auto).

## How it connects

The app is a client of *your* server, exactly like the browser is. It never reaches into your server's internals or ABS directly.

```mermaid
flowchart TD
    phone["<b>Phone app</b><br/><small>+ Android Auto</small>"]
    webapp["<b>app.hearthshelf.com</b><br/><small>sign in once</small>"]
    hs["<b>Your HearthShelf server</b>"]
    abs["<b>ABS</b><br/><small>stays internal</small>"]

    phone -->|"sign in (Google)"| webapp
    phone -->|"play library directly"| hs
    hs --> abs

    class hs accent
    classDef accent fill:#3a2a24,stroke:#e0654a,color:#e8e3d8;
```

After sign-in the phone talks **directly** to your HearthShelf server for library data and audio streaming. For this to work from anywhere, your server needs a reachable HTTPS address — the free [hs.direct address](/setup/remote-access) or your own domain both work.

## Platforms

| | Status |
| --- | --- |
| **Android** | First. Sideload today; Play Store internal-testing track coming. Android Auto supported. |
| **iOS** | Planned later milestone (same React Native codebase; CarPlay to follow). |

## What you need

- A HearthShelf server that is **reachable over HTTPS** (hs.direct or your own domain — a bare LAN IP won't work for the hosted sign-in flow).
- That server **linked to your `app.hearthshelf.com` account** — see [Linking & Invites](/webapp/pairing).
- An Android device (or Android Auto head unit / the desktop head unit for testing).

Then follow [Install (Android)](/mobile/install).

## Legal / disclaimer

HearthShelf is a user interface. It does not host, store, source, or distribute audiobooks, ebooks, or any other content, and it is not affiliated with AudiobookShelf. **You are responsible for the legality of any content you add to your library and for any backends or services you connect to HearthShelf.**
