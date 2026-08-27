import { test, expect, attachStepScreenshot } from '../src/fixtures/base.js';
import { CheckoutInformationPage } from '../src/pages/CheckoutInformationPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo checkout information', () => {
  test('validates required checkout fields @smoke @critical', async ({ page }, testInfo) => {
    const checkout = await test.step('Open checkout with one product', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      const checkout = await (await inventory.openCart()).checkout();
      await attachStepScreenshot(page, testInfo, 'Open checkout with one product');
      return checkout;
    });
    await test.step('Submit empty checkout information', async () => {
      await checkout.submitEmpty();
      await attachStepScreenshot(page, testInfo, 'Submit empty checkout information');
    });
    await test.step('Verify the required first name message', async () => {
      await expect(checkout.errorMessage).toContainText('First Name is required');
      await expect(checkout.continueButton).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Verify the required first name message');
    });
  });

  test('continues with valid checkout information @smoke', async ({ page }, testInfo) => {
    const checkout: CheckoutInformationPage = await test.step('Open checkout with one product', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      const checkout = await (await inventory.openCart()).checkout();
      await attachStepScreenshot(page, testInfo, 'Open checkout with one product');
      return checkout;
    });
    const overview = await test.step('Enter valid checkout information', async () => {
      await checkout.fillInformation(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);
      const overview = await checkout.continue();
      await attachStepScreenshot(page, testInfo, 'Enter valid checkout information');
      return overview;
    });
    await test.step('Verify the checkout overview loaded', async () => {
      await expect(overview.overviewHeading).toBeVisible();
      await attachStepScreenshot(page, testInfo, 'Verify the checkout overview loaded');
    });
  });
});