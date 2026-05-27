import { test, expect } from '../fixtures/fixtures';
import { PRODUCTS } from '../helpers/credentials';

test.describe('Cart Suite', () => {

    test('[HP] - Add one product to Cart - should update cart badge and change button to Remove', { tag: ['@regression', '@smoke'] }, async ({ inventoryPage, menuPage, loggedInPage }) => {
        await expect(inventoryPage.addToCartBtn(PRODUCTS.backpack.itemName)).toHaveText('Add to cart');
        await inventoryPage.addItemToCart(PRODUCTS.backpack.itemName);
        await expect(menuPage.shoppingCartBadge).toBeVisible();
        await expect(menuPage.shoppingCartBadge).toHaveText('1');
        await expect(inventoryPage.removeFromCartBtn(PRODUCTS.backpack.itemName)).toHaveText('Remove');
    })

    test('[HP] - Remove Product from cart - should update cart badge and empty cart', { tag: '@regression',}, async ({ inventoryPage, menuPage, loggedInPage }) => {
        await inventoryPage.addItemToCart(PRODUCTS.backpack.itemName);
        await inventoryPage.removeItemFromCart(PRODUCTS.backpack.itemName);
        await expect(menuPage.shoppingCartBadge).not.toBeVisible();
        await expect(inventoryPage.addToCartBtn(PRODUCTS.backpack.itemName)).toHaveText('Add to cart');
    })
        
})