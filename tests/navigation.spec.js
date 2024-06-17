import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";

test('Navigate to login page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Log In | Signaturely');
});