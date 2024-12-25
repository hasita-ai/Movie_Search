const { test, expect } = require("@playwright/test");

test.describe("Movies Site", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/index.html"); // Navigate to the static website's URL
  });

  test("Validate page title", async ({ page }) => {
    // Check the title of the webpage
    await expect(page).toHaveTitle("Movies Site");
  });

  test("Check if search bar is visible", async ({ page }) => {
    // Verify the search input is present and visible
    const searchInput = page.locator("input#query");
    await expect(searchInput).toBeVisible();
  });

  test("Perform a movie search", async ({ page }) => {
    const searchInput = page.locator("input#query");
    const form = page.locator("form#form");
    const movieCards = page.locator(".card");

    // Enter a search term
    await searchInput.fill("Inception");

    // Submit the form
    await form.evaluate((form) => form.submit());

    // Wait for results to load
    await page.waitForSelector(".card");

    // Verify that at least one result is shown
    const count = await movieCards.count();
    expect(count).toBeGreaterThan(0);

    // Log the title of the first movie
    const firstMovieTitle = await movieCards
      .nth(0)
      .locator("#title")
      .textContent();
    console.log("First Movie Title:", firstMovieTitle);
  });

  test("Validate movie cards", async ({ page }) => {
    const movieCards = page.locator(".card");
    const movieTitles = page.locator("h3#title");
    const movieThumbnails = page.locator("img.thumbnail");

    // Wait for the movie cards to load
    await page.waitForSelector(".card");

    // Check that movie cards have valid thumbnails and titles
    const count = await movieCards.count();
    for (let i = 0; i < count; i++) {
      const title = await movieTitles.nth(i).textContent();
      const thumbnailSrc = await movieThumbnails.nth(i).getAttribute("src");

      expect(title).not.toBe("");
      expect(thumbnailSrc).toContain("https://image.tmdb.org/t/p/w1280");
    }
  });
});
