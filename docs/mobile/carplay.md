# CarPlay

HearthShelf Mobile plays your audiobooks on your car's screen through **CarPlay**. It's a real native car player — you browse your library and control playback from the head unit, and audio keeps streaming from your own server.

## How it works

The iOS app ships a native CarPlay audio browse surface. When you connect to a car that supports CarPlay, the car sees HearthShelf as an audio app, shows your library in the CarPlay browse tabs, and drives playback from the head unit. The phone and the car share a single player, so what's playing in the car is the same session your phone knows about — start a book in the car and your phone's Now Playing screen follows along.

Playback, browsing, chapter skip, playback speed, and the lock-screen/car controls all come from that one native engine.

## What you need

- The HearthShelf app **installed and signed in** on your iPhone — see [Install (iOS)](/mobile/install#ios-testflight).
- A car (or head unit) that supports CarPlay.

## Using it in the car

1. Sign in on the phone first and confirm a book plays there.
2. Connect the phone to your car (USB or wireless CarPlay).
3. Open the app grid on the car screen and pick **HearthShelf**.
4. Browse your library and start a book. Playback and progress stay in sync with your server.

On the Now Playing screen you get the standard transport controls plus chapter skip, playback speed, and bookmarks.

## Troubleshooting

**HearthShelf doesn't appear in the car's app grid.**
Make sure you've installed the app and signed in on the phone at least once, then reconnect to the car. CarPlay only lists apps that are installed and initialized.

**It appears but the library is empty.**
The car browses the same library your phone does. Confirm the phone is signed in and can reach your server over HTTPS — the car has no separate connection of its own.

**On Android?**
Android uses Android Auto for the same in-car experience — see [Android Auto](/mobile/android-auto).
