import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CREATE_TEMPLATE, TEMPLATES_STATUS, EDIT_TEMPLATE_DATA, UPLOAD_FILE_PATH, TOAST_MESSAGE } from "../testData.js";
import { createTemplate } from "../helpers/preconditions.js";
import { description, tags, severity, Severity, link, epic, step } from "allure-js-commons";

test.describe('Templates', () => {

    test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatesPage, createNewTemplatePage }) => {
        await description('Objective: To verify that the user can create a new template in the system successfully. This includes ensuring that all required fields are completed correctly, the template is saved, and it is accessible for future use.')
        await severity(Severity.CRITICAL);
        await link(
            'https://app.qase.io/case/SIGN-27',
            'Qase: SIGN-27'
        );
        await link(
            'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.p443twc6am8u',
            'ATC__07_27_01'
        );
        await epic('Templates');
        await tags('Create a template');

        await signPage.sideMenu.clickTemplates();
        await templatesPage.sideMenuTemplates.clickCreateTemplate();
        await createNewTemplatePage.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await createNewTemplatePage.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
        await createNewTemplatePage.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await createNewTemplatePage.fileUploader.uploadFile('testDocuments/CSV.csv');
        await createNewTemplatePage.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.clickBackToTemplatesBtn();

        await step('Verify that the document status in the template page is "live"', async () => {
            await expect(await templatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.live);
        });

    });

    test('TC_07_31_01 | Verify that  the user can select Add to API', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatesPage, apiTemplatesPage, createNewTemplatePage }) => {
        await description('Objective: To verify the process of add template to API.');
        await severity(Severity.CRITICAL);
        await link(
            'https://app.qase.io/case/SIGN-31',
            'Qase: SIGN-31'
        );
        await link(
            'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.z5onphks9v9p',
            'ATC_07_31_01'
        );
        await epic('Templates');
        await tags('User', 'API');

        test.setTimeout(250 * 1000);

        await createTemplate(signPage, prepareForSignatureModal, templatesPage, createNewTemplatePage);
        await signPage.sideMenu.clickTemplates();
        await templatesPage.table.clickOptionsBtn(0);
        await templatesPage.table.clickAddToAPIBtn();
        await templatesPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.success);
        await templatesPage.sideMenuTemplates.clickApiTemplates();

        await step('Template successfully added to API (appears in API Templates) - status API.', async () => {
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
        createNewTemplatePage }) => {
        test.slow();

        await description('Objective: To verify that a user can successfully edit an existing template by changing its name, message, role, and associated document, and ensure that the changes are reflected in the user interface and confirmed by appropriate toast messages.')
        await severity(Severity.CRITICAL);
        await link(
            'https://app.qase.io/case/SIGN-28',
            'Qase: SIGN-28'
        );
        await link(
            'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ntdi077ei6pg',
            'ATC_07_28_01'
        );
        await epic('Templates');
        await tags('Edit-template');

        await createTemplate(
            signPage,
            prepareForSignatureModal,
            templatesPage,
            createNewTemplatePage);

        await signPage.sideMenu.clickTemplates();
        await templatesPage.table.clickOptionsBtn(0);
        await templatesPage.table.clickEditBtn();
        await editTemplatesPage.createTemplate.fillTemplateNameField(EDIT_TEMPLATE_DATA.nameField);
        await editTemplatesPage.createTemplate.fillOptionalMessageField(EDIT_TEMPLATE_DATA.optionalMessage);
        await editTemplatesPage.createTemplate.fillCreateTemplateRolesField(EDIT_TEMPLATE_DATA.nameRole);
        await editTemplatesPage.fileUploader.deleteUploadedFile();
        await editTemplatesPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.csvDocument);
        await editTemplatesPage.createTemplate.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSaveBtn();
        await templatesPage.table.waitForDocumentTitleVisible(EDIT_TEMPLATE_DATA.nameField)

        await step('Verify the new name of Template is visible in the table', async () => {
            await expect(await templatesPage.table.objectTitle).toHaveText(EDIT_TEMPLATE_DATA.nameField);
        })

        await step('Verify the toast message "Document successfully saved!"', async () => {
            await expect(await templatesPage.toast.toastBody.first()).toHaveText(TOAST_MESSAGE.success);
        })

        await step('Verify the toast message "Template saved"', async () => {
            await expect(await templatesPage.toast.toastBody.nth(1)).toHaveText(TOAST_MESSAGE.templateSaved);
        })
    });
})