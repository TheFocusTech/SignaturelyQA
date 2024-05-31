import { expect } from '@playwright/test';
import { test, loginBusinessUser } from "../fixtures/base.js";
import { URL_END_POINTS } from '../testData.js';

const BASE_URL = process.env.URL;

test('Navigate to login page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Log In | Signaturely');
});

test('Check login fixture', async ({ page, loginBusinessUser}) => { 

  await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);
});