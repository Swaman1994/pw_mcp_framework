import type { Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage.js';
import { InventoryPage } from './InventoryPage.js';

export class CheckoutCompletePage extends BasePage {
    readonly completeHeading;
    readonly confirmationMessage;
    readonly confirmationImage;
    readonly backHomeButton;

    constructor(page: Page) {
        super(page);
        this.completeHeading = this.getByText('Checkout: Complete!', { exact: true });
        this.confirmationMessage = this.getByText('Thank you for your order!');
        this.confirmationImage = this.getByRole('img');
        this.backHomeButton = this.getByRole('button', { name: /Back Home/ });
    }

    async goto(): Promise<void> {
        await this.gotoPath('/checkout-complete.html');
    }

    async backHome(): Promise<InventoryPage> {
        await this.click(this.backHomeButton);
        return new InventoryPage(this.page);
    }
}