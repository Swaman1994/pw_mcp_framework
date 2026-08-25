import type { Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage.js';
import { CheckoutCompletePage } from './CheckoutCompletePage.js';

export class CheckoutOverviewPage extends BasePage {
    readonly overviewHeading;
    readonly itemTotal;
    readonly tax;
    readonly total;
    readonly finishButton;
    readonly cancelButton;

    constructor(page: Page) {
        super(page);
        this.overviewHeading = this.getByText('Checkout: Overview', { exact: true });
        this.itemTotal = this.getByText(/Item total:/);
        this.tax = this.getByText(/Tax:/);
        this.total = this.getByText(/Total:/);
        this.finishButton = this.getByRole('button', { name: 'Finish' });
        this.cancelButton = this.getByRole('button', { name: /Cancel/ });
    }

    async goto(): Promise<void> {
        await this.gotoPath('/checkout-step-two.html');
    }

    async finish(): Promise<CheckoutCompletePage> {
        await this.click(this.finishButton);
        return new CheckoutCompletePage(this.page);
    }
}