# Hardcover integration

The Hardcover integration lets HearthShelf sync books you finish to your
Hardcover reading history. It is optional, account-owned, and uses a Hardcover
personal access token that you provide.

HearthShelf does not use Hardcover to source, host, or distribute books. The
connection only sends reading-history updates for books you finish in
HearthShelf. You are responsible for the content you add to your own server and
for the external services you connect.

## What you get

- Finished books in HearthShelf can appear in your Hardcover reading history.
- Manual sync lets you retry or catch up after connecting.
- HearthShelf shows the connected Hardcover username when Hardcover returns one.
- You can disconnect at any time from HearthShelf settings.

## Before you connect

You need:

- A HearthShelf server linked to the hosted WebApp.
- A Hardcover account.
- A Hardcover personal access token.

The token is saved on your connected HearthShelf server. HearthShelf does not
show the token again after it is saved.

## Create a Hardcover token

1. Sign in to Hardcover.
2. Open your Hardcover account settings.
3. Find the API or developer token area.
4. Create or copy a personal access token.
5. Return to HearthShelf.

Hardcover may change where it places API tokens in its settings. If the labels
do not match exactly, look for the account area that mentions API access,
developer access, or personal access tokens.

## Connect in HearthShelf

1. Open the hosted WebApp.
2. Go to **Settings**.
3. Open **Integrations**.
4. In the **Hardcover** card, paste your personal access token.
5. Select **Connect**.

After connecting, use **Sync now** if you want to run a sync immediately.
Future finished-book updates can sync to Hardcover as you use HearthShelf.

## Disconnect

Open **Settings** -> **Integrations** and select **Disconnect** in the
Hardcover card. Disconnecting stops future Hardcover sync from HearthShelf. It
does not delete books or reading-history entries already stored in Hardcover.

## Troubleshooting

If the connection fails, create a fresh Hardcover token and paste it again. Make
sure there are no extra spaces before or after the token.

If sync completes with missing matches, check that the book metadata in your
HearthShelf library has a clear title and author. Hardcover matching depends on
the metadata available for each finished book.
