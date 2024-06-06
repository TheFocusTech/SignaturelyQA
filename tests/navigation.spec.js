import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import { URL_END_POINTS, DATA_SIGNER, EMPTY_DOCUMENTS_HEADER, EMPTY_TRASH_HEADER } from '../testData.js';
import SignPage from '../page_objects/signPage.js';
import { API_URL_END_POINTS } from '../apiData.js';

const API_BASE_URL = process.env.API_URL;

const BASE_URL = process.env.URL;

const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;


test('Navigate to login page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Log In | Signaturely');
});

test('Check login fixture', async ({ page, loginBusinessUser }) => {

    await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);
});

test('Create signature', async ({ page, loginBusinessUser, deleteSignature }) => {
    const signPage = new SignPage(page);
    await signPage.clickDropDownUser();
    const editSignature = await signPage.clickEditSignatureAndGoEditSignaturePage();
    await editSignature.clickCreateSignatureBtn();
    await editSignature.fillFullNameInput(DATA_SIGNER.fullName);
    await editSignature.fillInitialsInput(DATA_SIGNER.initials);
    await editSignature.clickCheckboxAgree();
    await editSignature.clickCreateSignatureBtn();

    await expect(editSignature.locators.getCardSignatureLast()).toBeVisible();

    await editSignature.clickToastCloseBtn();
    await editSignature.clickSignSidebarLinkAndGoSignPage();
    await page.waitForURL('https://staging.d2twwklgqmrfet.amplifyapp.com/sign');
});

test('Create and delete signature', async ({ page, loginBusinessUser }) => {
    const signPage = new SignPage(page);
    await signPage.clickDropDownUser();
    const editSignature = await signPage.clickEditSignatureAndGoEditSignaturePage();
    await editSignature.clickCreateSignatureBtn();
    await editSignature.fillFullNameInput(DATA_SIGNER.fullName);
    await editSignature.fillInitialsInput(DATA_SIGNER.initials);
    await editSignature.clickCheckboxAgree();
    await editSignature.clickCreateSignatureBtn();

    await expect(editSignature.locators.getCardSignatureLast()).toBeVisible();

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

test('check clean documents fixture', async ({ page, loginBusinessUser}) => {

    const signPage = new SignPage(page);

    const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
    await documentsPage.locators.getEmptyTableHeader().waitFor();

    await expect(documentsPage.locators.getEmptyTableHeader()).toHaveText(EMPTY_DOCUMENTS_HEADER);

    const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();
    await documentsTrashPage.locators.getEmptyTableHeader().waitFor();

    await expect(documentsTrashPage.locators.getEmptyTableHeader()).toHaveText(EMPTY_TRASH_HEADER);

})
