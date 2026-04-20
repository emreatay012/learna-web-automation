import { expect, Locator, Page } from '@playwright/test';

/**
 * Asserts that a element identified by data-testid is visible.
 * Waits up to the configured actionTimeout before failing.
 */
export async function expectVisible(page: Page, testId: string): Promise<void> {
  await expect(page.getByTestId(testId)).toBeVisible();
}

/**
 * Asserts that a locator is visible and contains the expected text substring.
 */
export async function expectTextVisible(locator: Locator, text: string): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toContainText(text);
}

/**
 * Asserts the page URL matches the given pattern (string suffix or RegExp).
 */
export async function expectUrl(page: Page, pattern: string | RegExp): Promise<void> {
  await expect(page).toHaveURL(pattern);
}

/**
 * Waits for a network request matching the URL pattern to complete.
 * Useful for confirming API calls fired by user interactions.
 */
export async function waitForRequest(
  page: Page,
  urlPattern: string | RegExp,
  action: () => Promise<void>,
): Promise<void> {
  await Promise.all([page.waitForResponse(urlPattern), action()]);
}
