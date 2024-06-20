import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";
import {CREATE_TEMPLATE} from "../testData.js";
import FileUploaderComponent from "../new_pom/components/fileUploaderComponent.js";

test.describe('Templates', () => {

  test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, templatePage}) => {

   await signPage.sideMenu.clickTemplates();
   await templatePage.sideMenuTemplates.clickCreateTemplate();
   await templatePage.createTemplate.fillTemplateNameField(CREATE_TEMPLATE.nameField);
   await templatePage.createTemplate.fillOptionalMessageField(CREATE_TEMPLATE.optionalMessage);
   await templatePage.createTemplate.fillCreateTemplateRolesField(CREATE_TEMPLATE.nameRole);
   const fileUploader = new FileUploaderComponent(templatePage.page);
   await fileUploader.uploadFile('testDocuments/CSV.csv');
   await templatePage.createTemplate.clickFillTemlateBtn();
   await prepareForSignatureModal.clickSignFieldsItem();
   await prepareForSignatureModal.doCanvasClicks();
   await prepareForSignatureModal.clickcreateBtn();
   await prepareForSignatureModal.clickbackToTempatesBtn();

  });
});
