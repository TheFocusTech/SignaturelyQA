import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, TOAST_MESSAGE, DOCUMENT_STATUS, UPLOAD_FILE_PATH, FORMS } from "../testData.js";
import { createForm } from "../helpers/preconditions.js";
import { description, tag, step, severity, Severity, link, epic } from "allure-js-commons";

test.describe('Forms', () => {

    test('TC_08_32_01 | Verify that user can create form', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createFormPage,
        formsPage,
        successModal }) => {
        await description('Verify that user can create form');
        await tag('Create Form');
        await severity(Severity.CRITICAL);
        await link(
            'https://app.qase.io/case/SIGN-35',
            'Qase: SIGN-35'
        );
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.c5mhxwvn5pxt",
            "ATC_08_35_01"
        );
        await epic("Forms");


        test.setTimeout(120 * 1000);
        await signPage.sideMenu.clickForms();

        await formsPage.clickCreateFormBtn();
        await createFormPage.createUpdateForm.fillFormNameField(SIGNERS_DATA.signerName1);
        await createFormPage.createUpdateForm.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);

        await createFormPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await createFormPage.createUpdateForm.clickFillTemplateBtn();

        await prepareForSignatureModal.clickNameOnFieldsMenu();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickDateOnFieldsMenu();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickCreateBtn();

        await expect(prepareForSignatureModal.toast.toastBody).toHaveText(TOAST_MESSAGE.success);

        await successModal.clickBackToFormsBtn();

        await expect(await formsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.live);
    });

    test('TC_08_35_01 | Verify that user can duplicate form', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createFormPage,
        formsPage,
        successModal
    }) => {
        await description('Verify that user can duplicate form');
        await tag('Duplicate Form');
        await severity(Severity.CRITICAL);
        await link(
            'https://app.qase.io/case/SIGN-32',
            'Qase: SIGN-32'
        );
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.c5mhxwvn5pxt",
            "ATC_08_35_01"
        );
        await epic("Forms");

        test.setTimeout(120 * 1000);
        await createForm(signPage, formsPage, createFormPage, prepareForSignatureModal, successModal);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickOptionsBtn(0);
        await formsPage.table.clickDuplicateBtn();
        await successModal.clickOkBtn();

        await expect(await formsPage.toast.toastBody.nth(0)).toHaveText(TOAST_MESSAGE.duplicated);

        await expect(await formsPage.table.formsList).toHaveCount(2);
    });
    test('TC_08_33_01 | Verify that user can edit form', async ({ createBusinessUserAndLogin, signPage,
        formsPage, createFormPage, prepareForSignatureModal, successModal, updateFormPage }) => {
        await severity(Severity.CRITICAL);
        await link(
            'https://app.qase.io/case/SIGN-33',
            'Qase: SIGN-33'
        );
        await link(
            'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.go4aj45aaddt',
            'TC_08_33_01'
        );
        await epic('Forms');
        await tag('Edit Form');

        test.setTimeout(90000);

        await createForm(signPage, formsPage, createFormPage, prepareForSignatureModal, successModal);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickOptionsBtn(0);
        await formsPage.table.clickEditBtn();
        await updateFormPage.createUpdateForm.fillFormNameField(FORMS.form_name_edit);
        await updateFormPage.createUpdateForm.fillOptionalMessageField(FORMS.optional_message_text_edit);
        await updateFormPage.createUpdateForm.clickDeleteDocumentBtn();
        await updateFormPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await updateFormPage.createUpdateForm.clickFillTemplateBtn();

        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickInitialOnFieldsMenu();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickDateOnFieldsMenu();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickSaveBtn();

        await step('Verify that first toast message has text "Document successfully saved!"', async () => {
            await expect(formsPage.toast.toastBody.nth(0)).toHaveText(TOAST_MESSAGE.success);
        })
        await step('Verify that second toast message has text "Form saved!"', async () => {
            await expect(formsPage.toast.toastBody.nth(1)).toHaveText(TOAST_MESSAGE.editedFormSaved);
        })
        await step('Verify that Edited Form has edited title "Form is Edited"', async () => {
            await expect(formsPage.table.firstFormTitle).toHaveText(FORMS.form_name_edit);
        })
    })
})



