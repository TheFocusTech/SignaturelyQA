import { expect } from '@playwright/test';
import { test, loginBusinessUser, loginAndCleanDocuments } from "../fixtures/base.js";
export const documentTrashEmptyHeaderText = "You don't have any deleted documents yet.";
import { URL_END_POINTS, EMPTY_DOCUMENTS_HEADER, EMPTY_TRASH_HEADER } from '../testData.js';
import SignPage from '../page_objects/signPage.js';

const BASE_URL = process.env.URL;

test.skip('Navigate to login page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Log In | Signaturely');
});

test('Check login fixture', async ({ page, loginBusinessUser }) => {

    await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);
});

test('Check clean documents fixture', async ({ page, loginBusinessUser }) => {
    const signPage = new SignPage(page);

    const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
    await documentsPage.locators.getEmptyTableHeader().waitFor();

    await expect(documentsPage.locators.getEmptyTableHeader()).toHaveText(EMPTY_DOCUMENTS_HEADER);
    
    const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();
    await documentsTrashPage.locators.getEmptyTableHeader().waitFor();

    await expect(documentsTrashPage.locators.getEmptyTableHeader()).toHaveText(EMPTY_TRASH_HEADER);   
});