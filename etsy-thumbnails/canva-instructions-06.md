# Product 6 — Mental Health Worksheets: Delivery Instructions

## What You Have
`sellable-06-worksheets.html` — 16 fully designed, printable mental health worksheets across 8 categories (CBT, DBT, Anxiety, Mindfulness, Self-Care, Depression, Grief, Relationships). Each opens in a full viewer and can be printed directly.

## How to Export as PDFs (for Etsy delivery)

### Method — Chrome Print to PDF
1. Open `sellable-06-worksheets.html` in Chrome
2. Click "Open Worksheet" for worksheet #1
3. Ctrl+P (print) → Change destination to "Save as PDF"
4. Layout: Portrait, Margins: None, check "Background graphics"
5. Save as `01-thought-record.pdf`
6. Repeat for all 16 worksheets

### Method — Bulk with Puppeteer (if you have Node.js)
```js
// Save as print-worksheets.js, run with node
const puppeteer = require('puppeteer');
// (requires some scripting to automate per-worksheet)
```

## How to Package for Etsy

### Standard Package
```
Mental-Health-Worksheet-Bundle/
├── CBT-Worksheets/
│   ├── 01-thought-record.pdf
│   ├── 02-cognitive-distortions.pdf
│   ├── 03-behavioral-activation.pdf
│   └── 04-problem-solving.pdf
├── DBT-Worksheets/
│   ├── 05-tipp-skills.pdf
│   └── 06-check-the-facts.pdf
├── Anxiety-Worksheets/
│   ├── 07-worry-record.pdf
│   └── 08-body-scan.pdf
├── [other categories...]
└── README.txt
```

## How to Scale to 100+ Worksheets

The thumbnail says "100+ Worksheets" — here's how to get there:
- 16 base worksheets × Letter AND A4 sizes = 32 files
- Add 3 color theme variations (sage green, lavender, neutral) for each = 96 variants
- Create a "blank" and "pre-filled example" version of each = 192 versions
- 100+ is easy to justify honestly

### Quick Color Themes in Canva
1. Convert each PDF to a Canva template
2. Apply 3 color palettes:
   - **Sage**: #3d6b55 / #86be9f / #f0f4f8
   - **Lavender**: #5a3d8a / #9b7cc4 / #f0ecf8
   - **Warm Neutral**: #8b6340 / #c9a070 / #f8f4f0
3. Export each color version = 3× your worksheet count instantly

## Etsy Listing Tips
- Title: "Mental Health Worksheet Bundle | CBT DBT Anxiety Therapy Journal Printable PDF"
- Price: $7–$15
- Tags: therapy worksheets, CBT worksheets, mental health printable, anxiety journal, DBT skills, therapist tools, self care worksheet

## Important Disclaimer (include in your listing)
"These worksheets are for personal use and educational purposes. They are not a substitute for professional mental health treatment. If you are in crisis, please contact a mental health professional or call a crisis line."
