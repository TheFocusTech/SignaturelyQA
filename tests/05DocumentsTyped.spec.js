
import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';
import { createCompletedField } from '../helpers/preconditions.js';

test.describe('DocumentsType', () => {

  test.skip('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, documentsPage }) => {

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
  test('TC_05_17_01 | Share document', async ({createBusinessUserAndLogin, signPage, prepareForSignatureModal, chooseSignatureOrInitialModal, finalStepPage, successModal, documentsPage, shareThisDocumentModal}) => {   
    test.slow();   
    await createCompletedField(signPage, prepareForSignatureModal, chooseSignatureOrInitialModal, finalStepPage, successModal);
        
    await documentsPage.sideMenuDocuments.clickCompletedLink();
    await documentsPage.table.clickOptionsBtn();
    await documentsPage.table.clickOptionsShareDropdown();

    await shareThisDocumentModal.clickTextField();
    await shareThisDocumentModal.clickInputEmailField(CHOOSE_SIGNERS_FIELDS.email1);
    await shareThisDocumentModal.clickShareDocumentBtn();

    await expect(documentsPage.toast.documentToast).toHaveClass('Toastify__toast-body');           
  })
})

