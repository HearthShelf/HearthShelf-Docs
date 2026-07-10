# Android Auto

HearthShelf Mobile plays your audiobooks on your car's screen through **Android Auto**. It's a real native car player — you browse your library and control playback from the head unit, and audio keeps streaming from your own server.

## How it works

The app ships a native Media3 `MediaLibraryService` — the playback engine Android Auto expects for audio apps. When you plug into (or wirelessly connect to) a car that supports Android Auto, the car sees HearthShelf as a media source, shows your library, and drives playback through that service. Your phone stays the brains; the car is the screen and the controls.

This is the audio-app model Google requires for car playback. HearthShelf implements it natively so playback, browsing, and lock-screen/car controls all come from one engine.

## What you need

- The HearthShelf app **installed and signed in** on your phone — see [Install (Android)](/mobile/install).
- A **standalone build** (the CI artifacts already are). A plain USB-tethered debug build stops when unplugged, so it can't run in the car.
- A car (or head unit) that supports Android Auto, or the **Desktop Head Unit (DHU)** for testing without a car.

## Using it in the car

1. Sign in on the phone first and confirm a book plays there.
2. Connect the phone to your car (USB or wireless Android Auto).
3. Open the media app list on the car screen and pick **HearthShelf**.
4. Browse your library and start a book. Playback and progress stay in sync with your server.

## Testing without a car

You don't need to sit in the driveway to test. Android's **Desktop Head Unit** renders the Android Auto interface on your computer against a connected phone or emulator:

- The DHU ships with the Android SDK (`extras/google/auto/desktop-head-unit`).
- The mobile repo includes an emulator AVD (`hs_auto`) and deploy scripts set up for this loop.

See the repo's `TESTING.md` for the full DHU + emulator walkthrough.

## Troubleshooting

**HearthShelf doesn't appear in the car's app list.**
Make sure you're on a standalone build (not a USB-tethered dev build) and that you've signed in and connected a server on the phone at least once. The car only lists media apps that are installed and initialized.

**It appears but the library is empty.**
The car browses the same library your phone does. Confirm the phone is signed in and can reach your server over HTTPS — the car has no separate connection of its own.

**On iOS?**
iOS uses CarPlay for the same in-car experience — see [CarPlay](/mobile/carplay).
