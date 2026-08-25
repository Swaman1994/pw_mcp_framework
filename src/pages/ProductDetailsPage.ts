import type { Page } from '@playwright/test';
import { BasePage } from '../Base/BasePage.js';
import { InventoryPage } from './InventoryPage.js';

export class ProductDetailsPage extends BasePage {
    readonly productName;
    readonly productDescription;
    readonly productPrice;
    readonly productImage;
    readonly cartButton;
    readonly backToProductsButton;

    constructor(page: Page) {
        super(page);
        this.productName = this.getByText(/Sauce Labs|Test\.allTheThings\(\)/).first();
        this.productDescription = this.getByText(/with the|isn't the|testing superhero|midweight|infant onesie|classic Sauce Labs/).first();
        this.productPrice = this.getByText(/^\$\d+\.\d{2}$/);
        this.productImage = this.getByRole('img').last();
        this.cartButton = this.getByRole('button', { name: /Add to cart|Remove/ });
        this.backToProductsButton = this.getByRole('button', { name: /Back to products/ });
    }

    async goto(): Promise<void> {
        await this.gotoPath('/inventory-item.html?id=4');
    }

    async addToCart(): Promise<void> {
        await this.click(this.getByRole('button', { name: 'Add to cart' }));
    }

    async backToProducts(): Promise<InventoryPage> {
        await this.click(this.backToProductsButton);
        return new InventoryPage(this.page);
    }
}