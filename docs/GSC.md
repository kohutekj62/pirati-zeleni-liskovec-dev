# Google Search Console — SEO action plan
## Goal: rank highly for "volby Brno Starý Lískovec 2026" and related queries

---

## Competitor landscape (what ranks above us today)

Searches for *"komunální volby Brno Starý Lískovec 2026"* return these domains ahead of us:

| Domain | Why it ranks | What we can do about it |
|---|---|---|
| **staryliskovec.cz** | Official city website, high DA, gov domain | Can't beat on authority — target long-tail queries they ignore |
| **programydovoleb.cz** | National elections aggregator, has a page for our district | **Get listed there** — free, high-value backlink |
| **brnensky.denik.cz** | Regional newspaper with strong local authority | **Get press coverage** — send a press release |
| **brno.cz** | City of Brno portal | Can't outrank — appear alongside via GSC data |
| **kurzy.cz/volby** | Elections results aggregator | Will auto-list us once list is registered with ČSÚ |
| **nove-brno.cz** | Competitor campaign site — already indexed | Outrank by producing more content and getting more backlinks |

**Key finding:** Our site does not appear in any of these searches yet. The steps below fix that.

---

## Phase 1 — GSC setup (do this first, on desktop)

### 1. Create the GSC property
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property** → choose **Domain** (not URL prefix)
3. Enter `staryliskovec-on.cz` (without https://)
4. Google shows a TXT record — copy it

### 2. Verify ownership via DNS
1. Log in to your domain registrar (wherever staryliskovec-on.cz is registered)
2. Add a new **TXT record** with the value Google gives you
3. Back in GSC, click **Verify** — can take up to 24 h to propagate
4. Alternative: add the `<meta name="google-site-verification" ...>` tag to `<head>` in `index.html` if DNS access is difficult

### 3. Submit the sitemap
1. In GSC left menu: **Indexing → Sitemaps**
2. Enter `sitemap.xml` and click **Submit**
3. Our `sitemap.xml` is already in the repo — verify it lists the correct canonical URL (`https://www.staryliskovec-on.cz/`)

### 4. Request indexing of the homepage
1. In GSC top bar: paste `https://www.staryliskovec-on.cz/`
2. Click **Request indexing**
3. Repeat for any important sub-URLs if they exist

---

## Phase 2 — Technical audit in GSC (after first crawl, ~1–3 days)

### Core Web Vitals
- **Menu: Experience → Core Web Vitals**
- Check mobile and desktop separately
- Target: all URLs in "Good" (green) — our site is lightweight so this should pass

### Mobile usability
- **Menu: Experience → Mobile Usability**
- Should be clean — our CSS is mobile-first with correct viewport meta
- Fix any reported issues before the election campaign peaks

### Coverage / Indexing
- **Menu: Indexing → Pages**
- Check "Why pages aren't indexed"
- Common issues to fix:
  - `Discovered – currently not indexed` → Request indexing again
  - `Duplicate without user-selected canonical` → Confirm `<link rel="canonical">` in `index.html` is correct
  - `Blocked by robots.txt` → Check `robots.txt` in repo root

### Rich results / Structured data
- **Menu: Enhancement → any structured data type**
- We have JSON-LD (Organization + WebSite) — GSC will show if it parsed correctly
- Fix any errors shown — they block rich result eligibility

---

## Phase 3 — Performance monitoring (ongoing)

### Target queries to track
Set up filters in **Performance → Search results** for:

| Query (Czech) | Query (English intent) |
|---|---|
| `starý lískovec on` | brand |
| `volby starý lískovec 2026` | election direct |
| `komunální volby brno starý lískovec` | election district |
| `piráti zelení starý lískovec` | coalition |
| `slon starý lískovec` | acronym |
| `zastupitelé starý lískovec` | council |

### What to watch
- **Impressions rising** = Google is serving us for those queries
- **CTR below 5%** = our title/description isn't compelling — edit `<title>` and `<meta name="description">` in `index.html`
- **Average position 11–20** = we're on page 2 — need more backlinks or more content
- **Average position > 20** = technical issue or not enough authority yet

---

## Phase 4 — Off-page: the backlinks that will actually move the needle

GSC will show who links to us under **Links → External links**. We need more links from high-authority local domains. Priority list:

### Must-do (free, high impact)
1. **programydovoleb.cz** — submit our coalition at [programydovoleb.cz](https://programydovoleb.cz)
   - They already have a stub page for Brno-Starý Lískovec
   - Adding our program + candidate list here creates a direct backlink and appears in search results for our target queries
2. **brnensky.denik.cz** — send a press release for:
   - Campaign launch (done — can still submit)
   - Each major event (park clean-ups, debates)
   - Candidate profile stories
3. **volby.idnes.cz / iDnes Brno** — same press release distribution

### Medium priority
4. **Facebook events** linked back to the website — social signals
5. **piraten.cz / pirati.cz** — ask the Pirates to link to our district page from the Brno regional site
6. **zeleni.cz** — same for the Greens
7. **staryliskovec.cz** — ask the official city site to add us to their "volby" section once the list is officially registered

### Track all of these in GSC under Links once they appear

---

## Phase 5 — Content that ranks (beyond the homepage)

The homepage ranks for our brand name. To rank for competitive queries like "komunální volby Brno 2026" we need content Google can index on specific sub-topics. Options (all within the current single-page structure via visible section text):

- Add **"Brno-Starý Lískovec"** to the `<h2>` section titles in `content.js` where natural (already done for hero kicker and one about paragraph)
- Expand **program points** with local specifics — e.g. name specific streets, parks, schools in Starý Lískovec
- **News/Aktuality** section: publish real posts for each event — Google indexes these as fresh content

---

## Phase 6 — Pre-election checklist (September 2026)

- [ ] GSC property verified and sitemap submitted
- [ ] Zero coverage errors
- [ ] Core Web Vitals: all green on mobile
- [ ] Structured data: no errors
- [ ] Listed on programydovoleb.cz with full program
- [ ] At least one press mention in brnensky.denik.cz or similar
- [ ] Parent party sites (pirati.cz, zeleni.cz) link to us
- [ ] Homepage title/description reviewed for CTR (includes "Brno", year, coalition name)
- [ ] All 10 events published in Aktuality with dates and locations
- [ ] Request re-indexing after any major content update

---

## Quick reference — key GSC URLs

| Task | Where in GSC |
|---|---|
| Submit sitemap | Indexing → Sitemaps |
| Request indexing | URL inspection (top search bar) |
| See what queries we rank for | Performance → Search results |
| Check indexed pages | Indexing → Pages |
| Mobile issues | Experience → Mobile Usability |
| Structured data | Enhancements section |
| Who links to us | Links → External links |
| Core Web Vitals | Experience → Core Web Vitals |

---

*Last updated: June 2026*
