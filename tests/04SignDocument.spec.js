import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage, prepareForSignatureModal } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS } from "../testData.js";

test.describe('CreateDocument', () => {

  test('TC_04_11_02 | Verify custom signing order', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal }) => {

    await signPage.uploadFile.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFile.fileUploader.waitForVisibleProgressBar();
    await signPage.uploadFile.fileUploader.waitForHiddenProgressBar();
    await signPage.uploadFile.clickPrepareDocumentBtn();

    await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
    
    await prepareForSignatureModal.clickAddOtherSignersBtn();
    await prepareForSignatureModal.fillkAddOtherSignersName1Field(CHOOSE_SIGNERS_FIELDS.name1);
    await prepareForSignatureModal.fillAddOtherSignersEmail1Field(CHOOSE_SIGNERS_FIELDS.email1);

    await prepareForSignatureModal.clickAddOtherSignersBtn();
    await prepareForSignatureModal.fillkAddOtherSignersName2Field(CHOOSE_SIGNERS_FIELDS.name2);
    await prepareForSignatureModal.fillAddOtherSignersEmail2Field(CHOOSE_SIGNERS_FIELDS.email2);

    await prepareForSignatureModal.clickCustomSigningOrderCheckbox();

    await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toBeVisible();
    await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toBeVisible();
  })
})