import type { Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage.js';
import { CheckoutOverviewPage } from './CheckoutOverviewPage.js';

export class CheckoutInformationPage extends BasePage {
    readonly firstNameInput;
    readonly lastNameInput;
    readonly postalCodeInput;
    readonly continueButton;
    readonly cancelButton;
    readonly errorMessage;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = this.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = this.getByRole('textbox', { name: 'Last Name' });
        this.postalCodeInput = this.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = this.getByRole('button', { name: 'Continue' });
        this.cancelButton = this.getByRole('button', { name: /Cancel/ });
        this.errorMessage = this.getByRole('heading', { level: 3 });
    }

    async goto(): Promise<void> {
        await this.gotoPath('/checkout-step-one.html');
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continue(): Promise<CheckoutOverviewPage> {
        await this.click(this.continueButton);
        return new CheckoutOverviewPage(this.page);
    }

    async submitEmpty(): Promise<void> {
        await this.click(this.continueButton);
    }
}