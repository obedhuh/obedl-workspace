# CLAUDE.md — Operating Rules

Vault: `C:\Users\obedl\OneDrive\Documents\claude brain\CLaude brain`

---

## Who I'm Working For
18-year-old building multiple passive income businesses. Goal: $15K by end of summer 2026.
Active streams: Etsy digital products, Discord bot, Dropshipping (+ more planned).
Execution > perfection. Ship fast, fix fast, scale what works.

---

## Session Start (every time)
1. Read `00-Claude-Brain/TOOLS.md` — all tools, paths, MCPs. Always first.
2. Read `00-Claude-Brain/CLAUDE-BRIEFING.md` — find active project
3. Read that project's `_index.md` — load context. Stop there.
4. Never scan all projects or all files. One branch at a time.

## Session End (every time)
- Update active project `_index.md` with progress + next actions
- If a bug was fixed: log it in that project's `fixes.md` (see Fix Tree rule)
- Write anything non-obvious to auto memory

---

## Tool Rules — Non-Negotiable

### MCP Tools (all connected, always use them)
| Tool | When to use |
|---|---|
| `mcp__playwright__*` | Screenshot + verify EVERY UI before reporting done. No exceptions. |
| `mcp__filesystem__*` | Read/write vault files and project files |
| `mcp__context7__*` | Before writing ANY framework/library code — get live docs first |
| `mcp__serena__*` | Before large refactors or navigating unfamiliar code |
| `mcp__magic-21st__*` | UI component inspiration and generation |
| `mcp__github__*` | PRs, issues, repo ops |

Never use a node script when an MCP tool can do it. Never use built-in Read/Write when `mcp__filesystem__*` can do it.

### Ollama (local worker model)
- Binary: `C:\Users\obedl\AppData\Local\Programs\Ollama\ollama.exe`
- Delegate helper: `node C:\Users\obedl\projects\delegate.js "<task>"`
- Default model: `qwen2.5-coder:1.5b` (code) | fallback: `llama3.2:3b` (general)
- **Always use Ollama for:** boilerplate, repetitive functions, first draft CSS/HTML snippets
- **Always keep with Claude:** architecture, debugging, final review, anything requiring reasoning
- Treat ALL Ollama output as untrusted draft. Review before using. Discard if wrong.

---

## Fix Tree Rule
Every time a bug or problem is solved, log it in the project's `fixes.md`:
```
## [Short problem name]
Symptom: what it looked like
Cause: why it happened
Fix: what solved it
Prevention: how to avoid next time
```
This exists so we never solve the same problem twice. No exceptions.

---

## Execution Rules

1. Read the full instruction before starting. Flag anything vague or risky BEFORE touching code.
2. Understand existing patterns first — never edit blind.
3. One concern at a time. Focused changes only.
4. Test after every major change.
5. Playwright visual verify before calling any UI done.
6. If a tool or API isn't available, say so. Never fake it.
7. NEVER rewrite a whole file for a small fix.
8. NEVER make unsolicited refactors or style changes.
9. NEVER proceed on an ambiguous instruction — ask first.

---

## UI/UX Rules

### Never do
- Generic AI-looking UI: flat gray boxes, Lorem Ipsum, emoji icons on cards
- Hardcoded hex values inline — always use CSS custom properties
- Fixed pixel widths — responsive by default
- Gradient top-border on cards — that's an overused template pattern
- Emoji in tab labels, button text, or stat cards
- Fake loading states or placeholder interactions

### Always do
- Dark theme as default — `#09090b` bg, `#18181b` surface, `#27272a` border
- `Space Grotesk` for numbers/display, `Inter` for body text
- Left `4px solid` border accent on stat cards (colored by meaning)
- Seed real demo data — charts must render with actual bars, not flat lines
- `Escape` key closes all modals (keydown listener required)
- Theme variants via `data-theme` on `<html>` + CSS custom property overrides
- vs-last-month delta on every financial stat card
- Progress bars: color-coded (green/amber/red by threshold)
- Backdrop blur on modal overlays

### Design references
- Fonts: `04-Design-Refs/font-pairings.md`
- Themes: `04-Design-Refs/dark-themes.md`
- Inspiration: Linear, Vercel, Stripe, Mercury — calm, data-first, no decorative noise

### Stack (when choice is open)
- Plain HTML products: CSS custom properties, Space Grotesk + Inter via Google Fonts
- React: TailwindCSS + shadcn/ui patterns, Framer Motion for animation

---

## Communication Rules
- Direct. No filler. No "Great question!" No trailing summaries.
- Match energy — casual when they're casual, focused when they're focused.
- Short by default. Go deep only when asked.
- Flag opportunities (automation, monetization) in 1–2 sentences max.

---

## Income Areas

### Digital Products (Etsy)
- Single-file HTML apps with localStorage, sold as digital downloads
- Always: real data, toast notifications, JSON export/import, print-friendly, mobile responsive
- Always Playwright verify before done
- Pricing: $8–18 depending on complexity

### Client Work
- Load `01-Projects/clients/_index.md` for active client context
- Always ask: what's the deliverable, what's the deadline, who's the audience

---

## If Instruction Is Unclear
Stop. Use this format:

**What I understood:** [restate goal]
**What's unclear:** [specific issue and why it matters]
**My question:** [one direct question]

Then wait. Never guess on ambiguous work.
