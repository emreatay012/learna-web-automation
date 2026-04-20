import { test, expect } from '../../fixtures';
import { getTestCredentials } from '../../helpers/auth';
import { loginViaUi } from '../../helpers/auth';

test.describe('Paywall visibility @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUi(page, getTestCredentials());
  });

  test('paywall modal appears when accessing a premium feature', async ({
    page,
    paywallPage,
  }) => {
    // Navigate to a route that is gated behind the paywall
    await page.goto('/premium-feature');
    await paywallPage.expectVisible();
  });

  test('paywall contains a title', async ({ page, paywallPage }) => {
    await page.goto('/premium-feature');
    await expect(paywallPage.title).toBeVisible();
  });

  test('paywall contains an upgrade call-to-action button', async ({
    page,
    paywallPage,
  }) => {
    await page.goto('/premium-feature');
    await expect(paywallPage.upgradeButton).toBeVisible();
    await expect(paywallPage.upgradeButton).toBeEnabled();
  });

  test('paywall shows pricing section with at least one plan', async ({
    page,
    paywallPage,
  }) => {
    await page.goto('/premium-feature');
    await paywallPage.expectPricingVisible();
    // At least one plan card must be rendered
    await expect(paywallPage.planCards).not.toHaveCount(0);
  });

  test('paywall can be dismissed', async ({ page, paywallPage }) => {
    await page.goto('/premium-feature');
    await paywallPage.expectVisible();
    await paywallPage.dismiss();
    // After dismissal the modal must not be in the DOM / must be hidden
    await expect(paywallPage.modal).not.toBeVisible();
  });

  test('clicking upgrade redirects to checkout or pricing page', async ({
    page,
    paywallPage,
  }) => {
    await page.goto('/premium-feature');
    await paywallPage.expectVisible();
    await paywallPage.clickUpgrade();

    await expect(page).toHaveURL(/\/(checkout|pricing|upgrade|subscribe)/);
  });

  test('paywall is triggered from the course detail page for locked content', async ({
    page,
    paywallPage,
  }) => {
    // Navigate to a locked course to confirm the paywall is consistent across entry points
    await page.goto('/courses/premium-course');
    // Trigger the locked content (e.g. clicking on a locked lesson)
    await page.getByTestId('locked-lesson-item').first().click();
    await paywallPage.expectVisible();
  });
});
