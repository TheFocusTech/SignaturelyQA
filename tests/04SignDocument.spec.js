import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS } from "../testData.js";

test.describe('Sign Document', () => {

  test('TC_04_11_02 | Verify custom signing order', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal }) => {

    await signPage.uploadFile.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFile.clickPrepareDocumentBtn();

    await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
    
    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillkAddSignersName1Field(CHOOSE_SIGNERS_FIELDS.name1);
    await prepareForSignatureModal.fillAddSignersEmail1Field(CHOOSE_SIGNERS_FIELDS.email1);

    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillkAddSignersName2Field(CHOOSE_SIGNERS_FIELDS.name2);
    await prepareForSignatureModal.fillAddSignersEmail2Field(CHOOSE_SIGNERS_FIELDS.email2);

    await prepareForSignatureModal.clickCustomSigningOrderCheckbox();

    await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toBeVisible();
    await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toHaveText("1.");

    await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toBeVisible();
    await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toHaveText("2.");
  })
})