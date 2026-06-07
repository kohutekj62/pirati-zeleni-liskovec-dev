// ============================================================================
//  playwright.config.js  —  settings for the automated browser tests
// ============================================================================
//  Playwright opens a real browser, loads the site and checks it behaves.
//  We test on a desktop browser AND an emulated phone (Pixel 5), because the
//  site must work well on both.
//
//  You don't run this file directly — it just configures `npm test`.
// ============================================================================
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60000,                     // generous, so a cold first browser launch on Windows is fine
  expect: { timeout: 10000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 1,    // one retry locally: shrugs off slow first-launch hiccups
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "http://127.0.0.1:4173",
    navigationTimeout: 45000,         // first navigation can be slow while the server warms up
    actionTimeout: 15000,
    trace: "on-first-retry",
  },

  // Start a tiny local web server that serves the site while the tests run.
  webServer: {
    command: "npx http-server . -p 4173 -c-1 --silent",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // Run every test twice: once on desktop, once on a phone.
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile",  use: { ...devices["Pixel 5"] } },
  ],
});
