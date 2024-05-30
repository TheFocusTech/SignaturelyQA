import { test, expect } from '@playwright/test';

test('Navigate to login page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Log In | Signaturely');
});
