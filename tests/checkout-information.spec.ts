import { test, expect } from '../src/fixtures/base.js';
import { CheckoutInformationPage } from '../src/pages/CheckoutInformationPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo checkout information', () => {
  test('validates required checkout fields @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    await inventory.addFirstProduct();
    const cart = await inventory.openCart();
    const checkout = await cart.checkout();
    await checkout.submitEmpty();

    await expect(checkout.errorMessage).toContainText('First Name is required');
    await expect(checkout.continueButton).toBeVisible();
  });

  test('continues with valid checkout information @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);
    await inventory.addFirstProduct();
    const checkout: CheckoutInformationPage = await (await inventory.openCart()).checkout();
    await checkout.fillInformation(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);
    const overview = await checkout.continue();

    await expect(overview.overviewHeading).toBeVisible();
  });
});