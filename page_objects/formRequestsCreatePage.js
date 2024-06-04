import FormRequestsPage from './formRequestsCreatePage.js'

class FormRequestsCreatePage {
  constructor(page) {
    this.page = page
  }

  locators = {
    getFormNameInputField: () => this.page.getByPlaceholder('A form name to identify your form.'),
    getOptionalMessageInputField: () => this.page.getByPlaceholder('Add an optional message for all future documents created using this form.'),
    getUploadFileBtn: () => this.page.getByRole('button', { name: 'Upload File', exect: true }),
    getToUploadFileSelector: () => this.page.locator('input[type="file"]'),
    getFillTemplateBtn: () => this.page.getByRole('button', { name: 'Fill Template' }),
    getProgressBar: () => this.page.locator('.progress-bar'),
    getSignTab: () => this.page.getByRole('listitem').filter({ hasText: 'Sign' }),
    getInitialTab: () => this.page.locator('div .interactModal__fieldBar-fieldItem').filter({ hasText: 'Initial' }),
    getDateTab: () => this.page.locator('div .interactModal__fieldBar-fieldItem').filter({ hasText: 'Date' }),
    getUploadedDocument: () => this.page.locator('.react-pdf__Page__canvas').first(),
    getCreateBtn: () => this.page.getByRole('button', { name: 'Create' }),
    getBacktoFormsBtnAndGoFormRequestsPage: () => this.page.getByRole('button', { name: 'Back to Forms' })
  }

  async fillFormNameInputField(form_name) {
    await this.locators.getFormNameInputField().fill(form_name);

    return this;
  }
  async fillOptionalMessageInputField(message) {
    await this.locators.getOptionalMessageInputField().fill(message);

    return this;
  }
  async ToUploadFileSelector(file) {
    await this.locators.getToUploadFileSelector().setInputFiles(file);

    return this;
  }
  async clickFillTemplateBtn() {
    await this.locators.getFillTemplateBtn().click();

    return new FormRequestsCreatePage(this.page);
  }
  async clickSignTab() {
    await this.locators.getSignTab().click();

    return this;
  }
  async clickInitialTab() {
    await this.locators.getInitialTab().click();

    return this;
  }
  async clickDateTab() {
    await this.locators.getDateTab().click();

    return this;
  }
  async clickUploadedDocument() {
    await this.locators.getUploadedDocument().click();

    return this;
  }
  async clickCreateBtn() {
    await this.locators.getCreateBtn().click();

    return this;
  }
  async clickBacktoFormsBtnAndGoFormRequestsPage() {
    await this.locators.getBacktoFormsBtnAndGoFormRequestsPage().click();

    return new FormRequestsPage(this.page);
  }
}
export default FormRequestsCreatePage;
