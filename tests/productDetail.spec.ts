import { test, expect } from '../fixtures/fixtures';
import { InventoryItemPage } from '../pages/InventoryItemPage';
import { PRODUCTS } from '../helpers/credentials';

test.describe('Product details suite', () => {

    test('[HP] - Check product details - should display correct product information', { tag: '@regression', }, async ({ loggedInPage, inventoryPage, page }) => {
        let inventoryItemPage = new InventoryItemPage(page);

        await inventoryPage.clickProductName(PRODUCTS.backpack.displayName);

        await expect(page).toHaveURL(/inventory-item\.html/);
        await expect(inventoryItemPage.inventoryItemName).toBeVisible();
        await expect(inventoryItemPage.inventoryItemName).toContainText(PRODUCTS.backpack.displayName);
        await expect(inventoryItemPage.inventoryItemPrice).toBeVisible();
        await expect(inventoryItemPage.inventoryItemPrice).toContainText(PRODUCTS.backpack.price);
        await expect(inventoryItemPage.inventoryAddToCartBtn).toBeVisible();
        await expect(inventoryItemPage.inventoryAddToCartBtn).toBeEnabled();
    })
})
