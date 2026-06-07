# ✅ Manual test checklist (Starý Lískovec ON)

Use this list before publishing a change, or any time you want to be sure the
site is healthy. It takes about 5 minutes. You don't need any tools — just a
phone and a computer. (The automated tests in `npm test` cover most of this too.)

> Tip: tick the boxes by replacing `[ ]` with `[x]`.

## On a computer (e.g. Chrome on a laptop)

- [ ] The page loads and you see the **logo** and the big **STARÝ LÍSKOVEC ON** heading.
- [ ] The fonts look right (tall, bold headings). If they look plain, check your internet — the fonts load from Google.
- [ ] Each **menu item** (O nás, Program, Lidé, Setkejme se, Aktuality, Spojme se, Přátelé) scrolls you to the right section.
- [ ] In **Program**, clicking a point expands it; clicking again closes it.
- [ ] In **Lidé**, clicking the **elephant** shows the real photo; clicking again brings the elephant back. Each person works independently.
- [ ] **Setkejme se** shows the 10 events with dates.
- [ ] **Aktuality** shows the news cards.
- [ ] **Spojme se**: leaving the form empty and pressing *Odeslat* shows a red warning. Filling it in and pressing *Odeslat* shows a green confirmation.
- [ ] **Přátelé** shows the two party cards with working links.
- [ ] The **CZ / EN** switch (top right) changes ALL the text to English, and back. Reload the page — it remembers your choice.
- [ ] Scroll down — the **↑ back-to-top** button appears and works.

## On a phone (or make the browser window narrow)

- [ ] The **hamburger ☰ button** appears and opens the menu; tapping a link closes it.
- [ ] Text is readable without zooming; nothing overflows sideways.
- [ ] The candidate cards stack nicely and the elephant flip still works by tapping.
- [ ] The contact form is easy to fill with a thumb.

## Quick health checks

- [ ] No obvious typos in the text (all text lives in `js/content.js`).
- [ ] Every candidate photo shows the right person after flipping.
- [ ] All the `TODO…` placeholders in `js/content.js` have been replaced (e-mail, phone, social links). Search the file for `TODO`.
- [ ] Links open the correct pages.

## If something looks wrong

1. Run `npm test` — it will usually point to the exact problem.
2. Check `js/content.js` for a missing comma or quote mark (the most common cause).
3. See the **Troubleshooting** part of `README.md`.
