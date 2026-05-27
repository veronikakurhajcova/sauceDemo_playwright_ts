import {test  as base} from  '@playwright/test';
import { LoginPage} from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MenuPage } from '../pages/MenuPage';
import { USERS, PRODUCTS } from '../helpers/credentials';
import { CartPage } from '../pages/CartPage';

type myFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    menuPage: MenuPage;
    checkoutPage: CheckoutPage;
    loggedInPage: void;
    onCheckoutPage: void;
}

export const test = base.extend<myFixtures>({
    loginPage: async ({page}, use )=> {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    
    menuPage: async ({page}, use) => {
        const menuPage = new MenuPage(page);
        await use(menuPage);
    },

    checkoutPage: async({page}, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    loggedInPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(USERS.standard.username, USERS.standard.password);
        await use();
    },

    onCheckoutPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const menuPage = new MenuPage(page);
        const cartPage = new CartPage(page);

        await loginPage.navigate();
        await loginPage.login(USERS.standard.username, USERS.standard.password);
        await inventoryPage.addItemToCart(PRODUCTS.backpack.itemName);
        await menuPage.clickShoppingCart();
        await cartPage.proceedToCheckout();
        await use();
    }
});

export {expect} from'@playwright/test';

