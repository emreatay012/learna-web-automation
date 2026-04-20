import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get continueWithEmailButton() {
    return this.page.getByRole('button', { name: 'Continue with e-mail' });
  }

  get emailInput() {
    return this.page.locator('input[type="email"]');
  }

  get passwordInput() {
    return this.page.locator('input[type="password"]');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }
  get signInLink() {
    return this.page.getByRole('link', { name: 'Sign In' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://ailearna.com');

    // Accept cookies
    const acceptBtn = this.page.getByRole('button', { name: 'Accept All' });
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click({ force: true });
    }

    // Enter flow
    await this.page.getByRole('button', { name: 'Try Learna for Free' }).click();
    await this.page.getByRole('button', { name: 'Continue with e-mail' }).click();

    // Wait for signup page to load
    await this.page.waitForSelector('text=Create a new account');

    // Click Sign In
    await this.signInLink.click();

    // Wait for login form
    await this.page.waitForSelector('input[type="email"]');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible({ timeout: 15000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 15000 });
    await expect(this.loginButton).toBeVisible({ timeout: 15000 });
  }


}