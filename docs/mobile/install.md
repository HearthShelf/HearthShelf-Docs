# Install the app

HearthShelf Mobile is in **public beta on both platforms**. The fastest way in is the beta program for your device:

- **iOS (TestFlight):** [testflight.apple.com/join/ehxv65Ms](https://testflight.apple.com/join/ehxv65Ms)
- **Android (Play internal test):** [play.google.com/apps/internaltest/4701644118536911529](https://play.google.com/apps/internaltest/4701644118536911529)

On Android you can also **sideload the APK** directly (below) if you'd rather skip Play. The app auto-builds on every change, so a fresh, installable build is always waiting.

::: info Beta builds, on purpose
These are beta programs, not general-availability store releases. Expect frequent updates and rough edges. Nothing is promoted to a public store automatically — that stays a deliberate manual step.
:::

## Before you install

The app signs in through `app.hearthshelf.com` and then connects straight to your server, so make sure:

1. Your HearthShelf server is reachable over **HTTPS** — the free [hs.direct address](/setup/remote-access) or your own domain. A bare `http://192.168.x.x` LAN address will not work with the hosted sign-in flow.
2. That server is **linked to your WebApp account** — see [Linking & Invites](/webapp/pairing).

## Android: sideload the APK

Prefer to skip Play internal testing? Install the APK directly.

### Option 1: Install the prebuilt APK (recommended)

1. Open the latest successful [**Build Android** run](https://github.com/HearthShelf/HearthShelf-Mobile/actions/workflows/build-android.yml).
2. Under **Artifacts**, download `app-debug-apk-<run-number>`. (Each build stamps its run number as the app's version code, so you can tell builds apart on-device.)
3. Unzip it to get the `.apk`, copy it to your phone, and open it. Allow "install from unknown sources" when Android prompts.
4. Launch **HearthShelf**, tap **Sign in with Google**, and pick your linked server.

Updating later is the same steps with a newer run — installing over the top keeps your sign-in.

### Option 2: Build it yourself

Building locally needs an Android toolchain — **JDK 21** and the Android SDK (platform-tools, platform 35, build-tools). React Native 0.85 requires a Java 21 toolchain; JDK 17 will fail the build.

```bash
git clone --recurse-submodules https://github.com/HearthShelf/HearthShelf-Mobile
cd HearthShelf-Mobile
npm install
npx expo prebuild --platform android   # runs the config plugins, incl. Android Auto
npm run android                        # build + install on a connected device
```

::: tip Untethered / in-car builds
A plain debug APK loads its JavaScript from the dev server over USB, so it stops working once unplugged. For a build that runs on its own (and in the car), embed the JS:

```bash
HEARTHSHELF_STANDALONE_DEBUG=1 npx expo prebuild --platform android
cd android && ./gradlew :app:assembleDebug
```

The CI artifacts from Option 1 are already built this way.
:::

No EAS account is needed for local builds. For the full toolchain, emulator, and in-car testing notes, see the repo's `TESTING.md`.

## iOS (TestFlight)

The iOS app is in public beta through TestFlight.

1. Install Apple's **TestFlight** app from the App Store if you don't have it.
2. Open the beta invite: [testflight.apple.com/join/ehxv65Ms](https://testflight.apple.com/join/ehxv65Ms).
3. Tap **Accept**, then **Install** to get HearthShelf.
4. Launch **HearthShelf**, tap **Sign in**, and pick your linked server.

TestFlight handles updates automatically as new beta builds ship. iOS also supports playing in the car — see [CarPlay](/mobile/carplay).

## Next

- [Set up Android Auto](/mobile/android-auto) or [CarPlay](/mobile/carplay) to play in your car.
- Not ready for the app yet? The native AudiobookShelf phone apps still work against your server — see the [FAQ](/guide/faq).
