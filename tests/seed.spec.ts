import { test, expect } from '../src/fixtures/base.js';

test.describe('Seed — environment baseline @smoke', () => {
  test('SauceDemo login page loads', async ({ page }) => {
    await test.step('Open the SauceDemo login page', async () => {
      await page.goto('https://www.saucedemo.com');
    });
    await test.step('Verify the login fields are visible', async () => {
      await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    });
  });
});