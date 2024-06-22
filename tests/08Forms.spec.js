import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS, TOAST_MESSAGE, DOCUMENT_STATUS } from "../testData.js";
import SuccessModal from "../new_pom/modalWindows/successModal.js";

test.describe('Sign Document', () => {

  test('TC_08_32_01 | Verify that user can create form', async ({ createBusinessUserAndLogin, signPage, 
    prepareForSignatureModal, createFormPage, formsPage, successModal }) => {
    test.setTimeout(120 * 1000);

    await signPage.sideMenu.clickForms();

    await formsPage.clickCreateFormBtn();
    await createFormPage.fillFormNameField(CHOOSE_SIGNERS_FIELDS.name1);
    await createFormPage.fillOptionalMessageField(CHOOSE_SIGNERS_FIELDS.email1);
    await createFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
    await createFormPage.clickFillTemplateBtn();

    await prepareForSignatureModal.clickNameFieldItem();
    await prepareForSignatureModal.doCanvasClicks();
    
    await prepareForSignatureModal.clickSignFieldItem();
    await prepareForSignatureModal.doCanvasClicks();

    await prepareForSignatureModal.clickCreateBtn();

    await expect(prepareForSignatureModal.toast.toastBody).toHaveText(TOAST_MESSAGE.success);

    await successModal.clickBackToFormsBtn();

    await expect(await formsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.live);
  })
}) 
