import type { Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage.js';
import { CheckoutInformationPage } from './CheckoutInformationPage.js';
import { InventoryPage } from './InventoryPage.js';

export class CartPage extends BasePage {
    readonly cartHeading;
    readonly cartItems;
    readonly quantities;
    readonly removeButtons;
    readonly continueShoppingButton;
    readonly checkoutButton;

    constructor(page: Page) {
        super(page);
        this.cartHeading = this.getByText('Your Cart', { exact: true });
        this.cartItems = this.getByText(/Sauce Labs|Test\.allTheThings\(\)/);
        this.quantities = this.getByText(/^\d+$/).first();
        this.removeButtons = this.getByRole('button', { name: 'Remove' });
        this.continueShoppingButton = this.getByRole('button', { name: /Continue Shopping/ });
        this.checkoutButton = this.getByRole('button', { name: 'Checkout' });
    }

    async goto(): Promise<void> {
        await this.gotoPath('/cart.html');
    }

    async continueShopping(): Promise<InventoryPage> {
        await this.click(this.continueShoppingButton);
        return new InventoryPage(this.page);
    }

    async checkout(): Promise<CheckoutInformationPage> {
        await this.click(this.checkoutButton);
        return new CheckoutInformationPage(this.page);
    }

    async removeItem(): Promise<void> {
        await this.click(this.removeButtons.first());
    }
}