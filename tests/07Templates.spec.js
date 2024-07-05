import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import {
    CREATE_TEMPLATE,
    TEMPLATES_STATUS,
    EDIT_TEMPLATE_DATA,
    UPLOAD_FILE_PATH,
    TOAST_MESSAGE,
    QASE_LINK,
    GOOGLE_DOC_LINK,
} from '../testData.js';

import { createTemplate } from '../helpers/preconditions.js';
import { description, tags, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Templates', () => {
    test('TC_07_27_01 | Verify that user can create a template', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        templatesPage,
        createNewTemplatePage,
        successModal,
    }) => {
        await description(
            'Objective: To verify that the user can create a new template in the system successfully. This includes ensuring that all required fields are completed correctly, the template is saved, and it is accessible for future use.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-27`, 'Qase: SIGN-27');
        await link(`${GOOGLE_DOC_LINK}p443twc6am8u`, 'ATC__07_27_01');
        await epic('Templates');
        await tags('Create a template');

        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
        await createNewTemplatePage.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await createNewTemplatePage.fileUploader.uploadFile('testDocuments/CSV.csv');
        await createNewTemplatePage.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickCreateBtn();
        await successModal.clickBackToTemplatesBtn();

        await step('Verify that the document status in the template page is "live"', async () => {
            await expect(await templatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.live);
        });
    });

    test('TC_07_31_01 | Verify that  the user can select Add to API', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        templatesPage,
        apiTemplatesPage,
        createNewTemplatePage,
        successModal,
    }) => {
        await description('Objective: To verify the process of add template to API.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-31`, 'Qase: SIGN-31');
        await link(`${GOOGLE_DOC_LINK}z5onphks9v9p`, 'ATC_07_31_01');
        await epic('Templates');
        await tags('User', 'API');

        test.setTimeout(250 * 1000);

        await createTemplate(signPage, prepareForSignatureModal, templatesPage, createNewTemplatePage, successModal);
        await signPage.sideMenu.clickTemplates();
        await templatesPage.table.clickFirstOptionsBtn();
        await templatesPage.table.clickAddToAPIBtn();
        await templatesPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.success);
        await templatesPage.sideMenuTemplates.clickApiTemplates();

        await step('Template successfully added to API (appears in API Templates).', async () => {
            await expect(await apiTemplatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.api);
        });

        await step('Template successfully added to API (appears in API Templates) - name checked.', async () => {
            await expect(templatesPage.table.getTemplateTitle()).resolves.toEqual(CREATE_TEMPLATE.nameField);
        });
    });

    test('TC_07_28_01 | Verify that user can edit template', async ({
        createBusinessUserAndLogin,
        signPage,
        templatesPage,
        editTemplatesPage,
        prepareForSignatureModal,
        createNewTemplatePage,
        successModal,
    }) => {
        test.slow();

        await description(
            'Objective: To verify that a user can successfully edit an existing template by changing its name, message, role, and associated document, and ensure that the changes are reflected in the user interface and confirmed by appropriate toast messages.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-28`, 'Qase: SIGN-28');
        await link(`${GOOGLE_DOC_LINK}ntdi077ei6pg`, 'ATC_07_28_01');
        await epic('Templates');
        await tags('Edit-template');

        await createTemplate(signPage, prepareForSignatureModal, templatesPage, createNewTemplatePage, successModal);

        await signPage.sideMenu.clickTemplates();
        await templatesPage.table.clickFirstOptionsBtn();
        await templatesPage.table.clickEditBtn();
        await editTemplatesPage.createTemplate.fillTemplateNameField(EDIT_TEMPLATE_DATA.nameField);
        await editTemplatesPage.createTemplate.fillOptionalMessageField(EDIT_TEMPLATE_DATA.optionalMessage);
        await editTemplatesPage.createTemplate.fillCreateTemplateRolesField(EDIT_TEMPLATE_DATA.nameRole);
        await editTemplatesPage.fileUploader.deleteUploadedFile();
        await editTemplatesPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.csvDocument);
        await editTemplatesPage.createTemplate.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSaveBtn();
        await templatesPage.table.waitForDocumentTitleVisible(EDIT_TEMPLATE_DATA.nameField);

        await step('Verify the new name of Template is visible in the table', async () => {
            await expect(await templatesPage.table.objectTitle).toHaveText(EDIT_TEMPLATE_DATA.nameField);
        });

        await step('Verify the toast message "Document successfully saved!"', async () => {
            await expect(await templatesPage.toast.toastBody.first()).toHaveText(TOAST_MESSAGE.success);
        });

        await step('Verify the toast message "Template saved"', async () => {
            await expect(await templatesPage.toast.toastBody.nth(1)).toHaveText(TOAST_MESSAGE.templateSaved);
        });
    });

    test('TC_07_30_01 | Verify that user can duplicate template', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        templatesPage,
        createNewTemplatePage,
        successModal,
    }) => {
        await description('Objective: To verify the process of duplicate template.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-30`, 'Qase: SIGN-30');
        await link(`${GOOGLE_DOC_LINK}nz5pn2p8lvfz`, 'ATC_07_30_01');
        await epic('Templates');
        await tags('User', 'Dublicat');

        test.setTimeout(250 * 1000);

        await createTemplate(signPage, prepareForSignatureModal, templatesPage, createNewTemplatePage, successModal);

        await signPage.sideMenu.clickTemplates();
        await templatesPage.table.clickFirstOptionsBtn();
        await templatesPage.table.clickDuplicateBtn();
        await successModal.clickOkBtn();
        await templatesPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.templateDuplicate);

        await step('Verify that the number of tamplates in the table is increased by 1', async () => {
            await expect(await templatesPage.table.objectTitle).toHaveCount(2);
        });

        await step("Verify that template1's title equals template2's title.", async () => {
            expect(await templatesPage.table.compareTitles()).toBe(true);
        });
    });

    test('TC_07_29_01 | Verify that the user can delete the template', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        templatesPage,
        createNewTemplatePage,
        confirmDeletionModal,
        successModal,
    }) => {
        await description('Objective: Verify that the user can successfully delete a template.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-29`, 'Qase: SIGN-29');
        await link(`${GOOGLE_DOC_LINK}lduzx2ed3enn`, 'ATC_07_29_01');
        await epic('Templates');
        await tags('Delete');

        test.setTimeout(250 * 1000);

        await createTemplate(signPage, prepareForSignatureModal, templatesPage, createNewTemplatePage, successModal);

        await signPage.sideMenu.clickTemplates();
        await templatesPage.table.clickFirstOptionsBtn();
        await templatesPage.table.clickDeleteBtn();
        await confirmDeletionModal.clickYesDelete();
        await templatesPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.templateDelete);

        await step('Verify that the number of templates in the table is 0', async () => {
            await expect(await templatesPage.table.objectTitle).toHaveCount(0);
        });
    });

});
