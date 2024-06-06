import { expect } from '@playwright/test';
import { test, loginBusinessUser, createFreeUser, createBusinessUser, NEW_USER_CREDENTIALS } from "../fixtures/base.js";

test('Create Free User full flow', async ({ page, request, createFreeUser }) => {
    await page.goto("/");
    await page.getByPlaceholder('username@gmail.com').fill(NEW_USER_CREDENTIALS['email']);
    await page.getByPlaceholder('Your password').fill(NEW_USER_CREDENTIALS['password']);   
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page).toHaveURL(`${process.env.URL}/sign`)
});

test('Create Business User full flow', async ({ page, request, createBusinessUser }) => {

    const plan = await page.locator('.billing__trial-header').innerText();
    expect(plan).toBe('Business Monthly Plan');
    await expect(page).toHaveURL(`${process.env.URL}/settings/billing/plan`);
});