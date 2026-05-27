import {Page, Locator} from '@playwright/test';

export class MenuPage {

    readonly openMenuBtn: Locator;
    readonly logoutSideBarLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(private readonly page: Page) {

        this.openMenuBtn = page.getByRole('button', {name:'Open Menu'});
        this.logoutSideBarLink = page.locator('[data-test="logout-sidebar-link"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async logout(): Promise<void> {
        await this.openMenuBtn.click();
        await this.logoutSideBarLink.click();
    }

    async clickShoppingCart():Promise<void> {
        await this.shoppingCartLink.click();
    }
}