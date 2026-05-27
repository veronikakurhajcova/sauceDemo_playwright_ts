import {Page, Locator} from '@playwright/test';

export class InventoryPage {

    readonly filterBtn: Locator;
    readonly inventoryItemPrice: Locator;
    readonly inventoryItemName: Locator;

    constructor(private readonly page: Page) {
        
        this.filterBtn = page.locator('[data-test="product-sort-container"]');
        this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]'); //  NOTE: same selector used in InventoryItemPage - update both if changed
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    }

    async addItemToCart(itemName: string):Promise<void> {
        await this.page.locator(`[data-test="add-to-cart-sauce-labs-${itemName}"]`).click();
    }

    addToCartBtn(itemName: string):Locator {
       return this.page.locator(`[data-test="add-to-cart-sauce-labs-${itemName}"]`);
    }

    async removeItemFromCart(itemName: string):Promise<void> {
        await this.page.locator(`[data-test="remove-sauce-labs-${itemName}"]`).click();
    }

    removeFromCartBtn(itemName: string):Locator {
        return this.page.locator(`[data-test="remove-sauce-labs-${itemName}"]`);
    }

    async clickProductName(productName: string):Promise<void> {
        await this.page.locator('[data-test="inventory-item-name"]')
            .filter({hasText: productName})
            .click();
    }

    async filterBy(option:string):Promise<void> {
        await this.filterBtn.selectOption(option);
    }

    async getPrices():Promise<string[]> {
        return await this.inventoryItemPrice.allTextContents();
    }

    async getNames():Promise<string[]> {
        return await this.inventoryItemName.allTextContents();
}
}