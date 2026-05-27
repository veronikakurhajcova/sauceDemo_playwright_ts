import {Page, Locator } from '@playwright/test';

export class CartPage {

    readonly checkoutBtn: Locator;

    constructor(private readonly page: Page) {
        
        this.checkoutBtn = page.locator('[data-test="checkout"]');
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutBtn.click();
    }
}