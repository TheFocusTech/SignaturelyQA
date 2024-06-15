import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage, prepareForSignature } from "../fixtures/base.js";

test.describe('CreateDocument', () => {

  test('TC_03_07_01 | Sign a document', async ({ createBusinessUserAndLogin, signPage, prepareForSignature }) => {

    await signPage.UploadFileOnSignPage.fileUploader.uploadFile('testDocuments/picture.jpg');
    
    await signPage.UploadFileOnSignPage.fileUploader.waitForVisibleProgressBar();
    await signPage.UploadFileOnSignPage.fileUploader.waitForHiddenProgressBar();

    await signPage.UploadFileOnSignPage.clickPrepareDocumentBtn();

    await prepareForSignature.clickSignDocumentRadioBtn();

    await prepareForSignature.clickContinueBtn();

    await prepareForSignature.clickGotItBtn();

    await prepareForSignature.clickSignFieldsItem();

  })
})