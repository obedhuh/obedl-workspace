# Product 2 — Wedding Planner: Delivery Instructions

## What You Have
`sellable-02-wedding-planner.html` — Fully functional wedding planner web app with 10 tabs:
Dashboard, Budget Tracker, Guest List, Vendor Directory, Timeline, Seating Chart, Checklist, RSVP, Honeymoon Planner, Registry

All data saves to localStorage. Buyers open in Chrome and use it directly, or you can convert to Google Sheets.

## Delivery Option A — HTML File (Easiest)
1. Zip the HTML file: right-click → Send to → Compressed folder
2. Upload `sellable-02-wedding-planner.zip` to your Etsy listing
3. Buyers download, unzip, open in Chrome — works instantly

## Delivery Option B — Convert to Google Sheets (More Sellable)
This converts your HTML template into a true Google Sheets template buyers can copy.

### Step 1 — Create in Google Sheets
1. Go to sheets.google.com → Blank spreadsheet
2. Create these 26 tabs (bottom tab strip):
   - Instructions, Dashboard, Budget, Guest List, Vendors, Timeline, Day-Of Schedule,
     Seating Chart, Checklist 18mo, Checklist 12mo, Checklist 9mo, Checklist 6mo,
     Checklist 3mo, Checklist 1mo, Week-Of, RSVP Tracker, Meal Count, Budget by Category,
     Vendor Contacts, Vendor Status, Honeymoon Budget, Honeymoon Itinerary, Registry,
     Gift Thank Yous, Ceremony Script, Photo Shot List

### Step 2 — Budget Tab formulas
- Column A: Category
- Column B: Estimated (manually entered)
- Column C: Actual (manually entered)
- Column D: Deposit Paid (manually entered)
- Column E: Balance Due = `=MAX(0,C2-D2)`
- Column F: Saved/Over = `=B2-C2`
- Row at bottom: TOTAL = `=SUM(B2:B100)` etc.

### Step 3 — Guest List formulas
- Count attending: `=COUNTIF(C:C,"Attending")`
- Count pending: `=COUNTIF(C:C,"Pending")`
- Total guests: `=COUNTA(A2:A1000)`

### Step 4 — Make it a template
1. File → Share → Share with others → set to "Anyone with the link can view"
2. Change the URL from `/edit` to `/copy`
3. When buyer clicks the link, Google asks them to "Make a copy" — this creates their own version
4. Deliver this `/copy` link in your Etsy download as a PDF with the link

### Step 5 — Create delivery PDF
1. Open Canva → Create Design → A4
2. Add your branding, the Google Sheets link, and short setup instructions
3. Export as PDF → upload to Etsy

## Pricing
Price at $9–$17. The 26 tabs and pre-built formulas justify the higher end.
Use "INSTANT DOWNLOAD | Google Sheets + Excel" in your title.

## Excel Compatibility
Google Sheets files can be downloaded as .xlsx (File → Download → Excel).
Tell buyers this in your listing description.
