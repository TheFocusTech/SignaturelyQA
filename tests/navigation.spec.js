import { expect } from '@playwright/test';
import { test, loginBusinessUser, deleteSignature } from "../fixtures/base.js";
import { URL_END_POINTS, DATA_SIGNER, CHOOSE_SIGNERS_FIELDS, DOMEN_EMAIL } from '../testData.js';
import SignPage from '../page_objects/signPage.js';

const BASE_URL = process.env.URL;

test('Navigate to login page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Log In | Signaturely');
});

test('Check login fixture', async ({ page, loginBusinessUser}) => { 

  await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);
});

test('Create signature', async ({page, loginBusinessUser, deleteSignature}) => {
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

test('Create and delete signature', async ({page, loginBusinessUser}) => {
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
});

test('Testing function clickCanvas() in SingPage', async ({page, loginBusinessUser}) => {
  let add = '3131'
  const EMAIL = 'jg@fg.rf';

  const signPage = new SignPage(page);
  signPage.clickUploadFileBtn('testDocuments/picture.jpg');
  await signPage.locators.getPrepareDocumentBtn().waitFor({state: 'visible'});
  signPage.clickPrepareDocumentBtn();

  await signPage.clickSignAndSendForSignature();
  await signPage.clickAddSignerSingAndSendBtn();
  await signPage.fillAddedSignersNameField(CHOOSE_SIGNERS_FIELDS.name2);
  await signPage.fillAddedSignersEmailField(EMAIL);
  await signPage.clickContinueBtn();

  await signPage.locators.getSignFieldsItem().waitFor();
  await signPage.clickSignFieldsItem();
  await signPage.doCanvasClicks();
  await signPage.doCanvasClicks();
  await signPage.clickInitialFieldsItem();
  await signPage.doCanvasClicks();
  await signPage.doCanvasClicks();

  await expect (await signPage.locators.getFieldsOnPage()).toHaveCount(5);

  signPage.clearExcludedAreas();
  await signPage.clickCancelBtnAndDeleteDocument();

  const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
  await documentsPage.clickOptionsButton();
  await documentsPage.clickDeleteBtn();
  await documentsPage.clickYesDeleteBtn();

  const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();
  await documentsTrashPage.clickEmptyTrashBtn();
  await documentsTrashPage.clickEmptyTrashBtn();
  await documentsTrashPage.clickSignSidebarLinkAndGoSignPage();
})
