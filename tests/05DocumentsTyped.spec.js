import { expect } from '@playwright/test';
import { test, loginBusinessUser } from "../fixtures/base.js";
import SignPage from '../page_objects/signPage.js';

const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';

test.describe('DocumentsTyped', () => {

  test('TC_05_21_01 |Verify that button "Edit&Ressend" is active', async ({ page, loginBusinessUser }) => {
    test.setTimeout(100 * 1000);
    const signPage = new SignPage(page);
    signPage.clickUploadFileBtn('testDocuments/CSV.csv');

    await signPage.locators.getPrepareDocumentBtn().waitFor({ state: 'visible' });
    signPage.clickPrepareDocumentBtn();

    await signPage.clickSendForSignatureRadioBtn();
    await signPage.clickAddSignerBtn();

    await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
    await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

    await signPage.clickContinueBtn();
    await signPage.clickSignModal();
    await signPage.clickSignPlace();
    await signPage.clickSignModal();
    await signPage.clickSaveBtn();
    await signPage.locators.getSendForSignatureBtn().waitFor({ state: 'visible' });
    signPage.clickSendForSignatureBtn();
    const documentsPage = await signPage.clickBackToDocumentsBtnGoDocumentsPage();

    const documentsAwaitingPage = await documentsPage.clickAwaitingSignatureLinkGoDocumentsAwaitingPage();
    await documentsAwaitingPage.clickOptionsButton();
    await documentsAwaitingPage.clickEditAndResendButton();

    await expect(documentsAwaitingPage.locators.getModalForm()).toBeVisible();

    await documentsAwaitingPage.clickCancelButton();

    await documentsAwaitingPage.clickCheckBoxSelectAll();
    await documentsAwaitingPage.clickSelectOptionsButton();
    await documentsAwaitingPage.locators.getDeleteButton().waitFor({ state: 'visible' });
    await documentsAwaitingPage.clickDeleteButton();
    await documentsAwaitingPage.clickYesDeleteButton();

  });



})
