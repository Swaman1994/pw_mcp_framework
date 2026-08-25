import { test, expect } from '../src/fixtures/base.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

test.describe('SauceDemo login', () => {
  test('logs in with a valid standard user @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    const inventory = await login.loginAs(data.users.standard.username, data.users.standard.password);

    await expect(inventory.productsHeading).toBeVisible();
    await expect(inventory.productImages).toHaveCount(6);
  });

  test('rejects invalid credentials @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAs('invalid_user', 'invalid_password');

    await expect(login.errorMessage).toContainText('Username and password do not match');
    await expect(login.loginButton).toBeVisible();
  });

  test('shows the locked-out user message @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAs(data.users.lockedOut.username, data.users.lockedOut.password);

    await expect(login.errorMessage).toContainText('locked out');
    await expect(login.loginButton).toBeVisible();
  });
});