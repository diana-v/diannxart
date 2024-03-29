import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/work');
});

test.describe('Inner post page', () => {
    test('should set page tile correctly', async ({ page }) => {
        const firstPostTitle = await page.locator('li h2').first().textContent();

        await page.locator('li > a').first().click();
        await expect(page).toHaveTitle(`${firstPostTitle} | DiannXArt`);
    });

    test('should display post details correctly', async ({ page }) => {
        await expect(page.getByRole('heading')).not.toBeNull();
        await expect(page.getByRole('paragraph')).not.toBeNull();
        await expect(page.getByRole('img')).not.toBeNull();
    });

    test('opens contact page on click of enquiry with pre selected artwork', async ({ page }) => {
        const unsoldPost = page.locator('li', { hasNotText: 'Sold' }).first();
        const postTitle = unsoldPost.locator('h2').textContent();

        await unsoldPost.click();

        await page.getByRole('button', { name: 'Enquire' }).click();
        await expect(page).toHaveTitle(`Contact | DiannXArt`);

        await expect(page.locator(`option[selected="${postTitle}"]`)).toBeTruthy();
    });
});
