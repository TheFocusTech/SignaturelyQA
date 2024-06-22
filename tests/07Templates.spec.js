import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";
import { CREATE_TEMPLATE, TEMPLATES_STATUS } from "../testData.js";

test.describe('Templates', () => {

    test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage }) => {
        await signPage.sideMenu.clickTemplates();
        await templatePage.sideMenuTemplates.clickCreateTemplate();
        await templatePage.createTemplate.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await templatePage.createTemplate.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
        await templatePage.createTemplate.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await templatePage.createTemplate.fileUploader.uploadFile('testDocuments/CSV.csv');
        await templatePage.createTemplate.clickFillTemlateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.clickBackToTempatesBtn();

        await expect(await templatePage.table.documentStatus).toHaveText(TEMPLATES_STATUS.live);

    });

    test('TC_07_31_01 | Verify that  the user can select Add to API', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage, apiTemplatesPage }) => {
        test.setTimeout(250 * 1000);
        await signPage.sideMenu.clickTemplates();
        await templatePage.sideMenuTemplates.clickCreateTemplate();
        await templatePage.createTemplate.fillTemplateNameField(CREATE_TEMPLATE.nameField);
        await templatePage.createTemplate.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
        await templatePage.createTemplate.fileUploader.uploadFile('testDocuments/CSV.csv');
        await templatePage.createTemplate.clickFillTemlateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.clickBackToTempatesBtn();
        await templatePage.table.clickOptionsBtn();
        await templatePage.table.clickAddToAPIBtn();
        await templatePage.toast.waitForToastCompleted();
        await templatePage.sideMenuTemplates.clickApiTemplates();

        await expect(await apiTemplatesPage.table.documentStatus).toHaveText(TEMPLATES_STATUS.api);

    });
});
