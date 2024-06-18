import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage } from "../fixtures/base.js";
// import SideMenuComponent from "../new_pom/components/sideMenuComponent.js";
// import SideMenuTemlatesComponent from "../new_pom/components/sideMenuTemplatesComponent.js";
// import NewTemplatesPage from "../new_pom/pages/documents/templatesPage.js";
// import {} from "../testData.js";
// import PrepareForSigningModal from "../new_pom/modalWindows/prepareforSigningModal.js";


test.describe('Templates', () => {

  test('TC_07_27_01 | Verify that user can create a template', async ({ createBusinessUserAndLogin, signPage, prepareForSigningModal}) => {

   await signPage.sideMenu.clickTemplates();
   await signPage.sideMenuTemplates.clickCreateTemplate();
   await signPage.formNewTemplate.fillTemplateNameField();
   await signPage.formNewTemplate.fillOptionalMessageField();
   await signPage.formNewTemplate.fillCreateTemplateRolesField();
   await signPage.uploadFile.uploadFile('testDocuments/CSV.csv');
   await signPage.formNewTemplate.clickfillTemlateBtn();
   await prepareForSigningModal.clickSignBtn();
   await prepareForSigningModal.performSignature(100, 100);
   await prepareForSigningModal.clickcreateBtn();
   await prepareForSigningModal.clickbackToTempatesBtn();

  });
});
