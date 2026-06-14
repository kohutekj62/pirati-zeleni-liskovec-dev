# SL-ON — Next Steps (updated 2026-06-14)

## Current state

Branch: **master**

The pexeso is restructured to **6 real thematic rounds** (52 places, down from 83).
All 31 generic/duplicate/planned places removed.  
4 real photos exist (round 2 schools). All other cards show emoji placeholder.

---

## Round structure

| # | Emoji | Czech | EN | Places |
|---|-------|-------|-----|--------|
| 1 | 🌳 | Příroda a parky | Nature & parks | 8 |
| 2 | 🎓 | Školy a kultura | Schools & culture | 9 |
| 3 | 🏛️ | Vybavenost | Public services | 8 |
| 4 | 💼 | Práce a firmy | Work & business | 9 |
| 5 | 🏆 | Sport a volný čas | Sport & leisure | 9 |
| 6 | 🚃 | Doprava a místa | Transport & places | 9 |

---

## Priority 1 — Verify coordinates on your own machine

```bash
git pull origin master
node pexeso/tools/verify-coords.js
```

Saves Street View screenshot per place → `pexeso/tools/coord-check/<id>.png`.  
To fix: edit `lat`, `lng`, `azimuth` in `pexeso/data/places.csv`, commit.

How to find coordinates and azimuth from Google Maps Street View:
- Navigate to the spot → copy URL
- URL contains `@<lat>,<lng>,3a,…,<azimuth>h`
- The number before `h` is the azimuth (0=north, 90=east, 180=south, 270=west)

---

## Priority 2 — Add photos (48 of 52 places still show emoji)

Drop photos as JPEG into `pexeso/assets/raw photos/` — name each file after the place id.  
Then run:

```bash
node pexeso/tools/import-photos.js
```

Script auto-converts to WebP 1200×900 px, moves file to correct folder, updates CSV.  
Commit and push.

Asset folder per round:

| Round | Folder |
|-------|--------|
| 1 Příroda | `pexeso/assets/priroda-parky/` |
| 2 Školy | `pexeso/assets/skoly/` |
| 3 Vybavenost | `pexeso/assets/obcanska-vybavenost/` |
| 4 Práce | `pexeso/assets/zamestnavatele/` |
| 5 Sport | `pexeso/assets/sport-volny-cas/` |
| 6 Doprava | `pexeso/assets/doprava/` |

---

## Priority 3 — Candidate photos (3 cards broken, 8 seats unfilled)

Photos missing on disk (flip cards show elephant instead):
- `assets/people/ayudh-ray.jpg`
- `assets/people/katerina-krizova.jpg`
- `assets/people/jakub-czapek.jpg`  ← note: convention is firstname-lastname

Also 8 candidates in `js/content.js` are still listed as `"Volné místo"` — fill in names and bios when the list is finalised.

---

## Priority 4 — Campaign content

- **News** — 6 placeholder posts in `js/content.js` → replace with real updates; add `image:` filenames pointing to `assets/`
- **Newsletter** — set `newsletterAction` in `js/content.js` once email tool chosen (Mailchimp / Ecomail / MailerLite)
- **Zelení region link** — `zeleniRegion` is empty in config
- **QR code** in `pexeso/pamphlet.html` — update URL before print run
- **Dev banner** — set `dev_banner: ""` in `js/content.js` (CS + EN) before public launch

---

## Priority 5 — Polish

- **Bebas Neue diacritics** — headings show wrong glyphs for Czech ě/á/í etc.; swap to a font subset that includes latin-ext
- **OG / social preview** — `og:image` in `index.html` should be a real campaign photo (not the placeholder)

---

## File map (quick reference)

| File | Purpose |
|------|---------|
| `pexeso/data/places.csv` | ★ All pexeso content — edit in Excel (save as CSV UTF-8, no BOM) |
| `pexeso/tools/import-photos.js` | Drop JPEGs in `raw photos/`, run this to convert + wire |
| `pexeso/tools/verify-coords.js` | Run locally to screenshot Street View for every place |
| `pexeso/tools/update_coords.py` | One-shot coord seeding script (already applied — don't re-run over verified data) |
| `pexeso/assets/<round>/` | WebP photos go here (managed by import-photos.js) |
| `js/content.js` | Main site text: candidates, news, config, nav labels |
| `assets/people/` | Candidate flip-card photos |
| `index.html` | Main site skeleton (don't edit unless changing structure) |
| `README.md` | Full developer guide |
