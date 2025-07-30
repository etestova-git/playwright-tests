test("Saucedemo checkout overview loads after filling form", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Add first product to cart
  await page.click('button[data-test^="add-to-cart-"]');

  // Go to cart
  await page.click('.shopping_cart_link');

  // Checkout
  await page.click('[data-test="checkout"]');

  // Fill form
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');

  // Verify checkout overview page loads
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');
});
import { test, expect } from "@playwright/test";

test("Saucedemo Backpack price is $29.99", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Click on Sauce Labs Backpack
  await page.click('a[id="item_4_title_link"]');

  // Assert price is $29.99
  const price = await page.textContent('.inventory_details_price');
  expect(price).toBe('$29.99');
});
