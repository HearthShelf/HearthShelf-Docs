# HearthShelf Docs

[![Docs](https://img.shields.io/badge/docs-docs.hearthshelf.com-2c6e6b)](https://docs.hearthshelf.com)
[![Website](https://img.shields.io/badge/site-hearthshelf.com-2c6e6b)](https://hearthshelf.com)

Documentation site for [HearthShelf](https://github.com/HearthShelf/HearthShelf), built with [VitePress](https://vitepress.dev) and hosted on Cloudflare Pages at **docs.hearthshelf.com**.

The marketing landing page lives in a separate repo: [HearthShelf-Website](https://github.com/HearthShelf/HearthShelf-Website) (hearthshelf.com).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> docs/.vitepress/dist
npm run preview  # preview the production build
```

## Deploy

Cloudflare Pages builds with `npm run build` and serves `docs/.vitepress/dist`.

Set the `VITE_CLERK_PUBLISHABLE_KEY` environment variable in the Pages project to
enable the live "Log in / Sign up" nav control. Without it, the nav falls back to
plain links into the app.

## Structure

- `docs/guide/` — introduction, getting started, FAQ
- `docs/setup/` — Docker, All-in-One, configuration, reverse proxy, auth
- `docs/webapp/` — hosted WebApp overview, architecture, pairing
- `docs/mobile/` — mobile app overview and setup
- `docs/.vitepress/` — VitePress config and custom theme (nav auth + logo)
