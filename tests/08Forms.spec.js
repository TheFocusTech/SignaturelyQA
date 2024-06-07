import { expect } from '@playwright/test'
import { test, loginBusinessUser, createForm } from '../fixtures/base.js'
import LoginPage from '../page_objects/loginPage.js'
import FormRequestsPage from '../page_objects/formRequestsPage.js'
import FormRequestsCreatePage from '../page_objects/formRequestsCreatePage.js'
import { FORM_NAME, OPTIONAL_MESSAGE_TEXT, FORM_NAME_EDIT, OPTIONAL_MESSAGE_TEXT_EDIT } from '../testData.js'
import FormRequestsEditPage from "../page_objects/formRequestsEditPage.js"

test.describe('Forms', () => {

  test('TC_08_33_01 | "Forms" - verify that user can edit form.', async ({ page, loginBusinessUser, createForm }) => {
    test.slow()
      const formRequestsPage = new FormRequestsPage(page);
      await formRequestsPage.clickOptionsDropdown();
      await formRequestsPage.locators.getEditDropdownAndGoFormRequestsEditPage().waitFor();
      const formRequestsEditPage = await formRequestsPage.clickEditDropdownAndGoFormRequestsEditPage();

      await formRequestsEditPage.fillFormNameInputField(FORM_NAME_EDIT);
      await formRequestsEditPage.fillOptionalMessageInputField(OPTIONAL_MESSAGE_TEXT_EDIT);

      await formRequestsEditPage.clickCancelBtn();
      await formRequestsEditPage.ToUploadFileSelector('testDocuments/openHouse.pdf');
      await formRequestsEditPage.locators.getProgressBar().waitFor({ state: 'hidden' });

      await formRequestsEditPage.clickFillTemplateBtn();
      await formRequestsEditPage.clickSignTab();
      await formRequestsEditPage.clickUploadedDocument();

      await formRequestsEditPage.clickSaveBtnAndGoFormRequestsPage();

      await expect(formRequestsPage.locators.getFormSavedToasterMessage()).toBeVisible();
      await expect(formRequestsPage.locators.getFirstFormTitle()).toHaveText(FORM_NAME_EDIT);

      await formRequestsPage.clickCheckBoxOfForm();
      await formRequestsPage.clickDeleteBtn();
      await formRequestsPage.clickYesDeleteModalWindowBtn();
     })
})
