import { Page } from '@playwright/test';

export interface Credentials {
  email: string;
  password: string;
}

export function getTestCredentials(): Credentials {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in the environment. ' +
        'Copy .env.example to .env and fill in the values.',
    );
  }

  return { email, password };
}

/**
 * Performs a full login via the UI and waits for the post-login landing page.
 * Use this in beforeEach / beforeAll hooks for tests that require an authenticated session.
 */
export async function loginViaUi(page: Page, credentials: Credentials): Promise<void> {
  await page.goto('/login');
  await page.getByTestId('email-input').fill(credentials.email);
  await page.getByTestId('password-input').fill(credentials.password);
  await page.getByTestId('login-button').click();
  // Wait for navigation away from /login — the app redirects after success
  await page.waitForURL((url) => !url.pathname.includes('/login'), {
    timeout: 15_000,
  });
}

/**
 * Injects a saved auth token directly into localStorage / cookies, bypassing
 * the UI login form. Faster for tests that don't need to verify login itself.
 *
 * @param storageStatePath - path to a previously saved storageState JSON file
 */
export async function loginViaStorageState(
  page: Page,
  storageStatePath: string,
): Promise<void> {
  await page.context().addInitScript(() => {
    // nothing needed — storage state is applied at context level
  });
  // The caller is responsible for passing a context created with the storageState option.
  // This helper exists as a reminder / documentation anchor.
  void storageStatePath;
}
