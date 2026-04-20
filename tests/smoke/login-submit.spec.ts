import { test, expect } from '../../fixtures';
import { getTestCredentials } from '../../helpers/auth';

test.describe('Login submit @smoke', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.expectLoaded();
    });

    test('submitting with real credentials signs in successfully', async ({ page, loginPage }) => {
        const { email, password } = getTestCredentials();

        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.submit();

        // We expect to leave the auth flow.
        await expect(page).not.toHaveURL(/signup|auth/i, { timeout: 15000 });

        // We also expect to see something from the next screen.
        await expect(
            page.getByRole('button', { name: 'Devam Et' })
        ).toBeVisible({ timeout: 15000 });
    });
});