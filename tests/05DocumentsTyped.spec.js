import { expect } from "@playwright/test";
import { test, loginBusinessUser, createBusinessUserAndLogin } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage.js"
import SettingEditSignature from "../page_objects/settingEditSignature.js";
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';

test.describe('DocumentsTyped', () => {
    // test.beforeEach('Create account', async ({ page, createBusinessUserAndLogin }) => {        
    //     const signPage = new SignPage(page);
    // })

    test('TC_05_21_01 | Verify that button "Edit&Ressend" is active', async ({ page, createBusinessUserAndLogin }) => {
        test.setTimeout(150 * 1000);
        const signPage = new SignPage(page);
        await signPage.clickUploadFileBtn('testDocuments/CSV.csv');

        await signPage.locators.getPrepareDocumentBtn().waitFor({ state: 'visible' });
        await signPage.clickPrepareDocumentBtn();

        await signPage.clickSendForSignatureRadioBtn();
        await signPage.clickAddSignerBtn();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

        await signPage.clickContinueBtn();
        await signPage.clickSignModal();
        await signPage.clickSignPlace();
        await signPage.clickSignModal();
        await signPage.clickSaveBtn();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await signPage.clickSendForSignatureButton();
        const documentsPage = await signPage.clickBackToDocumentsBtn();
        await documentsPage.clickOptionsDropdown();
        await documentsPage.clickEditAndResendButton();

        await expect(documentsPage.locators.getTitleEditAndRessendDocument()).toBeVisible();
    })

    test('TC_05_21_02 | Verify that button "Revert to Draft" is active', async ({ page, loginBusinessUser }) => {
        test.setTimeout(150 * 1000);
        const signPage = new SignPage(page);
        await signPage.clickUploadFileBtn('testDocuments/CSV.csv');

        await signPage.locators.getPrepareDocumentBtn().waitFor({ state: 'visible' });
        await signPage.clickPrepareDocumentBtn();

        await signPage.clickSendForSignatureRadioBtn();
        await signPage.clickAddSignerBtn();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

        await signPage.clickContinueBtn();
        await signPage.clickSignModal();
        await signPage.clickSignPlace();
        await signPage.clickSignModal();
        await signPage.clickSaveBtn();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await signPage.clickSendForSignatureButton();
        const documentsPage = await signPage.clickBackToDocumentsBtn();
        await documentsPage.clickOptionsDropdown();
        await documentsPage.clickEditAndResendButton();
        await documentsPage.clickRevertToDraftBtn();

        await expect(page).toHaveURL(/documents.*edit$/);
        
    })

    test('TC_05_21_03 | Verify that document_status is  "Draft" ', async ({ page, loginBusinessUser }) => {
        test.setTimeout(150 * 1000);
        const signPage = new SignPage(page);
        await signPage.clickUploadFileBtn('testDocuments/CSV.csv');

        await signPage.locators.getPrepareDocumentBtn().waitFor({ state: 'visible' });
        await signPage.clickPrepareDocumentBtn();

        await signPage.clickSendForSignatureRadioBtn();
        await signPage.clickAddSignerBtn();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

        await signPage.clickContinueBtn();
        await signPage.clickSignModal();
        await signPage.clickSignPlace();
        await signPage.clickSignModal();
        await signPage.clickSaveBtn();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await signPage.clickSendForSignatureButton();
        const documentsPage = await signPage.clickBackToDocumentsBtn();
        await documentsPage.clickOptionsDropdown();
        await documentsPage.clickEditAndResendButton();
        await documentsPage.clickRevertToDraftBtn();

        await documentsPage.clickCancelBtn();
        await documentsPage.clickDocumentsSidebarLink();

        await expect(documentsPage.locators.getStatusDocumentDraft()).toBeVisible();

    })

    test('TC_05_20_01 | Verify that the document was loaded successfully', async ({ page, loginBusinessUser }) => {
        test.setTimeout(200 * 1000);
        const signPage = new SignPage(page);
        const settingEditSignature = new SettingEditSignature(page);
        await signPage.clickUploadFileBtn('testDocuments/todoList.xlsx');

        await signPage.locators.getPrepareDocumentBtn().waitFor({ state: 'visible' });
        await signPage.clickPrepareDocumentBtn();
        await signPage.clickContinueBtn();
        await signPage.clickSignModal();
        await signPage.clickSignPlace();

        await settingEditSignature.clickCheckboxAgree();
        await signPage.clickSignNowBtn();
        await signPage.locators.getSignatureCreatedAlert().waitFor({ state: 'visible' });
        await signPage.locators.getSignatureCreatedAlert().waitFor({ state: 'hidden' });
        await signPage.clickSaveBtn();

        await signPage.locators.getDocumentCreatedAlert().waitFor({ state: 'attached' });
        await signPage.locators.getDocumentCreatedAlert().waitFor({ state: 'hidden' });
        await signPage.clickSignDocumentBtn();

        const documentsPage = await signPage.clickBackToDocumentsBtn();
        await documentsPage.clickOptionsDropdown();
        await documentsPage.clickDownloadButtonOption('/testDownloadDocuments');
    })

})