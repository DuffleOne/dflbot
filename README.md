# dflbot

A bot for Discord - a fun play around to see what Discord can do and build a bot so when Rudolph and I stream PUBG, we can play music and do other things. May work as a great base for a Discord bot when I return to EVE Online.

## Install

Requires node, run `npm i` to install the requirements. Then run `npm run debug` to run the server locally. Make sure you enter your Discord Bot Token in `start.js` under the boot directory. Optionally change the Music folder too.

When you're ready, run `npm run build` to build then `npm run start` to run it in production.

## Commands

This is still heavily work in progress, just built it, so commands are constantly changing.

- join &lt;channel?&gt; (join a voice channel)
- leave (leave a voice channel)
- play &lt;music&gt; (play a song)
- pause
- resume
- stop
- list (show a list of known songs)
- playtime (current seconds into the song)

## Roadmap

The commands in the app directory are heavily tied into the Discord SDK, and for a project like this that will only ever be ran on Discord, it's not a bad thing. But it would be cool if the app methods returned some sort of common interface and it was picked up specifically by a Discord handler which then executed them.
