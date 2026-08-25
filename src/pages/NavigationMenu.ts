import type { Page } from '@playwright/test';
import { WebCommons } from '../common/common.js';

export class NavigationMenu extends WebCommons {
    readonly openMenuButton;
    readonly closeMenuButton;
    readonly allItemsLink;
    readonly aboutLink;
    readonly logoutLink;
    readonly resetAppStateLink;

    constructor(page: Page) {
        super(page);
        this.openMenuButton = this.getByRole('button', { name: 'Open Menu' });
        this.closeMenuButton = this.getByRole('button', { name: 'Close Menu' });
        this.allItemsLink = this.getByRole('link', { name: 'All Items' });
        this.aboutLink = this.getByRole('link', { name: 'About' });
        this.logoutLink = this.getByRole('link', { name: 'Logout' });
        this.resetAppStateLink = this.getByRole('link', { name: 'Reset App State' });
    }

    async open(): Promise<void> {
        await this.click(this.openMenuButton);
    }

    async close(): Promise<void> {
        await this.click(this.closeMenuButton);
    }

    async logout(): Promise<void> {
        await this.click(this.logoutLink);
    }

    async resetAppState(): Promise<void> {
        await this.click(this.resetAppStateLink);
    }
}