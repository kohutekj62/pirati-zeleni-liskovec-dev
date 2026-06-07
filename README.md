# Starý Lískovec ON (SLON) — coalition website

The campaign website for the **Piráti + Zelení** coalition in Brno–Starý Lískovec,
for the municipal elections in autumn 2026. Czech by default, switchable to English.

🌐 Live at **https://www.staryliskovec-on.cz**
📦 Code at **https://github.com/kohutekj62/SL-ON**

This README is written for someone with **no coding experience**. Take it slowly,
follow the steps, and you can run the whole site yourself.

---

## 1. The one thing to remember

> **All the words on the website live in one file: [`js/content.js`](js/content.js).**

To change any text, you open that file, edit the text between `"quotes"`, and save.
Czech and English sit right next to each other. You almost never need anything else.

There is **no build step** and **no software required just to run the site** — it's
plain HTML/CSS/JavaScript. You can literally double-click `index.html` to open it.

---

## 2. See the site on your own computer

**The easy way:** open the folder and **double-click `index.html`**. It opens in your
browser. That's it. (The language switch and everything else work this way.)

**The "proper" way** (behaves exactly like the real server — recommended before publishing):

```bash
npm install      # first time only, see section 6
npm run serve    # then open the address it prints, e.g. http://127.0.0.1:4173
```

Press `Ctrl + C` in the terminal to stop it.

---

## 3. What each file is for

| File / folder | What it holds | Do you edit it? |
|---|---|---|
| **`js/content.js`** | ⭐ **All the text** (Czech + English), candidates, program, events, news, links | **Yes — this is your main file** |
| `assets/` | Images: the logo, the elephant, candidate photos | Yes — drop new photos here |
| `css/styles.css` | Colours, fonts, spacing, the whole look | Only to change the design |
| `index.html` | The page structure (the skeleton) | Rarely |
| `js/i18n.js` | The Czech/English switching machinery | No |
| `js/render.js` | Builds the lists from `content.js` | No |
| `js/main.js` | Clicks: menu, language, the elephant flip, forms | No |
| `tests/` | Automated tests | No (just run them) |
| `README.md`, `QA-CHECKLIST.md` | These guides | — |

Every file is **heavily commented**, so if you do open one, the comments explain
what each part does.

---

## 4. How to do the common edits

### ✏️ Change a piece of text
1. Open `js/content.js`.
2. Use your editor's **Find** (Ctrl+F) to search for a few words of the text you want to change.
3. Edit the text **inside the quotes only**. Leave commas, colons and brackets alone.
4. Save. Refresh the page.

> **Golden rules:** only change text inside `"..."`; never delete a comma `,`, colon `:`
> or bracket `{ } [ ]`. If your text needs a quote mark inside it, type `\"`.

### 🖼️ Change a candidate's photo
1. Put the new photo in `assets/people/` (use a simple name: lowercase, no spaces, e.g. `jana-nova.jpg`).
2. In `js/content.js`, find that person and change their `photo:` line to the new file name.

### ➕ Add or remove a candidate / program point / event / news post
In `js/content.js`, each item is one block inside `{ ... }`.
- **To add one:** copy a whole existing block (including its trailing comma `},`) and edit the copy.
- **To remove one:** delete its whole block (including the comma).

### 🎨 Change the colours or fonts
Open `css/styles.css`. Right at the top is a block called `:root` with friendly names
like `--color-yellow` and `--font-display`. Change a value there and it updates everywhere.

### 🔌 Fill in your real details (do this once)
Open `js/content.js`, find the **`config`** block at the top, and replace every `TODO…`:
- `email`, `phone` — shown in the *Spojme se* section.
- `facebook`, `instagram`, `twitter`, `youtube` — paste your page URLs (leave `""` to hide one).
- `formspreeId` — to make the contact form send you real e-mails (see below).
- `newsletterAction` — to switch on the newsletter box (see below).

#### Make the contact form send real e-mails (free)
1. Go to **https://formspree.io**, sign up, create a form, and connect your e-mail.
2. Formspree gives you a form address like `https://formspree.io/f/`**`xxxxxxxx`**.
3. Copy **only the `xxxxxxxx`** part into `formspreeId` in `js/content.js`.

Until you do this, the form still works — it opens the visitor's own e-mail app instead.

#### Switch on the newsletter box
Paste the *form action URL* from your e-mail tool (Mailchimp / Ecomail / MailerLite)
into `newsletterAction`. Leave it `""` and the newsletter box stays hidden.

---

## 5. The fun feature: the elephant 🐘

In the **Lidé** section each person first appears as our neon elephant. Click (or tap,
or press Enter) and it flips to reveal the real photo; click again and the elephant is back.
Each card flips on its own. This is handled in `js/main.js` (function `setupElephantFlip`)
and styled in `css/styles.css` (search for "flip-card").

---

## 6. Testing (your safety net)

The tests open a real browser, click around, and tell you in plain language if
anything broke. **You install the tools once:**

```bash
npm install                              # downloads the test tools (first time only)
npx playwright install chromium          # downloads the test browser (first time only)
```

Then any time you want to check the site:

```bash
npm test            # runs all the browser + accessibility tests
npm run report      # opens a nice visual report of the last run
npm run lh          # Lighthouse: performance / SEO / accessibility scores (needs Chrome)
```

What the tests check: the page and all sections load · the right number of
candidates/program points/events · the **CZ↔EN switch** works and is remembered ·
the **elephant flips** to the photo and back · the program cards expand · the contact
form validates · the mobile menu opens · and there are **no serious accessibility problems**.

You don't have to run these by hand every time — see the next section: GitHub runs
them for you automatically.

---

## 7. Publishing your changes

You have two ways. **Both automatically trigger the tests and re-publish the site.**

### Option A — edit on the GitHub website (easiest, nothing to install)
1. Go to https://github.com/kohutekj62/SL-ON
2. Click the file you want to change (e.g. `js/content.js`), then the ✏️ pencil icon.
3. Make your edit, scroll down, and press **Commit changes**.
4. Wait ~1–2 minutes. GitHub runs the tests (green ✓ / red ✗ shown next to your commit)
   and updates the live site.

### Option B — from your computer (after `git` is set up)
```bash
git add .
git commit -m "Update program text"
git push
```

> The site re-publishes itself a minute or two after every push. If a test fails
> (red ✗), click it on GitHub to read what to fix — your live site keeps the last
> working version until you fix it.

---

## 8. First-time deployment to GitHub Pages + the custom domain

You only do this **once**. After that, section 7 is all you need.

### Step 1 — Put the site on GitHub
If you edited locally, push everything (see Option B above). The repository already
contains the website files, a `CNAME` file (the domain) and a `.nojekyll` file.

### Step 2 — Turn on GitHub Pages
1. Open **https://github.com/kohutekj62/SL-ON** → **Settings** (top menu) → **Pages** (left menu).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to **`master`** and the folder to **`/ (root)`**, then **Save**.
4. After a minute the site is live at the temporary address **https://kohutekj62.github.io/SL-ON/**.
   (Open it to check everything works before pointing your domain at it.)

### Step 3 — Connect the domain `www.staryliskovec-on.cz`
1. **In GitHub:** Settings → Pages → **Custom domain**, type `www.staryliskovec-on.cz`, **Save**.
   (This is also already stored in the `CNAME` file in the repo.)
2. **At your domain registrar** (wherever you bought `staryliskovec-on.cz`), open the
   **DNS settings** and add these records:

   | Type | Name / Host | Value | Note |
   |---|---|---|---|
   | `CNAME` | `www` | `kohutekj62.github.io` | the main address |
   | `A` | `@` | `185.199.108.153` | apex → GitHub |
   | `A` | `@` | `185.199.109.153` | apex → GitHub |
   | `A` | `@` | `185.199.110.153` | apex → GitHub |
   | `A` | `@` | `185.199.111.153` | apex → GitHub |

   *(`@` means the bare domain `staryliskovec-on.cz`. The four `A` records make it
   redirect to the `www` version. Some registrars write `www` as `www.staryliskovec-on.cz.`
   — both are fine.)*

3. **Wait.** DNS changes can take from a few minutes up to 24 hours.
4. Back in GitHub Pages, once it says the domain is verified, tick **Enforce HTTPS**
   (this gives you the padlock 🔒 and a free certificate). If the option is greyed out,
   wait a bit longer for DNS, then refresh.

That's it — `https://www.staryliskovec-on.cz` now shows your site.

---

## 9. Troubleshooting

| Problem | Most likely fix |
|---|---|
| The page is blank or text shows as `undefined` | A comma `,` or quote `"` is missing in `js/content.js`. Run `npm test` — it points to it. Or undo your last edit. |
| Fonts look plain | The Google Fonts didn't load — check the internet connection / try again. |
| A photo doesn't appear | The `photo:` file name in `content.js` doesn't exactly match the file in `assets/people/` (watch capital letters and spaces). |
| The contact form opens an e-mail app instead of sending | That's the fallback. Set `formspreeId` in `content.js` (section 4) to send real e-mails. |
| Custom domain shows a 404 | DNS not finished yet, or the `CNAME` file got removed. Wait, and re-check Step 3. |
| GitHub shows a red ✗ on my commit | Click it → read which test failed → fix and commit again. The live site keeps the last good version meanwhile. |

---

## 10. Under the hood (for a developer who joins later)

- **No framework, no build.** Plain semantic HTML + CSS custom properties + vanilla JS,
  loaded as classic `<script>` tags (works over `file://` too).
- **Single source of content:** `js/content.js` (`window.CONTENT`). `i18n.js` handles
  language (`window.I18N`), `render.js` builds the DOM (`window.RENDER`), `main.js` wires
  interactions. Scripts must load in that order (see the bottom of `index.html`).
- **Accessibility:** semantic landmarks, skip link, keyboard-operable flip-cards
  (`<button aria-pressed>`), `prefers-reduced-motion` support, focus-visible styles.
  Enforced by `tests/a11y.spec.js` (axe, WCAG 2 A/AA, serious+critical = fail).
- **Tests:** Playwright (`tests/e2e.spec.js`) on Desktop Chrome + Pixel 5; Lighthouse via
  `lighthouserc.json`. CI in `.github/workflows/ci.yml` runs both on every push/PR.
- **Hosting:** GitHub Pages, branch `master`, root. `CNAME` + `.nojekyll` included.
  Asset paths are **relative** so it works both at the `github.io/SL-ON/` URL and the
  custom domain.

---

Made with 💚💛💜 for Starý Lískovec.
