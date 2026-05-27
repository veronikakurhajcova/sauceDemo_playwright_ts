import {Page, Locator} from '@playwright/test'
export class InventoryItemPage {

    readonly inventoryItemName: Locator;
    readonly inventoryItemPrice: Locator;
    readonly inventoryAddToCartBtn: Locator;

    constructor(private readonly page: Page) {
        
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
        this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.inventoryAddToCartBtn = page.locator('[data-test="add-to-cart"]');
    }

    productName(itemName:string):Locator{
        return this.inventoryItemName.filter({hasText:itemName});
    }

    productPrice(itemPrice:string):Locator {
        return this.inventoryItemPrice.filter({hasText:itemPrice});
    }
}