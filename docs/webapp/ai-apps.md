# Connect an AI app

HearthShelf can connect to Claude and other AI apps that support the Model
Context Protocol (MCP). Once connected, you can ask questions about your own
library in ordinary conversation:

- "Based on what I've finished, would I enjoy this book?"
- "What should I read next?"
- "Do I already own anything by this author?"
- "What have I been listening to lately?"

The connection is **read-only**. An AI app can see your library, your reading
history and your listening stats. It cannot change, delete or upload anything,
it cannot play audio, and it never sees your password.

HearthShelf does not use AI apps to source, host, or distribute books. The
connection only reads what is already in your own library. You are responsible
for the content you add to your own server and for the external services you
connect.

## What the AI app can see

| It can read | It cannot do |
| --- | --- |
| Your libraries and the books in them | Change or delete anything |
| Books you have finished, and when | Upload or import books |
| What you are part-way through | Play or download audio |
| Your listening totals and recent activity | See your password or payment details |
| Your HearthShelf recommendations | Reach any server you have not linked |

Answers come from your AI app, not from HearthShelf. HearthShelf sends it the
facts about your library; the AI app does the reasoning. That also means the
cost of those answers falls under your own AI subscription, and HearthShelf does
not add a charge for it.

## Before you start

You need:

- A HearthShelf server linked to the hosted WebApp.
- An AI app that supports remote MCP servers.

For Claude specifically, custom connectors require a Claude Pro, Max, Team or
Enterprise plan. Anthropic sets that requirement, not HearthShelf.

## Connect

1. Open the hosted WebApp.
2. Go to **Settings**.
3. Open **AI apps**.
4. Select **Copy** to copy your connection address.
5. Open your AI app's connector settings. In Claude this is
   **Settings** -> **Connectors**.
6. Choose **Add custom connector** and paste the address.
7. Sign in with HearthShelf when prompted, then select **Connect**.

Your connection address always looks like this:

```
https://mcp.hearthshelf.com/mcp
```

The same address works in any app that supports remote MCP servers.

::: tip Why you still paste an address
AI apps do not currently offer a link that fills the address in for you, so
that one paste is unavoidable. Everything after it is handled by the sign-in
flow — there is no token to generate and no configuration file to edit.
:::

## What happens when you connect

You sign in to HearthShelf as yourself, and HearthShelf shows you a screen
naming the app that is asking and exactly what it will be able to read. Nothing
is shared until you approve it.

The AI app never receives your HearthShelf password. It receives its own
permission to read your library, which you can withdraw at any time.

Each person's connection is their own. If several people use the same
HearthShelf server, an AI app connected by one of them sees only that person's
library access, reading history and stats.

## Using it

Once connected, ask questions in ordinary language. The AI app decides which
information it needs and asks HearthShelf for it.

Useful things to try:

- **Judging a new book.** "I'm thinking about starting this one — does it fit
  what I usually like?" The app compares it against books you have actually
  finished, which is a better signal than what happens to sit in your library.
- **Choosing from what you own.** "What's in my library that's like the last
  thing I finished?" Answers are drawn from your own shelves.
- **Picking up where you left off.** "What am I part-way through, and which
  should I finish first?"
- **Checking before you buy.** "Do I already have this?"

## Disconnect

Remove the HearthShelf connector in your AI app's connector settings. In Claude
this is **Settings** -> **Connectors**. Removing it immediately stops that app
from reading anything further.

## Troubleshooting

**The app says the connection expired.**
Reconnect the HearthShelf connector in your AI app. Connections are refreshed
by signing in again; nothing is lost when this happens.

**The app says no servers are linked.**
Link a server to your HearthShelf account first — see
[Linking & Invites](/webapp/pairing). The AI connection can only reach servers
already linked to your account.

**The app says several servers are linked.**
Ask it to list your servers, then name the one you mean in your question. Every
lookup accepts a specific server when you have more than one.

**The app cannot find a book you own.**
Search matches on title, author and narrator. If the book's metadata in your
library is incomplete, fix the metadata on the book and try again.

**Answers seem to miss books you have read.**
Reading history is built from books marked finished in HearthShelf. Books you
read elsewhere and never marked finished will not appear.
