import { test, expect, attachStepScreenshot } from '../src/fixtures/base.js';

test.describe('Seed — environment baseline @smoke', () => {
  test('SauceDemo login page loads', async ({ page }, testInfo) => {
    await test.step('Open the SauceDemo login page', async () => {
      await page.goto('https://www.saucedemo.com');
      await attachStepScreenshot(page, testInfo, 'Open the SauceDemo login page');
    });
    await test.step('Verify the login fields are visible', async () => {
      await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Verify the login fields are visible');
    });
  });
});