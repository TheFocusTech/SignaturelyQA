import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CREATE_TEMPLATE, TEMPLATES_STATUS, EDIT_TEMPLATE_DATA, UPLOAD_FILE_PATH, TOAST_MESSAGE } from "../testData.js";
import { description, tags, severity, Severity, link, epic, feature, step } from "allure-js-commons";
import { createTemplate } from "../helpers/preconditions.js";

test.describe('Templates', () => {

    test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage }) => {
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
        await templatePage.sideMenuTemplates.clickCreateTemplate();
        await templatePage.createTemplate.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await templatePage.createTemplate.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
        await templatePage.createTemplate.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await templatePage.createTemplate.fileUploader.uploadFile('testDocuments/CSV.csv');
        await templatePage.createTemplate.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.clickBackToTemplatesBtn();

        await step('Verify that the document status in the template page is "live"', async () => {
        await expect(await templatePage.table.documentStatus).toHaveText(TEMPLATES_STATUS.live);
        });

    });

    test('TC_07_31_01 | Verify that  the user can select Add to API', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage, apiTemplatesPage }) => {
        test.setTimeout(250 * 1000);
        await signPage.sideMenu.clickTemplates();
        await templatePage.sideMenuTemplates.clickCreateTemplate();
        await templatePage.createTemplate.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await templatePage.createTemplate.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await templatePage.createTemplate.fileUploader.uploadFile('testDocuments/CSV.csv');
        await templatePage.createTemplate.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.clickBackToTemplatesBtn();
        await templatePage.table.clickOptionsBtn(0);
        await templatePage.table.clickAddToAPIBtn();
        await templatePage.toast.waitForToastCompleted();
        await templatePage.sideMenuTemplates.clickApiTemplates();

        await expect(await apiTemplatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.api);

    });

    test('TC_07_28_01 | Verify that user can edit template', async ({
        createBusinessUserAndLogin,
        signPage,
        templatePage,
        editTemplatesPage,
        prepareForSignatureModal }) => { 
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
            templatePage,
            prepareForSignatureModal);
        
        await signPage.sideMenu.clickTemplates();
        await templatePage.table.clickOptionsBtn(0);
        await templatePage.table.clickEditBtn();
        await editTemplatesPage.createTemplate.fillTemplateNameField(EDIT_TEMPLATE_DATA.nameField);
        await editTemplatesPage.createTemplate.fillOptionalMessageField(EDIT_TEMPLATE_DATA.optionalMessage);
        await editTemplatesPage.createTemplate.fillCreateTemplateRolesField(EDIT_TEMPLATE_DATA.nameRole);
        await editTemplatesPage.fileUploader.deleteUploadedFile();
        await editTemplatesPage.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await editTemplatesPage.createTemplate.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickSaveBtn();
        await templatePage.table.waitForDocumentTitleVisible(EDIT_TEMPLATE_DATA.nameField)

        await step('Verify the new name of Template is visible in the table', async () => { 
            await expect(await templatePage.table.documentTitle).toHaveText(EDIT_TEMPLATE_DATA.nameField);
        })
        
        await step('Verify the toast message "Document successfully saved!"', async () => {
            await expect(await templatePage.toast.toastBody.first()).toHaveText(TOAST_MESSAGE.success);
        })
        
        await step('Verify the toast message "Template saved"', async () => { 
            await expect(await templatePage.toast.toastBody.nth(1)).toHaveText(TOAST_MESSAGE.templateSaved);
        })
    });
});
