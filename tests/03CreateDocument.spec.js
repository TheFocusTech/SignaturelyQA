import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage, prepareForSignatureModal } from "../fixtures/base.js";

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
})