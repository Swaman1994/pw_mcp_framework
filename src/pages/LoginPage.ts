import type { Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage.js';
import { InventoryPage } from './InventoryPage.js';

export class LoginPage extends BasePage {
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly errorMessage;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.getByRole('textbox', { name: 'Username' });
        this.passwordInput = this.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.getByRole('button', { name: 'Login' });
        this.errorMessage = this.getByRole('heading', { level: 3 });
    }

    async goto(): Promise<void> {
        await this.gotoPath('/');
    }

    async loginAs(username: string, password: string): Promise<InventoryPage> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.click(this.loginButton);
        return new InventoryPage(this.page);
    }

    async submitEmptyLogin(): Promise<void> {
        await this.click(this.loginButton);
    }
}