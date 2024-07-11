import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import {
    SIGNERS_DATA,
    TOAST_MESSAGE,
    DOCUMENT_STATUS,
    UPLOAD_FILE_PATH,
    QASE_LINK,
    GOOGLE_DOC_LINK, FORM_STATUS, TEMPLATES_STATUS, FORMS
} from '../testData.js';
import { createForm } from '../helpers/preconditions.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Forms', () => {
    test('TC_08_32_01 | Verify user can create form', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createFormPage,
        formsPage,
        successModal,
    }) => {
        await description('To verify Business  user can create form');
        await tag('Create Form');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-32`, 'Qase: SIGN-32');
        await link(`${GOOGLE_DOC_LINK}c5mhxwvn5pxt`, 'ATC_08_32_01');
        await epic('Forms');

        test.setTimeout(120 * 1000);
        await signPage.sideMenu.clickForms();

        await formsPage.clickCreateFormBtn();
        await createFormPage.createUpdateForm.fillFormNameField(SIGNERS_DATA.signerName1);
        await createFormPage.createUpdateForm.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);

        await createFormPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await createFormPage.createUpdateForm.clickFillTemplateBtn();

        await prepareForSignatureModal.clickNameOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickDateOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickCreateBtn();

        await step('Verify Success Toast Notification is shown', async () => {
            await expect(prepareForSignatureModal.toast.toastBody).toHaveText(TOAST_MESSAGE.success);
        });

        await successModal.clickBackToFormsBtn();

        await step('Verify "Live" status of the created form in the table is "Live"', async () => {
            await expect(await formsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.live);
        });
    });

    test('TC_08_35_01 | Verify user can duplicate form', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createFormPage,
        formsPage,
        successModal,
    }) => {
        await description('To verify Business user can duplicate form');
        await tag('Duplicate Form');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-35`, 'Qase: SIGN-35');
        await link(`${GOOGLE_DOC_LINK}ertctkmlxc8`, 'ATC_08_35_01');
        await epic('Forms');

        test.setTimeout(120 * 1000);
        await createForm(signPage,  formsPage,createFormPage, prepareForSignatureModal, successModal);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickFirstOptionsBtn();
        await formsPage.table.clickDuplicateBtn();
        await successModal.clickOkBtn();

        await step('Verify the toast notification indicating duplication is shown', async () => {
            await expect(await formsPage.toast.toastBody.nth(0)).toHaveText(TOAST_MESSAGE.duplicated);
        });

        await step('Verify the number of forms in the table is increased by 1', async () => {
            await expect(await formsPage.table.formsList).toHaveCount(2);
        });
    });

    test('TC_08_36_01 | Verify user can disable and enable form', async ({
        createBusinessUserAndLogin,
        signPage,
        formsPage,
        createFormPage,
        prepareForSignatureModal,       
        successModal,
    }) => {
        await description('To verify Business user can duplicate form');
        await tag('Duplicate Form');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-36`, 'Qase: SIGN-36');
        await link(`${GOOGLE_DOC_LINK}mc6zaq1bjz9o`, 'ATC_08_36_01');
        await epic('Forms');

        test.setTimeout(120 * 1000);
        await createForm(signPage, formsPage, createFormPage, prepareForSignatureModal, successModal);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickFirstOptionsBtn();
        await formsPage.table.clickDisableFormBtn();

        await step('Verify toast notification indicating the form is disabled is displayed', async () => {
            await expect(await formsPage.toast.toastBody.nth(0)).toHaveText(TOAST_MESSAGE.formDisabled);
        });

        await step('Verify the form status on the form page is "disabled"', async () => {
            await expect(await formsPage.table.documentStatus).toHaveText(FORM_STATUS.disabled);
        });

        await formsPage.table.clickFirstOptionsBtn();
        await formsPage.table.clickEnableFormBtn();

        await step('Verify the toast notification indicating the form is enabled is displayed', async () => {
            await expect(await formsPage.toast.toastBody.nth(0)).toHaveText(TOAST_MESSAGE.formEnabled);
        });

        await step('Verify the form status on the form page is "live"', async () => {
            await expect(await formsPage.table.documentStatus).toHaveText(FORM_STATUS.live);
        });
    });

    test('TC_08_34_01 | Verify user can delete form', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createFormPage,
        formsPage,
        successModal,
        confirmDeletionModal,
    }) => {
        await description('To verify Business user can delete form');
        await tag('Delete Form');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-34`, 'Qase: SIGN-34');
        await link(`${GOOGLE_DOC_LINK}1rswbzg5kt90`, 'ATC_08_34_01');
        await epic("Forms");

        test.setTimeout(120 * 1000);
        await createForm(signPage, formsPage, createFormPage, prepareForSignatureModal, successModal);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickFirstOptionsBtn();
        await formsPage.table.clickDeleteForm();
        await confirmDeletionModal.clickYesDelete();
        await formsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.formDeleted);

        await step('Verify the number of forms in the table is 0', async () => {
            await expect(await formsPage.table.formsList).toHaveCount(0);
        });
    });
    test('TC_08_33_01 | Verify user can edit form', async ({
        createBusinessUserAndLogin,
        signPage,
        formsPage,
        createFormPage,
        prepareForSignatureModal,
        successModal,
        updateFormPage,
    }) => {
        await description('To verify Business user can edit form');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-33`, 'Qase: SIGN-33');
        await link(`${GOOGLE_DOC_LINK}go4aj45aaddt`, 'ATC_08_33_01');
        await epic('Forms');
        await tag('Edit Form');

        test.setTimeout(90000);

        await createForm(signPage, formsPage, createFormPage, prepareForSignatureModal, successModal, updateFormPage);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickFirstOptionsBtn();
        await formsPage.table.clickEditBtn();
        await updateFormPage.createUpdateForm.fillFormNameField(FORMS.formNameEdit);
        await updateFormPage.createUpdateForm.fillOptionalMessageField(FORMS.optionalMessageFormEdit);
        await updateFormPage.clickDeleteDocumentBtn();
        await updateFormPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await updateFormPage.createUpdateForm.clickFillTemplateBtn();

        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickInitialOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickDateOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickSaveBtn();

        await step('Verify first toast message has text "Document successfully saved!"', async () => {
            await expect(formsPage.toast.toastBody.first()).toHaveText(TOAST_MESSAGE.success);
        });
        await step('Verify second toast message has text "Form saved!"', async () => {
            await expect(formsPage.toast.toastBody.nth(1)).toHaveText(TOAST_MESSAGE.editedFormSaved);
        });
        await step('Verify Edited Form has edited title "Form is Edited"', async () => {
            await expect(formsPage.table.firstFormTitle).toHaveText(FORMS.formNameEdit);
        });
    });
});
