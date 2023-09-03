import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/about');
});

test.describe('About page', () => {
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/About | DiannXArt/);
    });

    test('should display about page correctly', async ({ page }) => {
        await expect(page.getByRole('heading')).not.toBeNull();
        await expect(page.getByRole('paragraph')).not.toBeNull();
    });
});
