import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";
import {CREATE_TEMPLATE, TEMPLATES_STATUS} from "../testData.js";

test.describe('Templates', () => {

  test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage, documentsPage}) => {

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
});
