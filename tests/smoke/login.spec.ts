import { test, expect } from '../../fixtures';

test.describe('Login flow @smoke', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectLoaded();
  });

  test('login page renders all required fields', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('password field masks input', async ({ loginPage }) => {
    await loginPage.fillPassword('secret');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });
});