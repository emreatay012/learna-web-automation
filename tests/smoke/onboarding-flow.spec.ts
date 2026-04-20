import { test, expect } from '../../fixtures';
import { getTestCredentials } from '../../helpers/auth';

test.describe('Onboarding flow @smoke', () => {
    test('user reaches first onboarding step after login', async ({ page, loginPage }) => {
        const { email, password } = getTestCredentials();

        await loginPage.goto();
        await loginPage.expectLoaded();

        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.submit();

        await page.waitForLoadState('networkidle');

        // 🔍 First onboarding validation
        await expect(page.getByText('Age:', { exact: false })).toBeVisible({ timeout: 15000 });
    });
});