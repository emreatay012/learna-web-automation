import { test, expect } from '../../fixtures';
import { getTestCredentials } from '../../helpers/auth';
import { loginViaUi } from '../../helpers/auth';

test.describe('Onboarding start @smoke', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each onboarding test
    await loginViaUi(page, getTestCredentials());
  });

  test('onboarding screen is shown to a new user after login', async ({
    page,
    onboardingPage,
  }) => {
    // A freshly-logged-in new user should see the onboarding welcome screen.
    // Wait for the start button to appear rather than using a fixed sleep.
    await onboardingPage.expectVisible();
  });

  test('onboarding welcome heading is visible', async ({ onboardingPage }) => {
    await expect(onboardingPage.welcomeHeading).toBeVisible();
  });

  test('start button is enabled and interactive', async ({ onboardingPage }) => {
    await onboardingPage.expectVisible();
    await onboardingPage.expectStartButtonEnabled();
  });

  test('clicking start shows the first onboarding step', async ({
    page,
    onboardingPage,
  }) => {
    await onboardingPage.expectVisible();
    await onboardingPage.start();

    // After clicking start, a progress indicator or the first step should appear
    await expect(
      onboardingPage.progressBar.or(onboardingPage.goalSelectionStep),
    ).toBeVisible();
  });

  test('progress bar appears after starting onboarding', async ({ onboardingPage }) => {
    await onboardingPage.expectVisible();
    await onboardingPage.start();
    await onboardingPage.expectProgressBarVisible();
  });

  test('skip button is available during onboarding', async ({ onboardingPage }) => {
    await onboardingPage.expectVisible();
    await onboardingPage.start();

    // Skip should be offered at some point during onboarding
    await expect(onboardingPage.skipButton).toBeVisible();
  });

  test('skipping onboarding navigates to the main app', async ({
    page,
    onboardingPage,
  }) => {
    await onboardingPage.expectVisible();
    await onboardingPage.start();
    await onboardingPage.skip();

    // After skip, the user should land anywhere outside /onboarding
    await expect(page).not.toHaveURL(/\/onboarding/);
  });
});
