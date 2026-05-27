import { test, expect } from '../fixtures/fixtures';
import { MESSAGES, CUSTOMER } from '../helpers/credentials';

test.describe('Checkout Suite', () => {
    
    test('[NEG] - Checkout with empty first name - should display error message and remain on checkout page', { tag: '@regression' }, async ({ onCheckoutPage, checkoutPage }) => {
        await checkoutPage.fillCheckoutInformation('', CUSTOMER.lastName, CUSTOMER.postalCode);
        await expect(checkoutPage.errorMsg).toBeVisible();
        await expect(checkoutPage.errorMsg).toContainText(MESSAGES.firstNameRequiredMsg);
    })

    test('[NEG] - Checkout with empty last name - should display error message and remain in checkout page', { tag: '@regression' }, async ({ onCheckoutPage, checkoutPage }) => {
        await checkoutPage.fillCheckoutInformation(CUSTOMER.firstName, '', CUSTOMER.postalCode);
        await expect(checkoutPage.errorMsg).toBeVisible();
        await expect(checkoutPage.errorMsg).toContainText(MESSAGES.lastNameRequiredMsg);
    })

    test('[NEG] - Checkout with empty postal code - should display error message and remain in checkout page', { tag: '@regression' }, async ({ onCheckoutPage, checkoutPage }) => {
        await checkoutPage.fillCheckoutInformation(CUSTOMER.firstName, CUSTOMER.lastName, '');
        await expect(checkoutPage.errorMsg).toBeVisible();
        await expect(checkoutPage.errorMsg).toContainText(MESSAGES.postalCodeRequiredMsg);
    })
})