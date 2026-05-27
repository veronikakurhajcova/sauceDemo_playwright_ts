import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { URLS, USERS, SECURITY } from '../helpers/credentials';


test.describe('Security suite', () => {
    test('[SEC] - Access inventory without login', { tag: ['@security', '@regression'] }, async ({ page }) => {
        await page.goto(URLS.inventory_url);
        await expect(page).toHaveURL(URLS.base_url);
    })

    test('[SEC] - SQL injection in Login form - should not authenticate malicious input', { tag: '@security', }, async ({ page }) => {
        let loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(SECURITY.sqlInjection, SECURITY.sqlInjection);
        await expect(loginPage.errorLoginMsg).toBeVisible();
        await expect(page).toHaveURL(URLS.base_url);
    })

    test('[SEC] - Access non-existent path - should display 404 or redirect - KNOWN BUG', { tag: '@security' }, async ({ page }) => {
        test.fail();
        await page.goto(URLS.base_url + '/ftp');
        await expect(page.locator('#root')).not.toBeEmpty();
    })

    test('[SEC] - Session should expire after timeout', { tag: '@security' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(USERS.standard.username, USERS.standard.password);

        await page.context().clearCookies();
        await page.reload();

        await expect(page).toHaveURL(URLS.base_url);
    })
})
