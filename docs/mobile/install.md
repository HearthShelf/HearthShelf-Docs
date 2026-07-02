# Install on Android

There is no Play Store listing yet, so today you install HearthShelf Mobile by **sideloading an APK**. The app auto-builds on every change, so a fresh, installable build is always waiting.

::: info Debug builds, on purpose
The current builds are **debug-signed** — they run untethered and in the car, but they are not Play Store releases. Nothing ships to a store automatically; promotion stays a deliberate manual step. Treat these as beta builds.
:::

## Before you install

The app signs in through `app.hearthshelf.com` and then connects straight to your server, so make sure:

1. Your HearthShelf server is reachable over **HTTPS** — the free [hs.direct address](/setup/remote-access) or your own domain. A bare `http://192.168.x.x` LAN address will not work with the hosted sign-in flow.
2. That server is **linked to your WebApp account** — see [Linking & Invites](/webapp/pairing).

## Option 1: Install the prebuilt APK (recommended)

1. Open the [HearthShelf-Mobile repository](https://github.com/HearthShelf) on GitHub and go to the **Actions** tab.
2. Open the latest successful **Build Android** run.
3. Under **Artifacts**, download `app-debug-apk-<run-number>`. (Each build stamps its run number as the app's version code, so you can tell builds apart on-device.)
4. Unzip it to get the `.apk`, copy it to your phone, and open it. Allow "install from unknown sources" when Android prompts.
5. Launch **HearthShelf**, tap **Sign in with Google**, and pick your linked server.

Updating later is the same steps with a newer run — installing over the top keeps your sign-in.

## Option 2: Build it yourself

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

## iOS

iOS is a later milestone. When it lands it will be distributed through TestFlight first, then the App Store. There is nothing to install on iOS today.

## Next

- [Set up Android Auto](/mobile/android-auto) to play in your car.
- Not ready for the app yet? The native AudiobookShelf phone apps still work against your server — see the [FAQ](/guide/faq).
