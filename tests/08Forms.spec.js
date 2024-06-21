import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS, TOASTER_MESSAGE, DOCUMENT_STATUS } from "../testData.js";

test.describe('Sign Document', () => {

  test('TC_08_32_01 | Verify that user can create form', async ({ createBusinessUserAndLogin, signPage, prepareForSigningModal, createFormPage, formsPage }) => {
    test.setTimeout(120 * 1000);

    await signPage.sideMenu.clickForms();

    await formsPage.clickCreateFormBtn();
    await createFormPage.fillFormNameField(CHOOSE_SIGNERS_FIELDS.name1);
    await createFormPage.fillOptionalMessageField(CHOOSE_SIGNERS_FIELDS.email1);
    await createFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
    await createFormPage.clickFillTemplateBtn();

    await prepareForSigningModal.clickNameField();
    await prepareForSigningModal.doCanvasClicks();
    
    await prepareForSigningModal.clickSignField();
    await prepareForSigningModal.doCanvasClicks();

    await prepareForSigningModal.clickCreateBtn();

    await expect(prepareForSigningModal.toast.toast).toHaveText(TOASTER_MESSAGE.documentSaved);

    await prepareForSigningModal.clickBackToFormsBtn();

    await expect(await formsPage.table.formStatus).toHaveText(DOCUMENT_STATUS.live);
  })
}) 
