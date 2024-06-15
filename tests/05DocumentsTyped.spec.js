import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage, prepareForSignature, finalStep, documentPage } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage.js"
import SettingEditSignature from "../page_objects/settingEditSignature.js";
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';

test.describe('DocumentsTyped', () => {

    test('TC_05_21_01 | Verify that button "Edit&Ressend" is active', async ({ createBusinessUserAndLogin, signPage, finalStep, prepareForSignature, documentPage }) => {
        test.setTimeout(250 * 1000);
        await signPage.UploadFileOnSignPage.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.UploadFileOnSignPage.fileUploader.waitForVisibleProgressBar();
        await signPage.UploadFileOnSignPage.fileUploader.waitForHiddenProgressBar();
        await signPage.UploadFileOnSignPage.clickPrepareDocumentBtn();

        await prepareForSignature.clickSendForSignatureRadioBtn();
        await prepareForSignature.clickAddSignerBtn();
        await prepareForSignature.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1);
        await prepareForSignature.fillSignerEmailField(CHOOSE_SIGNERS_FIELDS.email1);

        await prepareForSignature.clickContinueBtn();
        await prepareForSignature.clickGotItBtn();

        await prepareForSignature.clickSignFieldsItem();
        await prepareForSignature.clickSignPlaceCanvas();
        await prepareForSignature.clickSignFieldsItem();
        await prepareForSignature.clickSaveBtn();

        await finalStep.waitForToastDocumentSavedVisible();
        await finalStep.waitForToastDocumentSavedHidden();
        await finalStep.clickSendForSignatureBtn();
        await finalStep. waitForSuccessSendModalVisible();
        await finalStep.clickBackToDocumentBtn();

        await documentPage.clickOptionsBtn ();
        await documentPage.clickEditAndResendBtn ();

        await expect (documentPage.editAndResendTitle).toBeVisible();

})