import { test, expect } from '@playwright/test';
import { LoginPage } from '../lib/pages/LoginPage';
import { BoardPage } from '../lib/pages/BoardPage';
import scenarios from './data/scenarios.json';

test.describe('Loop Technical Evaluation', () => {
    let loginPage: LoginPage;
    let boardPage: BoardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        boardPage = new BoardPage(page);
        await loginPage.login();
    });

    for (const scenario of scenarios) {
        test(scenario.description, async () => {

            // Navigate to the correct project board
            if (scenario.page === 'Web Application' || scenario.page === 'Mobile Application' || scenario.page === 'Marketing Campaign') {
                await boardPage.navigateTo(scenario.page);
            } else {
                throw new Error(`Unknown page: ${scenario.page}`);
            }

            // Verify the task details (Column & Tags)
            await boardPage.verifyTaskInColumn(
                scenario.taskName,
                scenario.expectedColumn!,
                scenario.expectedTags
            );
        });
    }
});
