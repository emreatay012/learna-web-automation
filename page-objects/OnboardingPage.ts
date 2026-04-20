import { expect, Page } from '@playwright/test';

export class OnboardingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  get welcomeHeading() {
    return this.page.getByTestId('onboarding-welcome-heading');
  }

  get startButton() {
    return this.page.getByTestId('onboarding-start-button');
  }

  get continueButton() {
    return this.page.getByTestId('onboarding-continue-button');
  }

  get skipButton() {
    return this.page.getByTestId('onboarding-skip-button');
  }

  get progressBar() {
    return this.page.getByTestId('onboarding-progress-bar');
  }

  get stepIndicator() {
    return this.page.getByTestId('onboarding-step-indicator');
  }

  get goalSelectionStep() {
    return this.page.getByTestId('onboarding-step-goals');
  }

  get subjectSelectionStep() {
    return this.page.getByTestId('onboarding-step-subjects');
  }

  get completionScreen() {
    return this.page.getByTestId('onboarding-completion');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async start(): Promise<void> {
    await this.startButton.click();
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async skip(): Promise<void> {
    await this.skipButton.click();
  }

  async selectGoal(goalTestId: string): Promise<void> {
    await this.page.getByTestId(goalTestId).click();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async expectVisible(): Promise<void> {
    await expect(this.welcomeHeading).toBeVisible();
    await expect(this.startButton).toBeVisible();
  }

  async expectStartButtonEnabled(): Promise<void> {
    await expect(this.startButton).toBeEnabled();
  }

  async expectProgressBarVisible(): Promise<void> {
    await expect(this.progressBar).toBeVisible();
  }

  async expectCompletionVisible(): Promise<void> {
    await expect(this.completionScreen).toBeVisible();
  }
}
