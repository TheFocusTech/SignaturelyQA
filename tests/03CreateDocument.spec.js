import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { DOCUMENT_TITLE, DOCUMENT_STATUS, CHOOSE_SIGNERS_FIELDS } from "../testData.js";

test.describe('CreateDocument', () => {

    test.skip('TC_03_07_01 | Sign a document', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal }) => {

        await signPage.UploadFileOnSignPage.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.UploadFileOnSignPage.fileUploader.waitForVisibleProgressBar();
        await signPage.UploadFileOnSignPage.fileUploader.waitForHiddenProgressBar();
        await signPage.UploadFileOnSignPage.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignDocumentRadioBtn();
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();

    })

    test('TC_03_07_06 | Verify that the user who uploaded the document and created a signature and Other Signer can sign it', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, chooseSignatureModal, finelStepPage, successModal, documentsPage }) => {
      test.setTimeout(100 * 1000);

      await signPage.uploadFile.fileUploader.uploadFile('testDocuments/todoList.xlsx');
      await signPage.uploadFile.clickPrepareDocumentBtn();
      await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
      await prepareForSignatureModal.clickAddSignerBtn();
      await prepareForSignatureModal.fillAddSignersNameField(CHOOSE_SIGNERS_FIELDS.name1, 0)
      await prepareForSignatureModal.fillAddSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1, 0);
      await prepareForSignatureModal.clickContinueBtn();
      await prepareForSignatureModal.clickGotItBtn();
      await prepareForSignatureModal.clickSignFieldsItem();
      await prepareForSignatureModal.canvas.doCanvasClicks();
      await prepareForSignatureModal.canvas.doCanvasClicks();
      await prepareForSignatureModal.canvas.clickAssignedToDropDown();
      await prepareForSignatureModal.canvas.clickMeNowDropDownItem();
      await chooseSignatureModal.clickCheckboxAgree();
      await chooseSignatureModal.clickSignNowBtn();
      await prepareForSignatureModal.toasts.clickToastFirstCloseBtn();
      await prepareForSignatureModal.buttons.clickSaveBtn();
      await finelStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
      await finelStepPage.clickSignDocumentAndSendForSignatureBtn();
      await successModal.clickBackToDocumentsBtn();
      
      await expect(await documentsPage.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
    });

})