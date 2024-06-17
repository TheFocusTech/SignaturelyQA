
import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';

test.describe('DocumentsType', () => {

  test('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, finalStepModal, documentsPage }) => {

    test.setTimeout(250 * 1000);
    await signPage.uploadFile.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFile.clickPrepareDocumentBtn();

    await prepareForSignatureModal.clickSendForSignatureRadioBtn();
    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1);
    await prepareForSignatureModal.fillSignerEmailField(CHOOSE_SIGNERS_FIELDS.email1)
    await prepareForSignatureModal.clickContinueBtn();
    await prepareForSignatureModal.clickGotItBtn();

    await prepareForSignatureModal.clickSignFieldsItem();
    await prepareForSignatureModal.clickSignPlaceCanvas();
    await prepareForSignatureModal.clickSignFieldsItem();
    await prepareForSignatureModal.clickSaveBtn();

    await finalStepModal.waitForToastDocumentSavedVisible();
    await finalStepModal.waitForToastDocumentSavedHidden();
    await finalStepModal.clickSendForSignatureBtn();
    await finalStepModal.waitForSuccessSendModalVisible();
    await finalStepModal.clickBackToDocumentBtn();
    
    await documentsPage.clickOptionsBtn();
    await documentsPage.clickEditAndResendBtn();
    await expect(documentsPage.editAndResendTitle).toBeVisible();

  })
})

