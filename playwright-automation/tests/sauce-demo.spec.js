// tests/sauce-demo.spec.js
const { test, expect } = require('@playwright/test');

test('SauceDemo - Add to cart and complete checkout', async ({ page }) => {

  // 1. Go to SauceDemo login page
  await page.goto('https://www.saucedemo.com/');

  // 2. Login using given credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 3. Verify we are redirected to inventory page
  await expect(page).toHaveURL(/inventory/);

  // 4. Add Backpack to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // 5. Check that cart badge shows "1"
  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toHaveText('1');

  // 6. Go to cart
  await page.click('.shopping_cart_link');

  // Verify item exists in cart
  await expect(page.locator('.cart_item')).toHaveCount(1);

  // 7. Click checkout
  await page.click('[data-test="checkout"]');

  // 8. Enter checkout information
  await page.fill('[data-test="firstName"]', 'Mark');
  await page.fill('[data-test="lastName"]', 'Alde');
  await page.fill('[data-test="postalCode"]', '6500');

  // 9. Continue
  await page.click('[data-test="continue"]');

  // 10. Click finish
  await page.click('[data-test="finish"]');

  // 11. Validate thank-you message
  const thankYou = page.locator('.complete-header');
  await expect(thankYou).toHaveText('Thank you for your order');
});
