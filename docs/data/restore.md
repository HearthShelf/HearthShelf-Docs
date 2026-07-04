# Restore &amp; Migration

Every scenario below rebuilds a server from a [backup or archive](/data/backups). The common thread: AudiobookShelf restore brings back the exact same user accounts (and their passwords), and HearthShelf's data is keyed to those accounts — so restoring the **pair together** keeps everything consistent.

::: warning Mount your audio first
Audio files aren't in any backup. Before restoring, make sure your audiobook files are mounted at the same path the server expects.
:::

## Disaster restore — same setup, new hardware {#m1}

*"My server's host died; I have a backup or archive."*

1. Stand up a fresh [all-in-one](/setup/all-in-one) container with empty data volumes, and point the audio volume at your (restored or surviving) files.
2. In the setup wizard, on the create-account step, choose **Restore from a backup instead**.
3. Upload your `.hsarchive` (or a bare `.audiobookshelf` backup). HearthShelf rebuilds the server and shows a summary of what came back.
4. Sign in with the username and password **from the server you backed up** — not the temporary setup account. Every restored account keeps its original password.

The wizard reconciles automatically after restore: it re-points saved connections at the new box and checks its internal service account. If something needs your attention (see [Sharp edges](#sharp-edges)), it tells you.

## Fresh setup from an AudiobookShelf-only backup {#m2}

*"AudiobookShelf crashed / new system; first-time HearthShelf setup; I have my AudiobookShelf backup."*

Identical to the disaster restore above, but the file is a bare `.audiobookshelf` backup with no HearthShelf half:

1. Wizard &gt; **Restore from a backup instead** &gt; upload the `.audiobookshelf` file.
2. Your library, users, and progress are restored. **HearthShelf features (clubs, notes, settings sync) start fresh** — the wizard says so plainly.
3. Your users sign in with their existing passwords, exactly as before.

## Moving from slim to all-in-one {#m3}

If you run the slim image beside a separate AudiobookShelf and want the single all-in-one image, the cleanest path reuses your existing volumes directly — see the dedicated [Migrate to All-in-One](/setup/migrate-to-aio) guide.

If instead you're rebuilding onto a **new** machine, use backups:

1. On the old setup, take an AudiobookShelf backup and download a HearthShelf backup (or one full archive).
2. Stand up the all-in-one image, attaching the **same audio files**.
3. Wizard &gt; **Restore from a backup instead** &gt; upload the archive.

Because both halves came from the same live server, all accounts and item references line up.

## Recover one user or re-link a moved library

Two scenarios need the **Import &amp; Merge** tool (coming in a later release), because they combine data rather than replacing it:

- **Recover a single user** from a backup without rolling back the whole server.
- **Re-link a library** after moving audio to a new disk, when a rescan gave every book a new internal id and progress/notes no longer line up.

Until then, avoid the re-link problem by copying audio so file identity is preserved (same filesystem), or by updating the library folder path in place instead of deleting and re-scanning.

## Sharp edges {#sharp-edges}

The wizard's post-restore summary flags these when they apply:

- **Service account missing.** A restore replaces the whole user list, which can remove HearthShelf's internal service account. Some background features (recommendations, downloads) won't work until it's recreated — do this from **Settings &gt; Users** after signing in.
- **Library re-scanned onto new files.** If none of the restored library items match files on disk, your audio likely moved to a new location and history won't line up until the library is re-linked (see above).

## Before decommissioning the old server

If phones or tablets used the old server, open the app on each **once** before the old server goes away, so any pending offline listening syncs against it. Those pending sessions reference the old server's item ids and can't be replayed against a rebuilt one. Then sign out and reconnect to the new server.

## Hosted (app.hearthshelf.com) notes

A box restored **with** its HearthShelf backup re-attaches to app.hearthshelf.com automatically — the pairing identity is inside the backup. A box rebuilt **without** one simply re-pairs; your links and invites survive on the hosted side. If a box ever loses its pairing identity, use the hosted app's reset option for that server.
