import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CREATE_TEMPLATE, TEMPLATES_STATUS, TOAST_MESSAGE } from "../testData.js";
import { createTemplate } from "../helpers/preconditions.js";
import { description, tags, severity, Severity, link, epic, feature, step } from "allure-js-commons";

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

    test('TC_07_31_01 | Verify that  the user can select Add to API', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage, apiTemplatesPage, createTemplatePage }) => {
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

        await createTemplate(signPage, prepareForSignatureModal, templatePage, createTemplatePage);
        await signPage.sideMenu.clickTemplates();
        await templatePage.table.clickOptionsBtn(0);
        await templatePage.table.clickAddToAPIBtn();
        await templatePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.success);
        await templatePage.sideMenuTemplates.clickApiTemplates();

        await step('Template successfully added to API (appears in API Templates).', async () => {
            await expect(await apiTemplatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.api);

        });
    });
});