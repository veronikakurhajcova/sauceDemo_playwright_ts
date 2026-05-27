import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { MenuPage } from '../pages/MenuPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverview } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { USERS, PRODUCTS, CUSTOMER, MESSAGES, URLS } from '../helpers/credentials';

test.describe('Complete purchase flow suite', () => {

    test('[E2E] - Complete purchase flow', { tag: ['@e2e', '@regression','@smoke'] }, async ({ page }) => {
        let loginPage = new LoginPage(page);
        let inventoryPage = new InventoryPage(page);
        let menuPage = new MenuPage(page);
        let cartPage = new CartPage(page);
        let checkoutPage = new CheckoutPage(page);
        let checkoutOverview = new CheckoutOverview(page);
        let checkoutCompletePage = new CheckoutCompletePage(page);

        await test.step('Navigate to Login Page', async () => {
            await loginPage.navigate();
            await expect(page).toHaveURL(URLS.base_url);
        })

        await test.step('Login with valid Credentials', async () => {
            await loginPage.login(USERS.standard.username, USERS.standard.password);
            await expect(page).toHaveURL(URLS.inventory_url)
        })

        await test.step('Add product to Cart', async () => {
            await inventoryPage.addItemToCart(PRODUCTS.backpack.itemName);
            await menuPage.clickShoppingCart();
            await expect(page).toHaveURL(URLS.cart_url);
        })

        await test.step('Proceed to Checkout', async () => {
            await cartPage.proceedToCheckout();
            await expect(page).toHaveURL(URLS.checkout_url)
            await checkoutPage.fillCheckoutInformation(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
        })

        await test.step('Checkout overview', async () => {
            await expect(page).toHaveURL(URLS.checkout_overview_url);
            await expect(checkoutOverview.inventoryItemsDescription).toBeVisible();
            await expect(checkoutOverview.inventoryItemName).toBeVisible();
            await expect(checkoutOverview.inventoryItemName).toHaveText(PRODUCTS.backpack.displayName);
            await expect(checkoutOverview.inventoryItemPrice).toBeVisible();
            await expect(checkoutOverview.inventoryItemPrice).toHaveText(PRODUCTS.backpack.price);
            await expect(checkoutOverview.paymentInfoValue).toBeVisible();
            await expect(checkoutOverview.shippingInfoValue).toBeVisible();
            await expect(checkoutOverview.subtotalLabel).toContainText(PRODUCTS.backpack.price);
            await expect(checkoutOverview.totalPriceLabel).toBeVisible();
            await checkoutOverview.proceedToFinish();
        })

        await test.step('Complete order', async () => {
            await expect(page).toHaveURL(URLS.order_complete_url);
            await expect(checkoutCompletePage.completeHeader).toHaveText(MESSAGES.completeOrder);
            await expect(menuPage.shoppingCartBadge).not.toBeVisible();
        })
    })
})