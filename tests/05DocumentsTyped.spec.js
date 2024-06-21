
import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';

test.describe('DocumentsType', () => {

  test.skip('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, documentsPage }) => {

    test.setTimeout(250 * 1000);

    const signerName = generateSignerName(1);
    const signerEmail = generateSignerOrViewerEmail(1);    

    await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFileTab.clickPrepareDocumentBtn();

    await prepareForSignatureModal.clickSendForSignatureRadioBtn();
    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillSignerNameField(signerName);
    await prepareForSignatureModal.fillSignerEmailField(signerEmail);
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

