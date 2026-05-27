import { Page, Locator} from '@playwright/test';

export class LoginPage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly errorLoginMsg: Locator;

    constructor(private readonly page: Page) {

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', {name: 'Login'});
        this.errorLoginMsg = page.locator('[data-test="error"]');
    }

    async navigate():Promise<void> {
        await this.page.goto('/');
    }

    async login(username: string, password:string):Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}