import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import {
    SIGNERS_DATA,
    TOAST_MESSAGE,
    DOCUMENT_STATUS,
    UPLOAD_FILE_PATH,
    QASE_LINK,
    GOOGLE_DOC_LINK,
} from '../testData.js';
import { createForm } from '../helpers/preconditions.js';
import { description, tag, severity, Severity, link, epic } from 'allure-js-commons';

test.describe('Forms', () => {
    test('TC_08_32_01 | Verify that user can create form', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createFormPage,
        formsPage,
        successModal,
    }) => {
        await description('Verify that user can create form');
        await tag('Create Form');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-35`, 'Qase: SIGN-35');
        await link(`${GOOGLE_DOC_LINK}c5mhxwvn5pxt`, 'ATC_08_35_01');
        await epic('Forms');

        test.setTimeout(120 * 1000);
        await signPage.sideMenu.clickForms();

        await formsPage.clickCreateFormBtn();
        await createFormPage.fillFormNameField(SIGNERS_DATA.signerName1);
        await createFormPage.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);

        await createFormPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await createFormPage.clickFillTemplateBtn();

        await prepareForSignatureModal.clickNameOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

        await prepareForSignatureModal.clickDateOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();

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
        successModal,
    }) => {
        await description('Verify that user can duplicate form');
        await tag('Duplicate Form');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-32`, 'Qase: SIGN-32');
        await link(`${GOOGLE_DOC_LINK}c5mhxwvn5pxt`, 'ATC_08_35_01');
        await epic('Forms');

        test.setTimeout(120 * 1000);
        await createForm(signPage, prepareForSignatureModal, createFormPage, formsPage, successModal);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickFirstOptionsBtn();
        await formsPage.table.clickDuplicateBtn();
        await successModal.clickOkBtn();

        await expect(await formsPage.toast.toastBody.nth(0)).toHaveText(TOAST_MESSAGE.duplicated);

        await expect(await formsPage.table.formsList).toHaveCount(2);
    });
});
