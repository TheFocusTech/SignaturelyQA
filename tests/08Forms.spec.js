import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, TOAST_MESSAGE, DOCUMENT_STATUS } from "../testData.js";

test.describe('Forms', () => {

  test('TC_08_32_01 | Verify that user can create form', async ({ createBusinessUserAndLogin, signPage, 
    prepareForSignatureModal, createFormPage, formsPage, successModal }) => {
    test.setTimeout(120 * 1000);

    await signPage.sideMenu.clickForms();

    await formsPage.clickCreateFormBtn();
    await createFormPage.fillFormNameField(SIGNERS_DATA.signerName1);
    await createFormPage.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);
    await createFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
    await createFormPage.clickFillTemplateBtn();

    await prepareForSignatureModal.clickNameFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();
    
    await prepareForSignatureModal.clickSignFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();

    await prepareForSignatureModal.clickCreateBtn();

    await expect(prepareForSignatureModal.toast.toastBody).toHaveText(TOAST_MESSAGE.success);

    await successModal.clickBackToFormsBtn();

    await expect(await formsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.live);
  })
}) 
