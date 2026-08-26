import { test, expect } from '../src/fixtures/base.js';
import { CheckoutInformationPage } from '../src/pages/CheckoutInformationPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo checkout information', () => {
  test('validates required checkout fields @smoke @critical', async ({ page }) => {
    const checkout = await test.step('Open checkout with one product', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      return (await inventory.openCart()).checkout();
    });
    await test.step('Submit empty checkout information', async () => {
      await checkout.submitEmpty();
    });
    await test.step('Verify the required first name message', async () => {
      await expect(checkout.errorMessage).toContainText('First Name is required');
      await expect(checkout.continueButton).toBeVisible();
    });
  });

  test('continues with valid checkout information @smoke', async ({ page }) => {
    const checkout: CheckoutInformationPage = await test.step('Open checkout with one product', async () => {
      const login = new LoginPage(page);
      await login.goto();
      const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
      await inventory.addFirstProduct();
      return (await inventory.openCart()).checkout();
    });
    const overview = await test.step('Enter valid checkout information', async () => {
      await checkout.fillInformation(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);
      return checkout.continue();
    });
    await test.step('Verify the checkout overview loaded', async () => {
      await expect(overview.overviewHeading).toBeVisible();
    });
  });
});