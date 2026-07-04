# Backups

HearthShelf protects your server with **two separate backups**, both managed from **Settings &gt; Backups**:

| Backup | What it holds |
|---|---|
| **AudiobookShelf backup** | Your library database, book and author metadata, users, and listening progress. |
| **HearthShelf backup** | HearthShelf's own data: settings, clubs, notes, reading history, profile photos, and integration config. |

::: warning Audio files are not in either backup
Neither backup includes your actual audiobook files. Protect the folder holding your audio at the host level (a separate volume backup or copy). Backups cover the *databases*, which is what's hard to recreate.
:::

## Automatic backups

On the [all-in-one image](/setup/all-in-one), the setup wizard offers to turn on nightly backups, and HearthShelf backs up its own data every night by default. You can change the schedule and how many backups to keep for each system on the Backups page.

A banner warns you when either system has automatic backups turned off — so you're never silently unprotected.

::: info AudiobookShelf ships with backups off
AudiobookShelf's own automatic backups default to **off**. The all-in-one wizard turns them on for you (you can opt out). On the slim image, HearthShelf won't change your separate AudiobookShelf's settings for you — turn them on yourself from Settings &gt; Backups.
:::

## Backup files and where they live

- AudiobookShelf backups are `.audiobookshelf` files in its metadata backups folder.
- HearthShelf backups are `.hsbackup` files under HearthShelf's data volume (`${QG_DATA_DIR}/backups/`).

Both are plain zip files. You can download either from the Backups page.

::: warning HearthShelf backups contain secrets
A HearthShelf backup carries server secrets (API keys, tokens) so it can actually restore a working server — the same way an AudiobookShelf backup carries its own tokens. **Store a downloaded copy like a password.**
:::

### Off-box copies

Backups on the same disk don't survive losing that disk. Two mitigations:

1. **Download a copy** from the Backups page and keep it somewhere else.
2. Set the `HS_BACKUP_PATH` environment variable to a mounted host path. Each HearthShelf backup is also copied there automatically.

## The full-server archive

The Backups page also offers **Download full archive** — one `.hsarchive` file holding *both* backups from the same moment. It's the easiest way to move a whole server or recover from a crash, because the two halves stay paired.

A `.hsarchive` is just a zip. You can always unzip it by hand: the AudiobookShelf half restores on a plain AudiobookShelf install with no HearthShelf involved. See [Leaving HearthShelf](/data/leaving) — nothing here locks your data in.

## Environment variables

| Variable | Default | Effect |
|---|---|---|
| `HS_BACKUP_SCHEDULE` | `0 1 * * *` (nightly 1 AM) | Cron schedule for HearthShelf backups. Set empty to disable. |
| `HS_BACKUPS_TO_KEEP` | `7` | How many HearthShelf backups to retain. |
| `HS_BACKUP_PATH` | *(unset)* | If set, each HearthShelf backup is also copied to this host path. |

Setting any of these pins that field — the Backups page shows it as managed by the environment.

## Next

- [Restore &amp; Migration](/data/restore) — rebuild a server from a backup, or move to new hardware.
- [Leaving HearthShelf](/data/leaving) — take your data back to plain AudiobookShelf.
