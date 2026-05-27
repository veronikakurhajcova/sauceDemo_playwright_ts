import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { USERS, MESSAGES, URLS } from '../helpers/credentials';

test.describe('Auth Suite', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    })

    test('[HP] - Login with valid credentials - should redirect to inventory page', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
        await loginPage.login(USERS.standard.username, USERS.standard.password);
        await expect(page).toHaveURL(URLS.inventory_url);
    })

    test('[HP] - Logout - should redirect to login page', { tag: '@regression', }, async ({ page }) => {
        await loginPage.login(USERS.standard.username, USERS.standard.password);
        const menuPage = new MenuPage(page);
        await menuPage.logout();
        await expect(page).toHaveURL(URLS.base_url);
    })

    test('[NEG] - Login with invalid username - should display error message and remain on login page', { tag: '@regression', }, async ({ page }) => {
        await loginPage.login(USERS.invalid.username, USERS.standard.password);
        await expect(loginPage.errorLoginMsg).toBeVisible();
        await expect(loginPage.errorLoginMsg).toContainText(MESSAGES.invalidCredentials);
        await expect(page).toHaveURL(URLS.base_url);
    })

    test('[NEG] - Login with invalid password - should display error message and remain on login page', { tag: '@regression', }, async ({ page }) => {
        await loginPage.login(USERS.standard.username, USERS.invalid.password);
        await expect(loginPage.errorLoginMsg).toBeVisible();
        await expect(loginPage.errorLoginMsg).toContainText(MESSAGES.invalidCredentials);
        await expect(page).toHaveURL(URLS.base_url);
    })

    test('[NEG] - Login with empty username - should display error message and remain on login page', { tag: '@regression', }, async ({ page }) => {
        await loginPage.login('', USERS.standard.password);
        await expect(loginPage.errorLoginMsg).toBeVisible();
        await expect(loginPage.errorLoginMsg).toContainText(MESSAGES.usernameRequired);
        await expect(page).toHaveURL(URLS.base_url);
    })

    test('[NEG] - Login with empty password - should display error message and remain on login page', { tag: '@regression', }, async ({ page }) => {
        await loginPage.login(USERS.standard.username, '');
        await expect(loginPage.errorLoginMsg).toBeVisible();
        await expect(loginPage.errorLoginMsg).toContainText(MESSAGES.passwordRequired);
        await expect(page).toHaveURL(URLS.base_url);
    })

    test('[NEG] - Login with empty credentials - should display error message and remain on login page', { tag: '@regression', }, async ({ page }) => {
        await loginPage.login('', '')
        await expect(loginPage.errorLoginMsg).toBeVisible();
        await expect(loginPage.errorLoginMsg).toContainText(MESSAGES.usernameRequired);
        await expect(page).toHaveURL(URLS.base_url);
    })

    test('[NEG] - Login as Locked out user - should display error message and remain on login page', { tag: '@regression', }, async ({ page }) => {
        await loginPage.login(USERS.locked.username, USERS.locked.password)
        await expect(loginPage.errorLoginMsg).toBeVisible();
        await expect(loginPage.errorLoginMsg).toContainText(MESSAGES.lockedOut);
        await expect(page).toHaveURL(URLS.base_url);
    })
})