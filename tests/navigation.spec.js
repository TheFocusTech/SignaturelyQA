import { expect } from '@playwright/test';
import { test, loginBusinessUser, deleteSignature } from "../fixtures/base.js";
import { URL_END_POINTS } from '../testData.js';

const BASE_URL = process.env.URL;

test('Navigate to login page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Log In | Signaturely');
});

test('Check login fixture', async ({ page, loginBusinessUser}) => { 

  await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);
});

test('create signature', async ({page, loginBusinessUser, deleteSignature}) => {
  await page.locator('.dropDownUser__wrapper').click()
  await page.getByRole('link', {name: 'Edit Signature'}).click()
  await page.getByRole('button', {name: 'Create Signature'}).click();
  await page.locator('.form__input').first().fill('Godrik Horn');
  await page.locator('.form__input').nth(1).fill('GH');
  await page.locator('.uiCheckbox__inner.uiCheckbox--unChecked').click();
  await page.getByRole('button', {name: 'Create Signature'}).click();
  
  await expect (page.locator('.settingsSignature__item-inner').first()).toBeVisible();
  
  await page.locator('[type="success"]').click();
  await page.locator('.sidebar__item-trigger-inner').first().click();
  await page.waitForURL('https://staging.d2twwklgqmrfet.amplifyapp.com/sign')
  
});

test('create and delete signature', async ({page, loginBusinessUser}) => {
  test.setTimeout(35000)
  await page.locator('.dropDownUser__wrapper').click()
  await page.getByRole('link', {name: 'Edit Signature'}).click()
  await page.getByRole('button', {name: 'Create Signature'}).click();
  await page.locator('.form__input').first().fill('Godrik Horn');
  await page.locator('.form__input').nth(1).fill('GH');
  await page.locator('.uiCheckbox__inner.uiCheckbox--unChecked').click();
  await page.getByRole('button', {name: 'Create Signature'}).click();
  
  await expect (page.locator('.settingsSignature__item-inner').first()).toBeVisible();
  
  await page.locator('[type="success"]').click();
  await page.locator('.sidebar__item-trigger-inner').first().click();

  await page.locator('.dropDownUser__wrapper').click();
  await page.getByRole('link', {name: 'Edit Signature'}).click();
  await page.locator('.settingsSignature__dropDown-trigger').first().click();
  await page.locator('.settingsSignature__dropDown-item--delete').click();
  await page.getByRole('button', {name: 'Delete'}).click();
  await page.locator('[type="success"]').click();
  await page.locator('.sidebar__item-trigger-inner').first().click();
})