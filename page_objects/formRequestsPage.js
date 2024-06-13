import FormRequestsCreatePage from '../page_objects/formRequestsCreatePage.js'
import FormRequestsEditPage from "../page_objects/formRequestsEditPage.js";

class FormRequestsPage {
  constructor (page) {
    this.page = page
  }

    locators = {
        getFormsLink: () => this.page.getByRole('link', { name: 'Forms',  exact: true}),
        getCreatFormBtn: () => this.page.getByRole('button', { name: 'Create Form', exect: true }).first(),
        getOptionsDropdown: () => this.page.locator('.documents__optionsDropdownTrigger').filter({ hasText: 'Options' }).first(),
        getEditDropdownAndGoFormRequestsEditPage: () => this.page.locator('.documents__dropdownOption').filter({ hasText: 'Edit' }),
        getFirstFormTitle: () => this.page.locator('.table__column.table__column--text').nth(1),
        getDocSavedToasterMessage: () => this.page.locator('.Toastify__toast-body').nth(0),
        getFormSavedToasterMessage: () => this.page.locator('.Toastify__toast-body').nth(1),
        getDeleteBtn: () => this.page.getByRole('button', { name: 'Delete' }),
        getYesDeleteModalWindowBtn: () => this.page.getByRole('button', { name: 'Yes, Delete' }),
        getCheckBoxOfForm: () => this.page.locator('.uiCheckbox__inner'),
    }  

  async clickFormsLink () {
      await this.locators.getFormsLink().click();

      return this;
  }
  async clickCreatFormBtnAndGoReguestsCreatePage () {
      await this.locators.getCreatFormBtn().click();

      return new FormRequestsCreatePage(this.page);
  }
  async clickOptionsDropdown() {
      await this.locators.getOptionsDropdown().click();

    return this;
  }
  async clickEditDropdownAndGoFormRequestsEditPage() {
      await this.locators.getEditDropdownAndGoFormRequestsEditPage().click();

      return new FormRequestsEditPage(this.page);
  }
    async clickDeleteBtn() {
        await this.locators.getDeleteBtn().click();

        return this;
    }
      async clickYesDeleteModalWindowBtn() {
          await this.locators.getYesDeleteModalWindowBtn().click();
        
    return this;
    }  
    async clickCheckBoxOfForm(i) {
        await this.locators.getCheckBoxOfForm().nth(i).click();

        return this;
    }
}
export default FormRequestsPage;
