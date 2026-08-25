import type { Page } from '@playwright/test';
import { WebCommons } from '../common/common.js';
import data from '../data/data.js';

export abstract class BasePage extends WebCommons {

  constructor(page: Page) {
    super(page);
  }

  abstract goto(): Promise<void>;

  async waitForReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  protected async gotoPath(path: string): Promise<void> {
    await this.page.goto(`${data.baseUrl}${path}`);
  }
}