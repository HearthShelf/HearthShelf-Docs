# Leaving HearthShelf

HearthShelf is a face over AudiobookShelf, not a lock-in. Your library, users, listening progress, sessions, and bookmarks live in **AudiobookShelf** the whole time — HearthShelf never takes them hostage. If you ever want to go back to plain AudiobookShelf, here's how.

## The library is already stock AudiobookShelf

On the [all-in-one image](/setup/all-in-one), your `config`, `metadata`, and `audiobooks` volumes **are a normal AudiobookShelf install**. There is no conversion step.

To go back to plain AudiobookShelf, point the official image at those same volumes:

```yaml
services:
  audiobookshelf:
    image: ghcr.io/advplyr/audiobookshelf:latest
    ports: ["13378:80"]
    volumes:
      - ./config:/config       # holds absdatabase.sqlite
      - ./metadata:/metadata
      - ./audiobooks:/audiobooks
```

It boots with all your users, books, and progress intact. Your accounts and passwords work exactly as before.

If you don't have the volumes handy but you have an archive, unzip the `.hsarchive` and restore the `abs/backup.audiobookshelf` file onto a stock AudiobookShelf install (Settings &gt; Backups &gt; upload &amp; restore in AudiobookShelf's own UI).

## What lives only in HearthShelf

A few things have no AudiobookShelf equivalent, because HearthShelf added them:

- Reading history imported from Goodreads/Hardcover (books you finished elsewhere)
- Book club discussions and notes
- Cross-device settings and profile photos

Two ways to take these with you:

1. **Per-user export** *(coming in a later release)* — a `user-export.json` you download from your own settings, holding your finished-book history, notes, and settings. No admin access needed, no secrets inside.
2. **Full HearthShelf backup** — an admin can download the `.hsbackup` from Settings &gt; Backups. It's a plain zip containing a SQLite database you can open with any SQLite tool.

## The bottom line

Nothing HearthShelf does prevents you from walking away with your data. The library is stock AudiobookShelf; the extras are exportable; the audio was always yours on disk.
