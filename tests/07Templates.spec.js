import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";

import {CREATE_TEMPLATE} from "../testData.js";




test.describe('Templates', () => {

  test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage}) => {

   await signPage.sideMenu.clickTemplates();
   await templatePage.sideMenuTemplates.clickCreateTemplate();
   await templatePage.createNewTemplate.fillTemplateNameField(CREATE_TEMPLATE.nameField);
   await templatePage.createNewTemplate.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
   await templatePage.createNewTemplate.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
   await signPage.uploadFile.fileUploader.uploadFile('testDocuments/CSV.csv');
   await templatePage.createNewTemplate.clickfillTemlateBtn();
   await prepareForSignatureModal.clickSignFieldsItem();
   await prepareForSignatureModal.doCanvasClicks();
   await prepareForSignatureModal.clickcreateBtn();
   await prepareForSignatureModal.clickbackToTempatesBtn();

  });
});
