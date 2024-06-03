import { expect } from '@playwright/test';

import { test, loginBusinessUser, createTemplateForOne } from '../fixtures/base.js';
import SignPage from '../page_objects/signPage.js';
import DocumentsPage from '../page_objects/documentsPage.js';
import { URL_END_POINTS, CHOOSE_SIGNERS_FIELDS, DOCUMENTS_STATUS } from '../testData.js';
import TemplatesActivePage from '../page_objects/templatesActivePage.js';
import TemplatesCreatePage from '../page_objects/templatesCreatePage.js';
import path from 'path';

const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;

test.describe.only('Create Document', () => {

    test('TC_03_08_01 | Verify that the "Send document" button will send the document from the template to the user (me) for signature', async ({ page,loginBusinessUser,createTemplateForOne}) => {

        const signPage = new SignPage (page);
        const documentsPage = new DocumentsPage(page);
        const templatesActivePage = new TemplatesActivePage(page);
        const templatesCreatePage = new TemplatesCreatePage(page);
        
        
        await loginBusinessUser(page, EMAIL, PASSWORD);
        await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);

        await signPage.createTemplateForOne(page);

        await signPage.clickChooseATemplateArrow();
        await signPage.clickSelectTemplateForOne();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

        await signPage.clickSendTheDocumentButton();
        await signPage.clickSendForSignatureButton();
        await signPage.locators.getModalWindowText();
        await signPage.clickBackToDocumentsButton();

        await expect(documentsPage.locators.getDocumentStatusAwaiting()).toHaveText(DOCUMENTS_STATUS.awaiting);
    })
});