# 📋 Fitness Companion App — Full Project Requirements & Design Brief
> Drop this file into your MacroProject folder and keep it open while you build.
> This is the single source of truth for every feature, design decision, and behavior
> the app needs to have. If you're ever unsure what to build next, come back here.

---

## 🎯 What This App Is

This is not just a macro tracker. It is a full **fitness companion app** that combines
nutrition logging, AI-powered food lookup, AI-powered workout planning, and long-term
analytics — all in one clean, premium, dark-mode web app. It runs entirely in the
browser as a single HTML/CSS/JavaScript file. No frameworks, no installs, no backend
server required. The only external dependency is the Anthropic API for the AI features
(see the API Setup section below for instructions).

Think of the experience as: *a personal nutritionist and personal trainer, living inside
a beautifully designed dashboard on your phone or computer.*

---

## 🗂️ App Sections (Navigation)

The app is divided into four clearly navigable sections. Use a sidebar on desktop and
a bottom tab bar on mobile. Every section should feel like part of the same cohesive
design system — same fonts, same color palette, same motion language throughout.

The four sections are: **Today** (daily food log and macro totals), **Analytics**
(weekly and monthly charts), **Workout** (AI split builder and exercise library),
and **Settings** (goals, diet mode, bodyweight, API key entry).

---

## 🍽️ Section 1 — Today (Macro Tracking)

### Food Logging

The core of the app. The user types a food name, the AI fills in the macros (see AI
Food Finder below), and the meal is added to the daily log. Every meal appears as a
card in the log and can be deleted at any time. Meals must persist between sessions
using localStorage, tied to the current date so yesterday's log doesn't bleed into today's.

The macro fields for each food entry are: food name, calories, protein (g), total carbs (g),
fiber (g), sugar (g), and fats (g). Fiber and sugar live *inside* the carbs field —
they are a nutritional breakdown of total carbs, not separate macros. Show them visually
as sub-values beneath the total carbs number, not as equal siblings to protein or fat.
This matters both nutritionally and visually.

### AI Food Macro Finder

This is the single feature that makes the app genuinely useful rather than tedious.
Instead of forcing the user to look up nutrition info manually and type every number,
the app does it automatically using the Claude API.

Here is the exact flow: the user types a food name or description (for example,
"2 scrambled eggs with cheddar cheese" or "large banana") into the AI search field
and hits a button. The app sends that text to the Claude API with a carefully crafted
prompt instructing Claude to return *only* a JSON object — no prose, no explanation,
just the data. The app then parses that JSON and auto-fills all the macro input fields.
The user can review and adjust the values if needed, then hit Add Meal to log it.

The prompt sent to Claude should look something like this:

*"You are a nutrition database. The user will describe a food or meal. Respond ONLY
with a valid JSON object in this exact format and nothing else — no explanation, no
markdown, no preamble:
{"calories": 0, "protein": 0, "carbs": 0, "fiber": 0, "sugar": 0, "fats": 0}.
Use realistic average nutritional values. Food: [user input]"*

Stripping the response down to raw JSON prevents parsing errors and keeps the
experience fast. Always wrap the API call in a try/catch and show a friendly message
if it fails — never a silent error.

### Daily Totals & Goal Progress

The running totals for all macros are the visual hero of the Today screen — large,
prominent, and impossible to miss. Display them as animated circular rings or bold
progress bars, one per macro. As meals are added, the rings fill smoothly toward the
daily goal. When a goal is hit, the ring changes color and triggers a subtle celebratory
animation (a pulse, a glow) to reward the user. If the user *exceeds* a goal, the ring
turns a warning color — amber or red — rather than capping at 100%, so they always
know exactly where they stand.

### Diet Mode System

The diet mode selector lives in Settings but affects the goal targets shown throughout
the app. When a mode is selected, macro targets are automatically calculated and
populated. The user can always override these manually. The five supported modes are:

| Mode | Calorie Target | Protein | Carbs | Fats | Philosophy |
|---|---|---|---|---|---|
| **Dirty Bulk** | 500+ surplus above maintenance | High | Very High | Flexible | Maximize size; less concern about fat gain |
| **Clean Bulk** | 250–350 surplus | High | High, quality sources | Moderate | Gain muscle while staying relatively lean |
| **Maintenance** | Calories in = calories out | Moderate-High | Balanced | Balanced | Hold current weight and body composition |
| **Moderate Cut** | 300–500 deficit | High | Reduced | Moderate | Lose fat while preserving muscle |
| **Strict Cut** | 500–750 deficit | Very High | Low | Min. 20% of calories | Aggressive fat loss; protect muscle at all costs |

The app should also ask for the user's bodyweight (in lbs or kg, user's choice) so it
can calculate personalized protein targets using the 1.6–2.2g per kg of bodyweight
recommendation. This makes the goals feel personal rather than generic.

> 💡 **Developer reference:** Study how **MyFitnessPal**, **Cronometer**, and **MacroFactor**
> handle food logging, goal-setting, and macro progress display. You don't need to copy
> them, but these apps have been refined over years of real user feedback and they are
> excellent teachers of what good UX looks like in this space.

> 📚 **Verified Source Requirement — Critical:** Every AI prompt in this app — whether
> for nutrition advice, workout plan generation, or exercise breakdowns — must explicitly
> instruct Claude to ground its recommendations in established, peer-reviewed sports
> science and evidence-based bodybuilding literature. The prompt should tell Claude to
> base its guidance on sources consistent with the following verified authorities:
>
> - **Examine.com** — the gold standard for unbiased, citation-backed nutrition and
>   supplement research
> - **PubMed-indexed sports science studies** — peer-reviewed exercise and nutrition
>   research; Claude should reference study consensus, not cherry-picked outliers
> - **Renaissance Periodization (Dr. Mike Israetel)** — evidence-based hypertrophy and
>   periodization principles used by competitive bodybuilders and coaches
> - **NSCA (National Strength and Conditioning Association)** — the professional
>   governing body for strength training science and certified coaching standards
> - **Alan Aragon's Research Review (AARR)** — respected evidence-based nutrition
>   analysis and meta-review
> - **Stronger By Science (Greg Nuckols)** — deep-dive research analysis on
>   powerlifting, hypertrophy, and evidence-based training methodology
>
> Claude should also be instructed to explicitly flag when a recommendation is strongly
> supported by research versus when it reflects widely accepted gym practice that has
> limited direct evidence. This transparency is what separates a trustworthy fitness
> tool from one that just generates confident-sounding but unverified advice.
>
> In practical terms, the workout AI prompt should include language like: *"Base all
> recommendations on consensus from peer-reviewed sports science research and
> established evidence-based coaching authorities such as Renaissance Periodization,
> the NSCA, Stronger By Science, and Examine.com. When making recommendations about
> rep ranges, volume, frequency, or nutrition targets, cite the principle or research
> basis behind the recommendation. Distinguish clearly between what is well-evidenced
> and what is common practice."*

---

## 📊 Section 2 — Analytics

Analytics is what transforms this app from a daily habit tool into a long-term
performance tracker. It answers the question every serious person eventually asks:
*"Am I actually being consistent over time, or does it just feel that way?"*

### Weekly View

The weekly view covers the past 7 days of logged data. It displays two chart types
together: a **bar chart** with grouped bars showing each day's intake per macro
(so the user can compare days side by side), and a **line chart** with smooth flowing
lines showing how each macro trended across the 7 days. The line chart is especially
powerful for spotting behavioral patterns — a consistent dip on rest days, a spike
every weekend, chronic under-eating on certain days of the week.

### Monthly View

The monthly view zooms out to the past 30 days. Rather than showing individual days
(which becomes too visually dense at this scale), it groups data by week and displays
weekly averages as a line chart. This lets the user see whether their averages are
trending up, down, or holding flat — the kind of big-picture view that reveals whether
the overall strategy is working.

### Summary Stats

Below the charts, show a summary card for both the weekly and monthly views that includes:
the average daily intake for each macro over the period, the number of days the user
hit their calorie goal, the number of days they hit all macro goals simultaneously,
and their longest streak of consecutive days hitting all goals. These numbers make the
charts feel actionable rather than decorative.

### All Four Macros

Both chart types should display all four tracked macros: protein, carbs, fats, and
calories. Use the same accent color for each macro consistently throughout the entire
app — whatever color represents protein on the Today screen must be the same color
representing protein in the analytics charts. This color consistency is what makes
the data instantly readable without needing a legend every time.

### Technical Note for the Developer

All analytics data comes from the same localStorage entries that the daily log writes.
The app reads all stored date keys, sorts them, and aggregates the macro values for
whichever time range is being viewed. For the charts themselves, use **Chart.js**
imported from a CDN — it handles both bar and line charts with built-in smooth
animations and requires no installation. Do not build charts from scratch.

---

## 💪 Section 3 — Workout AI

This section turns the app into a true fitness companion rather than just a nutrition
tool. It has two distinct but deeply connected components: a **Split Builder** and
an **Exercise Library**, both powered by the Claude API.

### Component A — AI Split Builder

The split builder is where the user describes their situation and the AI generates a
complete, personalized weekly workout plan tailored specifically to them. Before
generating anything, the app collects the following inputs through a clean form:
the user's fitness goal (muscle gain, fat loss, athletic performance, or general
fitness), how many days per week they can train, how long each session can be,
their experience level (beginner, intermediate, or advanced), and what equipment
they have access to (full commercial gym, home setup with dumbbells, bodyweight only,
or a specific combination).

Once submitted, all of that information is sent to Claude with a prompt asking it to
return a complete weekly workout split. The generated plan must include the overall
split structure (for example Push/Pull/Legs, Upper/Lower, or a traditional body-part
split), every day's exercises with specific sets and reps, the equipment or machine
to use for each movement, and a brief explanation of *why* each exercise was chosen
for this goal. That "why" is critical — it turns the plan from a random list into an
educational tool that actually teaches the user about training.

Display the generated plan as collapsible day cards so the user can expand only the
day they care about without being overwhelmed by the whole week at once. The user
should be able to save their plan to localStorage and regenerate a new one whenever
they want to try something different.

### Component B — Exercise Library

The exercise library is a searchable AI reference the user can explore any time,
whether they are planning a workout or standing in a gym trying to figure out what
a machine does. The user types in a muscle group ("rear delts"), a movement name
("Romanian deadlift"), or a piece of equipment ("cable machine") and the AI returns
a thorough breakdown.

For every search, the AI should explain what the movement targets (primary and secondary
muscles), what machine or equipment is used and exactly how to set it up, proper
technique broken down step by step, the most common mistakes beginners make and how
to avoid them, and where the exercise typically fits in a training split (for example:
"this is usually done on a Pull day, toward the end of the session after heavier
compound rowing movements"). This last point — the contextual placement — is what most
exercise libraries skip and what makes this one genuinely useful.

### Connecting the Two Components

Wherever possible, the split builder and the library should be linked together. If the
AI generates a plan that includes "Incline Dumbbell Press," the user should be able to
tap that exercise name directly and navigate to the library entry for it. This turns the
generated plan from a static document into an interactive, educational experience —
exactly the kind of thing that makes a fitness app feel premium and thoughtful.

---

## 🎨 Design & UI Requirements

The design must feel **premium, fluid, and intentional**. The aesthetic sits between
a high-end fitness tracking app and a sleek analytics dashboard. Every interaction
should feel smooth. Every screen should feel like a decision was made, not a default
was accepted. This is not a functional prototype with placeholder styling — the design
is a first-class requirement, not a finishing touch.

### Theme & Color

The app is dark mode only. The background should be deep and layered — think dark
charcoal, deep navy, or near-black with a subtle gradient or noise texture applied.
Avoid flat pure black (#000000), which looks harsh and cheap on modern screens. The
depth and richness comes from layering slightly different dark tones: a base background,
slightly lighter card surfaces, and even lighter input field backgrounds. This creates
visual hierarchy without needing heavy borders or shadows.

Choose one bold accent color as the primary brand color — electric green, vivid cyan,
or energetic orange all work well for a fitness context — and use it consistently for
active states, filled progress rings, and primary action buttons. Use secondary colors
for each individual macro (for example, orange for protein, blue for carbs, yellow for
fats, white for calories) and keep these absolutely consistent across every screen and
chart in the app.

All colors must be defined as CSS variables at the top of the stylesheet. This is not
optional — it is what makes the design system coherent and makes future changes
maintainable.

### Typography

Do not use generic fonts like Arial, Roboto, Inter, or any default system font. Import
something with genuine personality from Google Fonts. A geometric sans-serif or a
modern display font works well for headings; pair it with a clean, highly legible font
for body text and data labels. The font choice should feel like someone made a deliberate
creative decision, not like they left the browser default in place.

### Motion & Animation

Every significant state change should be animated, but kept subtle and purposeful. Meals
slide in when added and fade out when deleted. Progress rings fill with a smooth easing
curve rather than jumping to the final value instantly. Chart bars grow upward on load.
Navigation transitions feel like moving between panels rather than reloading a page.
Buttons respond to hover with a slight lift or color shift. None of these animations
should be slow or distracting — they should be just noticeable enough to make the app
feel alive and responsive.

### Layout & Responsiveness

On desktop, use a left sidebar for navigation and a main content area to the right.
On mobile (any viewport under 768px wide), collapse the sidebar into a bottom tab bar
with icons and labels. All cards, charts, and forms should reflow cleanly at every
screen width. The app should feel equally good on a phone in the gym and on a laptop
at home.

---

## 💾 Data Storage

All user data is saved in the browser's localStorage. No server, no account, no login —
everything lives on the user's device. The developer should structure the localStorage
data carefully so it is easy to aggregate for analytics. A clean approach is to store
meals under date-keyed entries (for example, `meals_2026-05-13`) so that pulling a week
or month of data is as simple as iterating over a known range of date strings. User
settings — diet mode, macro goals, bodyweight, saved workout plan — should each have
their own separate localStorage keys so they do not get mixed up with meal data.

The user's Anthropic API key should also be saved to localStorage after they enter it
in Settings, so they only have to enter it once.

---

## 🔑 API Setup (Developer Instructions)

Both AI features use the **Anthropic Claude API**. Calls go directly from the browser's
JavaScript to `https://api.anthropic.com/v1/messages`. The user enters their own API key
once in the Settings section; the app stores it in localStorage and attaches it as the
`x-api-key` header on every request. Always use `claude-sonnet-4-20250514` as the model —
it provides the right balance of intelligence, speed, and cost for this use case.

Every API call must be wrapped in a try/catch block. If a call fails, show the user a
clear, friendly error message in plain English — never expose raw error codes or let
the app fail silently.

---

## 🔢 Macro Science Reference

These are the nutritional principles the app's default target calculations should be
based on. The developer should use these when writing the diet mode logic.

Protein provides 4 calories per gram and is the most critical macro for nearly every
fitness goal. The standard recommendation is 1.6–2.2g per kilogram of bodyweight per
day, representing roughly 25–40% of total calorie intake. Protein targets stay high
across all five diet modes.

Carbohydrates also provide 4 calories per gram and are the body's primary energy source,
especially for intense resistance training. Total carbs should represent 30–45% of total
calories on most modes, dropping lower on cuts. Within carbs, fiber (target: 25–35g
daily regardless of mode) supports satiety and gut health, while sugar provides
fast-burn energy and should ideally come from whole food sources rather than processed ones.

Fats provide 9 calories per gram — more than twice that of protein or carbs — and are
essential for hormone production, cellular function, and sustained energy. Fat intake
must never fall below 20% of total daily calories on any diet mode, as going below this
threshold can impair hormonal health over time.

---

## ✅ Full Feature Checklist

Use this to track development progress from start to finish.

**Macro Tracking — Today Screen**
- [ ] Food input form with all macro fields (name, calories, protein, carbs, fiber, sugar, fats)
- [ ] AI food macro finder — type a food description, auto-fill the form via Claude API
- [ ] Add meal to daily log with slide-in animation
- [ ] Delete meal from log with fade-out animation
- [ ] Running daily totals updating instantly on every add or delete
- [ ] Animated progress rings or bars toward daily goals for all four macros
- [ ] Visual indicator (color change + animation) when a goal is hit or exceeded
- [ ] Warning indicator (amber or red) when a goal is exceeded
- [ ] Diet mode selector with five modes and auto-populated macro targets
- [ ] Bodyweight input field for personalized protein target calculations
- [ ] Manual goal override after diet mode is selected
- [ ] localStorage persistence with date-keyed meal entries that survive page refresh

**Analytics**
- [ ] Weekly view with grouped bar chart showing all macros for the past 7 days
- [ ] Weekly view with line chart showing macro trends over the past 7 days
- [ ] Monthly view with weekly-average line chart for the past 30 days
- [ ] Summary stats card: average intake, days goals hit, best streak
- [ ] Consistent per-macro accent colors matching the Today screen

**Workout AI**
- [ ] Split builder input form (goal, days per week, session length, experience, equipment)
- [ ] AI-generated weekly workout plan with exercises, sets, reps, equipment, and rationale
- [ ] Plan displayed as collapsible day cards
- [ ] Save current plan to localStorage
- [ ] Regenerate plan button
- [ ] Exercise library search field (by muscle group, movement name, or equipment)
- [ ] AI-generated exercise breakdown (muscles, form, setup, common mistakes, split placement)
- [ ] Tap-through links from exercises in generated plan directly to their library entries
- [ ] All workout and nutrition AI prompts explicitly instruct Claude to ground advice in
      verified sources (Examine.com, PubMed consensus, Renaissance Periodization, NSCA,
      Alan Aragon, Stronger By Science) and to flag evidence strength vs. common practice

**Design & UX**
- [ ] Dark mode with rich layered backgrounds — not flat black
- [ ] Bold primary accent color plus per-macro color system, consistent everywhere
- [ ] Distinctive non-generic font pairing imported from Google Fonts
- [ ] All colors and spacing defined as CSS variables
- [ ] Sidebar navigation on desktop, bottom tab bar on mobile
- [ ] Smooth animations on all state changes, additions, deletions, and transitions
- [ ] Fully responsive at all screen sizes

**Infrastructure**
- [ ] API key entry field in Settings, stored in localStorage
- [ ] Friendly plain-English error handling for all Claude API calls
- [ ] All meal data structured in localStorage with date-keyed entries
- [ ] Settings data (goals, mode, bodyweight, plan) stored in separate localStorage keys

---

## 📁 Suggested File Structure

```
MacroProject/
├── index.html                          ← entire app (HTML + CSS + JS in one file)
├── MACRO_TRACKER_REQUIREMENTS.md       ← this file — keep it in the project folder
└── notes/
    └── macro_science_reference.md      ← optional deeper nutrition notes
```

---

*App name: Fitness Companion (working title — rename freely)*
*Design standard: Premium dark mode — fluid, sleek, every detail intentional*
*AI: Anthropic Claude API — model: claude-sonnet-4-20250514*
*Target user: Anyone from gym beginner to serious athlete*
*Built as: Single-file browser app — no framework, no install, no backend*
