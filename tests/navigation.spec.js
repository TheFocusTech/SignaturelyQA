import { expect } from '@playwright/test';
import { test, loginBusinessUser, deleteSignature } from "../fixtures/base.js";
import { URL_END_POINTS, DATA_SIGNER } from '../testData.js';
import SignPage from '../page_objects/signPage.js';

const BASE_URL = process.env.URL;

test('Navigate to login page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Log In | Signaturely');
});

test('Check login fixture', async ({ page, loginBusinessUser}) => { 

  await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);
});

test('create signature', async ({page, loginBusinessUser, deleteSignature}) => {
  const signPage = new SignPage(page);
  await signPage.clickDropDownUser();
  const editSignature = await signPage.clickEditSignatureAndGoEditSignaturePage();
  await editSignature.clickCreateSignatureBtn();
  await editSignature.fillFullNameInput(DATA_SIGNER.fullName);
  await editSignature.fillInitialsInput(DATA_SIGNER.initials);
  await editSignature.clickCheckboxAgree();
  await editSignature.clickCreateSignatureBtn();

  await expect (editSignature.locators.getCardSignatureLast()).toBeVisible();
  
  await editSignature.clickToastCloseBtn();
  await editSignature.clickSignSidebarLinkAndGoSignPage();
  await page.waitForURL('https://staging.d2twwklgqmrfet.amplifyapp.com/sign');
});

test('create and delete signature', async ({page, loginBusinessUser}) => {
  // test.setTimeout(35000)
  const signPage = new SignPage(page);
  await signPage.clickDropDownUser();
  const editSignature = await signPage.clickEditSignatureAndGoEditSignaturePage();
  await editSignature.clickCreateSignatureBtn();
  await editSignature.fillFullNameInput(DATA_SIGNER.fullName);
  await editSignature.fillInitialsInput(DATA_SIGNER.initials);
  await editSignature.clickCheckboxAgree();
  await editSignature.clickCreateSignatureBtn();

  await expect (editSignature.locators.getCardSignatureLast()).toBeVisible();
  
  await editSignature.clickToastCloseBtn();
  await editSignature.clickSignSidebarLinkAndGoSignPage();
  await page.waitForURL('https://staging.d2twwklgqmrfet.amplifyapp.com/sign');

  await signPage.clickDropDownUser();
  await signPage.clickEditSignatureAndGoEditSignaturePage();
  await editSignature.clickBurgerMenuSignature();
  await editSignature.clickDeleteDropItem();
  await editSignature.clickButtonDelete();

  await editSignature.clickToastCloseBtn();
  await editSignature.clickSignSidebarLinkAndGoSignPage();
})
