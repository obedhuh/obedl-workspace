# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projects in this folder

### macroject.html — AI Fitness / Macro Tracker
Single-file browser app. No build step — open directly in browser. Uses Supabase (CDN) for auth/storage and Chart.js for graphs. All theme variables are CSS custom properties on `:root`; dark/light mode is toggled by JS swapping those values. `food-data.js` and `modules.js` are companion scripts loaded alongside the HTML.

### discord_order_bot/
See `discord_order_bot/CLAUDE.md` — it has full architecture docs. Run with `python main.py` after `pip install -r requirements.txt` and a valid `.env`.

## Shared notes
`supabase-schema.sql` contains the DB schema for macroject. `start.ps1` / `start.bat` are convenience launchers for the bot. `go-public.ps1` likely handles tunneling/deployment — check before running.
