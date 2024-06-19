import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";




test.describe('Templates', () => {

  test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage}) => {

   await signPage.sideMenu.clickTemplates();
   await templatePage.sideMenuTemplates.clickCreateTemplate();
   await templatePage.formNewTemplate.fillTemplateNameField();
   await templatePage.formNewTemplate.fillOptionalMessageField();
   await templatePage.formNewTemplate.fillCreateTemplateRolesField();
   await signPage.uploadFile.fileUploader.uploadFile('testDocuments/CSV.csv');
   await templatePage.formNewTemplate.clickfillTemlateBtn();
   await prepareForSignatureModal.clickSignBtn();
   await prepareForSignatureModal.performSignature(100, 100);
   await prepareForSignatureModal.clickcreateBtn();
   await prepareForSignatureModal.clickbackToTempatesBtn();

  });
});
