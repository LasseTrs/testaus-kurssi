import { test, expect } from '@playwright/test';

//testi 3
test.describe('Positive test', () => {
test('Dog image loaded ok', async ({ page }) => {
await page.goto('http://localhost:5173');
await page.waitForResponse('**/api/dogs/random');
const dogImage = page.locator('img');
const src = await dogImage.getAttribute('src');
expect(src).not.toBeNull();
expect(src!).toMatch(/^https:\/\//);
});
});

//testi 4
test.describe('Positive test', () => {
test('Dog image loaded after button press', async ({ page }) => {
await page.goto('http://localhost:5173');
const button = page.getByRole('button', { name: 'Get Another Dog' });
const image = page.locator('img');
await button.click();
await expect(image).toHaveAttribute('src', /^https:\/\//);
});
});

//testi 5
test.describe('Negative test', () => {
test('Route abort -> error', async ({ page }) => {
await page.route('**/api/dogs/random', route => route.abort());
await page.goto('http://localhost:5173');
const errorElement = page.getByText(/error/i);
await expect(errorElement).toBeVisible();
});
});