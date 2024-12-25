const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests", // Directory where your tests are located
  timeout: 30000, // Timeout for each test in milliseconds
  retries: 1, // Number of retries for failed tests
  use: {
    headless: true, // Run tests in headless mode
    baseURL: "http://127.0.0.1:5500/index.html", // Replace with your application URL
    screenshot: "only-on-failure", // Capture screenshots on failure
    video: "retain-on-failure", // Record video only on failure
  },
  projects: [
    {
      name: "Chromium", // Test on Chromium
      use: { browserName: "chromium" },
    },
    {
      name: "Firefox", // Test on Firefox
      use: { browserName: "firefox" },
    },
    {
      name: "WebKit", // Test on WebKit (Safari engine)
      use: { browserName: "webkit" },
    },
  ],
  reporter: [["list"], ["html", { outputFolder: "playwright-report" }]], // Use list and HTML reporters
});
