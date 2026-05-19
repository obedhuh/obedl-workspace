# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running

Open `index.html` directly in a browser — no build step, no server needed.

## Architecture

Single-file app (`index.html`) — all HTML, CSS, and JavaScript in one file. No dependencies except Chart.js loaded from CDN.

**Storage:** Everything persists via `localStorage`. Three keys: `trades` (array), `setups` (array), `rituals` (array). Access only through the `store` object at the top of the script — never read/write `localStorage` directly elsewhere.

**Tab system:** `showTab(name)` swaps `.active` class on both `.tab` divs and `nav button` elements. Each tab has a corresponding render function (`renderOverview`, `renderTradeTable`, `renderPlaybook`) called on switch. The coach tab renders on demand via `runCoach()`.

**Grading system:** Trades are graded A+/A/B/C/D. Grade badges use CSS classes in the format `.grade-A\+`, `.grade-A`, etc. — note the escaped `+` in the selector. The AI coach in `runCoach()` is rule-based (no API call) — it analyzes trade data locally and surfaces behavioral patterns.

**Charts:** Two Chart.js instances stored on `window._pnlChart` and `window._gradeChart`. Always call `.destroy()` on the existing instance before re-rendering to avoid canvas reuse errors.
