import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input#username');
        this.passwordInput = page.locator('input#password');
        this.signInButton = page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username: string = process.env.USERNAME!, password: string = process.env.PASSWORD!) {
        await this.goto();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.page.waitForURL('**/'); // Wait for navigation or stable state
    }
}
