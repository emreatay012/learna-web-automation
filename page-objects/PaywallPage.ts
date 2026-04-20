import { expect, Page } from '@playwright/test';

export class PaywallPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  get modal() {
    return this.page.getByTestId('paywall-modal');
  }

  get title() {
    return this.page.getByTestId('paywall-title');
  }

  get description() {
    return this.page.getByTestId('paywall-description');
  }

  get upgradeButton() {
    return this.page.getByTestId('paywall-upgrade-button');
  }

  get dismissButton() {
    return this.page.getByTestId('paywall-dismiss-button');
  }

  get pricingSection() {
    return this.page.getByTestId('paywall-pricing-section');
  }

  get planCards() {
    return this.page.getByTestId('paywall-plan-card');
  }

  get freeBadge() {
    return this.page.getByTestId('paywall-free-badge');
  }

  get proBadge() {
    return this.page.getByTestId('paywall-pro-badge');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async clickUpgrade(): Promise<void> {
    await this.upgradeButton.click();
  }

  async dismiss(): Promise<void> {
    await this.dismissButton.click();
    await expect(this.modal).not.toBeVisible();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async expectVisible(): Promise<void> {
    await expect(this.modal).toBeVisible();
    await expect(this.title).toBeVisible();
    await expect(this.upgradeButton).toBeVisible();
  }

  async expectPricingVisible(): Promise<void> {
    await expect(this.pricingSection).toBeVisible();
    await expect(this.planCards.first()).toBeVisible();
  }

  async expectDismissible(): Promise<void> {
    await expect(this.dismissButton).toBeVisible();
    await expect(this.dismissButton).toBeEnabled();
  }
}
