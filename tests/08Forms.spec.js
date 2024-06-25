import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, TOAST_MESSAGE, DOCUMENT_STATUS, FORMS } from "../testData.js";
import { createForm } from "../helpers/preconditions.js";

test.describe('Forms', () => {

    test('TC_08_32_01 | Verify that user can create form', async ({ createBusinessUserAndLogin, signPage,
        prepareForSignatureModal, createEditFormPage, formsPage, successModal}) => {
        test.setTimeout(120 * 1000);

        await signPage.sideMenu.clickForms();

        await formsPage.clickCreateFormBtn();
        await createEditFormPage.fillFormNameField(SIGNERS_DATA.signerName1);
        await createEditFormPage.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);
        await createEditFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await createEditFormPage.clickFillTemplateBtn();

        await prepareForSignatureModal.clickSignFieldItem();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickInitialFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickDateFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickCreateBtn();

        await expect(prepareForSignatureModal.toast.toastBody).toHaveText(TOAST_MESSAGE.success);

        await successModal.clickBackToFormsBtn();

        await expect(await formsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.live);
    })

    test('TC_08_33_01 | Verify that user can edit form', async ({ createBusinessUserAndLogin, signPage,
        formsPage, createEditFormPage, prepareForSignatureModal, successModal }) => {
        test.setTimeout(90000);
        
        await createForm(signPage, formsPage, createEditFormPage, prepareForSignatureModal, successModal);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickOptionsDropdown();
        await formsPage.table.clickEditDropdownItem();
        await createEditFormPage.fillFormNameField(FORMS.form_name_edit);
        await createEditFormPage.fillOptionalMessageField(FORMS.optional_message_text_edit);
        await createEditFormPage.clickCancelBtn();
        await createEditFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await createEditFormPage.clickFillTemplateBtn();
               
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickInitialFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickDateFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickSaveBtnForm();

        await expect(formsPage.toast.toastBody.nth(0)).toBeVisible();
        await expect(formsPage.toast.toastBody.nth(1)).toBeVisible();

        await expect(formsPage.toast.toastBody.nth(0)).toHaveText(TOAST_MESSAGE.success);
        await expect(formsPage.toast.toastBody.nth(1)).toHaveText(TOAST_MESSAGE.editedFormSaved);
        await expect(formsPage.table.firstFormTitle).toHaveText(FORMS.form_name_edit);
    })
})

