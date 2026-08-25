import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage.js';
import { CartPage } from './CartPage.js';
import { NavigationMenu } from './NavigationMenu.js';
import { ProductDetailsPage } from './ProductDetailsPage.js';

export class InventoryPage extends BasePage {
    readonly productsHeading;
    readonly productLinks;
    readonly productImages;
    readonly addToCartButtons;
    readonly sortSelect;
    readonly cartLink;
    readonly cartBadge;
    readonly menu;

    constructor(page: Page) {
        super(page);
        this.productsHeading = this.getByText('Products', { exact: true });
        this.productLinks = this.getByRole('link', { name: /Sauce Labs|Test\.allTheThings\(\)/ });
        this.productImages = this.getByRole('img', { name: /Sauce Labs|Test\.allTheThings\(\)/ });
        this.addToCartButtons = this.getByRole('button', { name: 'Add to cart' });
        this.sortSelect = this.getByRole('combobox');
        this.cartLink = this.page.locator('.shopping_cart_link');
        this.cartBadge = this.page.locator('.shopping_cart_badge');
        this.menu = new NavigationMenu(page);
    }

    async goto(): Promise<void> {
        await this.gotoPath('/inventory.html');
    }

    async openProduct(name: string): Promise<ProductDetailsPage> {
        await this.click(this.getByRole('link', { name, exact: true }).first());
        return new ProductDetailsPage(this.page);
    }

    async sortBy(value: string): Promise<void> {
        await this.select(this.sortSelect, value);
    }

    async addFirstProduct(): Promise<void> {
        await this.click(this.addToCartButtons.first());
    }

    async addSecondProduct(): Promise<void> {
        await this.click(this.addToCartButtons.last());
    }

    async removeFirstProduct(): Promise<void> {
        await this.click(this.getByRole('button', { name: 'Remove' }).first());
    }

    async openCart(): Promise<CartPage> {
        await this.click(this.cartLink);
        return new CartPage(this.page);
    }
}