import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";
import { CREATE_TEMPLATE, TEMPLATES_STATUS, EDIT_TEMPLATE_DATA } from "../testData.js";
import { createTemplate } from "../helpers/preconditions.js";

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
        prepareForSignatureModal }) => { 
        test.slow();

        // await allure.description('To verify the process of moving a document into a folder.');
        // await allure.tags('Move_to_folder');
        // await allure.severity(Severity.CRITICAL);
        // await allure.link(
        //     "Documentation",
        //     "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ylpnl5bdm86k",
        //     "TC_05_18_01"
        // );
        // await allure.epic('Documents (typed)');

        await createTemplate(
            signPage,
            templatePage,
            prepareForSignatureModal);
        
        await signPage.sideMenu.clickTemplates();
        await templatePage.table.clickOptionsBtn(0);
        await templatePage.table.clickEditBtn();
        await templatePage.createTemplate.fillTemplateNameField(EDIT_TEMPLATE_DATA.nameField);
        await templatePage.createTemplate.fillOptionalMessageField(EDIT_TEMPLATE_DATA.optionalMessage);
        await templatePage.createTemplate.fillCreateTemplateRolesField(EDIT_TEMPLATE_DATA.nameRole);
        await templatePage.createTemplate.deleteUploadedFile();
        await templatePage.createTemplate.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        await templatePage.createTemplate.clickFillTemplateBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickCreateBtn();
        await prepareForSignatureModal.clickBackToTemplatesBtn();
        
    });
});
