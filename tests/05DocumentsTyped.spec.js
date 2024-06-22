import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { generateSignerName, generateSignerOrViewerEmail } from "../helpers/utils";

test.describe('DocumentsType', () => {

  test('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, successModal, finalStepPage, documentsPage }) => {

    test.setTimeout(250 * 1000);

    const signerName = generateSignerName('001');
    const signerEmail = generateSignerOrViewerEmail('001');    

    await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFileTab.clickPrepareDocumentBtn();

    await prepareForSignatureModal.clickSendForSignatureRadioBtn();
    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillSignerNameField(signerName);
    await prepareForSignatureModal.fillSignerEmailField(signerEmail);
    await prepareForSignatureModal.clickContinueBtn();
    await prepareForSignatureModal.clickGotItBtn();

    await prepareForSignatureModal.clickSignFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();
    await prepareForSignatureModal.clickSaveBtn();

    await finalStepPage.waitAndClickSendForSignatureBtn();
    await successModal.clickBackToDocumentsBtn();
    await documentsPage.table.clickOptionsBtn();
    await documentsPage.table.clickEditAndResendBtn();

    await expect(documentsPage.table.titleEditAndResendDocument).toBeVisible();
    expect(await documentsPage.table.getTitleText()).toBe("Edit & Resend document");

  })
})

