
import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS, TOAST_MESSAGE } from '../testData.js';

test.describe('DocumentsType', () => {

  test('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, successModal, finalStepPage, documentsPage }) => {

    test.setTimeout(250 * 1000);
    await signPage.uploadFile.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFile.clickPrepareDocumentBtn();

    await prepareForSignatureModal.clickSendForSignatureRadioBtn();
    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1, 0)
    await prepareForSignatureModal.fillSignerEmailField(process.env.PREFIX_EMAIL + '01' + process.env.EMAIL_DOMAIN, 0);
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

      test('TC_05_16_01 | Verify that the user receives an email reminder to sign the document', async ({createBusinessUserAndLogin, signPage, prepareForSignatureModal, finalStepPage, successModal, documentsPage, documentsAwaitingPage, sendReminderDocumentModal}) => {
      test.setTimeout(250 * 1000);

      await signPage.uploadFile.fileUploader.uploadFile('testDocuments/todoList.xlsx');
      await signPage.uploadFile.clickPrepareDocumentBtn();

      await prepareForSignatureModal.clickSendForSignatureRadioBtn();
      await prepareForSignatureModal.clickAddSignerBtn();
      await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1, 0)
      await prepareForSignatureModal.fillSignerEmailField(process.env.EMAIL_PREFIX + '37' + process.env.EMAIL_DOMAIN, 0);
      await prepareForSignatureModal.clickContinueBtn();
      await prepareForSignatureModal.clickGotItBtn();
      await prepareForSignatureModal.clickSignFieldsItem();
      await prepareForSignatureModal.doCanvasClicks();
      await prepareForSignatureModal.clickSaveBtn();
      
      await finalStepPage.clickSendForSignatureBtn();
      await finalStepPage.toast.waitForToastDisappearance();
      await successModal.clickBackToDocumentsBtn();
      
      await documentsPage.sideMenuDocuments.clickAwaitingSignature();
      await documentsAwaitingPage.table.clickOptionsBtn();
      await documentsAwaitingPage.table.clickSendReminderBtn();
      
      await sendReminderDocumentModal.clickSignerCheckbox();
      await sendReminderDocumentModal.clickSendReminderBtn();

      await expect(await documentsAwaitingPage.toast.toastBody).toHaveText(TOAST_MESSAGE.sendReminder);

   })

})
