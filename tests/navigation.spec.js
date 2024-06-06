import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import { URL_END_POINTS, DATA_SIGNER, EMPTY_DOCUMENTS_HEADER, EMPTY_TRASH_HEADER } from '../testData.js';
import SignPage from '../page_objects/signPage.js';

const BASE_URL = process.env.URL;

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
});

test('check clean documents fixture', async ({ page, loginBusinessUser}) => {

    const signPage = new SignPage(page);

    const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
    await documentsPage.locators.getEmptyTableHeader().waitFor();

    await expect(documentsPage.locators.getEmptyTableHeader()).toHaveText(EMPTY_DOCUMENTS_HEADER);

    const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();
    await documentsTrashPage.locators.getEmptyTableHeader().waitFor();

    await expect(documentsTrashPage.locators.getEmptyTableHeader()).toHaveText(EMPTY_TRASH_HEADER);
});