import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/contact');
});

test.describe('Contact page', () => {
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/Contact | DiannXArt/);
    });

    test('should fill and submit the contact form', async ({ page }) => {
        await page.fill('#from', 'test@example.com');
        await page.selectOption('#subject', { label: 'General query' });
        await page.fill('#message', 'This is a test message');

        await page.click('button[type="submit"]');

        await expect(page.getByText('Your enquiry has been sent!')).toBeTruthy();
    });
});
