import { Page, Locator, expect } from '@playwright/test';

export class BoardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(project: 'Web Application' | 'Mobile Application' | 'Marketing Campaign') {
        // Find the sidebar button containing the project name
        const projectNav = this.page.locator(`nav button`, { has: this.page.locator(`h2`, { hasText: project }) });
        await projectNav.click();
        // Verify we switched by checking the header or some active state if possible, 
        // but for now relying on Playwright's auto-wait.
    }

    async verifyTaskInColumn(taskName: string, columnName: string, expectedTags: string[]) {
        // 1. Locate the column by its header
        // The column container has an h2 with the column name
        const column = this.page.locator('div.flex-col', { has: this.page.locator(`h2`, { hasText: columnName }) });

        // 2. Locate the task card within that column
        // The card contains an h3 with the task name
        const card = column.locator('div.bg-white', { has: this.page.locator(`h3`, { hasText: taskName }) });

        // 3. Verify the card exists/is visible
        await expect(card).toBeVisible();

        // 4. Verify tags
        for (const tag of expectedTags) {
            const tagLocator = card.locator('span', { hasText: tag });
            await expect(tagLocator).toBeVisible();
        }
    }
}
