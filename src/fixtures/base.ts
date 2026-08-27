import { test as base, expect } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';

export const test = base.extend({});

export async function attachStepScreenshot(page: Page, testInfo: TestInfo, stepName: string): Promise<void> {
    await testInfo.attach(`${stepName} screenshot`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
    });
}

test.afterEach(async ({ page }, testInfo) => {
    await attachStepScreenshot(page, testInfo, 'Final test');
});

export { expect };
