import { Page, Locator } from '@playwright/test';
export class CheckoutPage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueBtn: Locator;
    readonly errorMsg: Locator;

    constructor(private readonly page: Page) {

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.errorMsg = page.locator('[data-test="error"]');
    }

    async fillCheckoutInformation(firstname: string, lastname: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await this.postalCodeInput.fill(postalCode);
        await this.continueBtn.click();
    }

    async clickContinue():Promise<void> {
        await this.continueBtn.click();
    }
}