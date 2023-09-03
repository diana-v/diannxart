import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/work');
});

test.describe('Work', () => {
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/Work | DiannXArt/);
    });

    test('should display a list of posts', async ({ page }) => {
        await expect(page.locator('li')).not.toBeNull();
    });

    test('should navigate to a post detail page when clicking a post', async ({ page }) => {
        const firstPostTitle = await page.locator('li h2').first().textContent();

        await page.locator('li > a').first().click();

        await expect(page).toHaveTitle(`${firstPostTitle} | DiannXArt`);
    });
});
