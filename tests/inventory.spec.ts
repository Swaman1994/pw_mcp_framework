import type { Page } from '@playwright/test';
import { test, expect, attachStepScreenshot } from '../src/fixtures/base.js';
import { InventoryPage } from '../src/pages/InventoryPage.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import data from '../src/data/data.js';

async function loggedInInventory(page: Page): Promise<InventoryPage> {
    const login = new LoginPage(page);
    await login.goto();
    return login.loginAs(data.users.standard.username, data.users.standard.password);
}

test.describe('SauceDemo inventory', () => {
    test('displays products and sorts by name and price @smoke @regression', async ({ page }, testInfo) => {
        const inventory = await test.step('Log in and verify the product list', async () => {
            const loggedIn = await loggedInInventory(page);
            await attachStepScreenshot(page, testInfo, 'Log in and verify the product list');
            return loggedIn;
        });
        await test.step('Sort products by name descending', async () => {
            await expect(inventory.productsHeading).toBeVisible();
            await expect(inventory.productImages).toHaveCount(6);
            await inventory.sortBy(data.sortOptions.nameDescending);
            await expect(inventory.sortSelect).toHaveValue(data.sortOptions.nameDescending);
            await attachStepScreenshot(page, testInfo, 'Sort products by name descending');
        });
        await test.step('Sort products by price ascending and descending', async () => {
            await inventory.sortBy(data.sortOptions.priceAscending);
            await expect(inventory.sortSelect).toHaveValue(data.sortOptions.priceAscending);
            await inventory.sortBy(data.sortOptions.priceDescending);
            await expect(inventory.sortSelect).toHaveValue(data.sortOptions.priceDescending);
            await attachStepScreenshot(page, testInfo, 'Sort products by price ascending and descending');
        });
    });

    test('adds two products and removes the first product @smoke @critical', async ({ page }, testInfo) => {
        const inventory = await test.step('Log in to the inventory', async () => {
            const loggedIn = await loggedInInventory(page);
            await attachStepScreenshot(page, testInfo, 'Log in to the inventory');
            return loggedIn;
        });
        await test.step('Add two products and verify the cart count', async () => {
            await inventory.addFirstProduct();
            await expect(inventory.cartBadge).toHaveText('1');
            await inventory.addSecondProduct();
            await expect(inventory.cartBadge).toHaveText('2');
            await attachStepScreenshot(page, testInfo, 'Add two products and verify the cart count');
        });
        await test.step('Remove the first product and verify the cart count', async () => {
            await inventory.removeFirstProduct();
            await expect(inventory.cartBadge).toHaveText('1');
            await attachStepScreenshot(page, testInfo, 'Remove the first product and verify the cart count');
        });
    });

    test('opens the navigation menu and exposes its actions @smoke', async ({ page }, testInfo) => {
        const inventory = await test.step('Log in and open the navigation menu', async () => {
            const loggedIn = await loggedInInventory(page);
            await loggedIn.menu.open();
            await attachStepScreenshot(page, testInfo, 'Log in and open the navigation menu');
            return loggedIn;
        });
        await test.step('Verify the navigation menu actions', async () => {
            await expect(inventory.menu.allItemsLink).toBeVisible();
            await expect(inventory.menu.aboutLink).toBeVisible();
            await expect(inventory.menu.logoutLink).toBeVisible();
            await expect(inventory.menu.resetAppStateLink).toBeVisible();
            await attachStepScreenshot(page, testInfo, 'Verify the navigation menu actions');
        });
    });
});