import {
    FrameLocator,
    Locator,
    Page,
} from '@playwright/test';

type Role = Parameters<Page['getByRole']>[0];
type RoleOptions = Parameters<Page['getByRole']>[1];
type LocatorOptions = Parameters<Page['getByText']>[1];
type SelectValues = Parameters<Locator['selectOption']>[0];
type ScreenshotOptions = Parameters<Page['screenshot']>[0];
type LocatorTarget = string | Locator;

export class WebCommons {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Returns a Playwright Locator object for the given selector string.
     * Useful for reusing locators across multiple actions.
     */
    async element(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }

    private async resolve(target: LocatorTarget): Promise<Locator> {
        return typeof target === 'string' ? this.element(target) : target;
    }

    /**
     * Clicks on the specified web element.
     */
    async click(target: LocatorTarget): Promise<void> {
        const element = await this.resolve(target);
        await element.click();
    }

    /** Checks the specified checkbox or radio button. */
    async check(target: LocatorTarget): Promise<void> {
        const element = await this.resolve(target);
        await element.check();
    }

    /** Unchecks the specified checkbox. */
    async uncheck(target: LocatorTarget): Promise<void> {
        const element = await this.resolve(target);
        await element.uncheck();
    }

    /** Selects one or more options from a select element. */
    async select(target: LocatorTarget, values: SelectValues): Promise<void> {
        const element = await this.resolve(target);
        await element.selectOption(values);
    }

    /** Captures a screenshot of the current page. */
    async screenshot(path?: string, options?: ScreenshotOptions): Promise<Buffer> {
        return path === undefined
            ? this.page.screenshot(options)
            : this.page.screenshot({ ...options, path });
    }

    /** Registers a handler for the next browser dialog. */
    handleAlert(action: 'accept' | 'dismiss' = 'accept', promptText?: string): void {
        this.page.once('dialog', async (dialog) => {
            if (action === 'accept') {
                await dialog.accept(promptText);
            } else {
                await dialog.dismiss();
            }
        });
    }

    /** Runs the action that opens a popup and returns the new page. */
    async handleWindow(action: () => Promise<void>): Promise<Page> {
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            action(),
        ]);
        return popup;
    }

    /** Returns a locator scoped to the specified iframe. */
    handleFrame(frameSelector: string): FrameLocator {
        return this.page.frameLocator(frameSelector);
    }

    getByRole(role: Role, options?: RoleOptions): Locator {
        return this.page.getByRole(role, options);
    }

    getByText(text: string | RegExp, options?: LocatorOptions): Locator {
        return this.page.getByText(text, options);
    }

    getByPlaceholder(text: string | RegExp, options?: LocatorOptions): Locator {
        return this.page.getByPlaceholder(text, options);
    }

    getByAltText(text: string | RegExp, options?: LocatorOptions): Locator {
        return this.page.getByAltText(text, options);
    }
}