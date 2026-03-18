import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/en/contact');
});

test.describe('Contact page', () => {
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/Contact | DiannXArt/);
    });

    test('should fill and submit the contact form', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        await page.fill('#from', 'test@example.com');
        await page.selectOption('#subject', { label: 'General query' });
        await page.fill('#message', 'This is a test message');

        const submitButton = page.locator('button[type="submit"]');

        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();

        await submitButton.click();

        await expect(page.locator('text=/Your enquiry has been sent/i')).toBeVisible({ timeout: 15_000 });
    });
});
