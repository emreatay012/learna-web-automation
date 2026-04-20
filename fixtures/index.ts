import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { OnboardingPage } from '../page-objects/OnboardingPage';
import { PaywallPage } from '../page-objects/PaywallPage';
import { getTestCredentials, loginViaUi } from '../helpers/auth';

type PageObjects = {
  loginPage: LoginPage;
  onboardingPage: OnboardingPage;
  paywallPage: PaywallPage;
};

type AuthFixtures = {
  /** A page that is already authenticated as the test user. */
  authenticatedPage: PageObjects & { page: ReturnType<typeof base['extend']> };
};

/**
 * Extend the base `test` with pre-built page objects.
 * Import `test` and `expect` from this file instead of '@playwright/test'.
 */
export const test = base.extend<PageObjects & AuthFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  onboardingPage: async ({ page }, use) => {
    await use(new OnboardingPage(page));
  },

  paywallPage: async ({ page }, use) => {
    await use(new PaywallPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    await loginViaUi(page, getTestCredentials());
    await use({
      page: page as unknown as PageObjects & { page: ReturnType<typeof base['extend']> },
      loginPage: new LoginPage(page),
      onboardingPage: new OnboardingPage(page),
      paywallPage: new PaywallPage(page),
    });
  },
});

export { expect } from '@playwright/test';
