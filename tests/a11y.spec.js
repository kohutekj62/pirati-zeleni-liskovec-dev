// ============================================================================
//  a11y.spec.js  —  accessibility check (a11y = "accessibility", 11 letters)
// ============================================================================
//  This uses "axe", the industry-standard accessibility scanner, to make sure
//  the site is usable by people with screen readers, keyboard-only users, etc.
//  It fails the build if there is any SERIOUS or CRITICAL problem.
// ============================================================================
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("Accessibility", () => {

  test("home page has no serious or critical accessibility violations (Czech)", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");

    // If this fails, the message lists exactly which rules and elements to fix.
    expect(
      blocking,
      "Accessibility problems:\n" + JSON.stringify(blocking.map((v) => ({ rule: v.id, impact: v.impact, help: v.help, elements: v.nodes.length })), null, 2)
    ).toEqual([]);
  });

  test("home page stays accessible after switching to English", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("#lang-toggle").click();        // switch to EN
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(
      blocking,
      "Accessibility problems (EN):\n" + JSON.stringify(blocking.map((v) => ({ rule: v.id, impact: v.impact, help: v.help })), null, 2)
    ).toEqual([]);
  });
});
