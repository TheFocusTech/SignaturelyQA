import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";
import { CREATE_TEMPLATE, TEMPLATES_STATUS, EDIT_TEMPLATE_DATA, UPLOAD_FILE_PATH } from "../testData.js";
import { createTemplate } from "../helpers/preconditions.js";
import { description, tags, severity, Severity, link, epic, feature, step } from "allure-js-commons";

test.describe('Templates', () => {

    test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage }) => {
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

        await expect(await templatePage.table.documentStatus).toHaveText(TEMPLATES_STATUS.live);

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

        // await description('Objective: To verify the functionality of attaching a payment card ' +
        //     'through the settings-billing section and deleting a payment card through the Billing Portal.')
        // await severity(Severity.CRITICAL);
        // await link(
        //     'https://app.qase.io/case/SIGN-54',
        //     'Qase: SIGN-54'
        // );
        // await link(
        //     'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.khucr6xuqdib',
        //     'ATC_14_54_01'
        // );
        // await epic('Setting');
        // await feature('Billing');
        // await tags('Payment Card', 'Billing Portal');

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
        // await prepareForSignatureModal.clickBackToTemplatesBtn();

        await expect(await templatePage.table.documentTitle).toHaveText(EDIT_TEMPLATE_DATA.nameField);

        await expect(await templatePage.toast.getToastByText(TOAST_MESSAGE.success)).toBeVisible();
        await expect(await templatePage.toast.getToastByText(TOAST_MESSAGE.templateSaved)).toBeVisible();
    });
});
