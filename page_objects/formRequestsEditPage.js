import FormRequestsPage from "./formRequestsCreatePage";

class FormRequestsEditPage {
    constructor(page) {
        this.page = page
    }

    locators = {
        getFormNameInputField: () => this.page.getByPlaceholder('A form name to identify your form.'),
        getOptionalMessageInputField: () => this.page.getByPlaceholder('Add an optional message for all future documents created using this form.'),
        getToUploadFileSelector: () => this.page.locator('input[type="file"]'),
        getFillTemplateBtn: () => this.page.locator('.button.button--primary').filter({ hasText: 'Fill Template' }),
        getProgressBar: () => this.page.locator('.progress-bar'),
        getSignTab: () => this.page.locator('div .interactModal__fieldBar-fieldItem').filter({ hasText: 'Sign' }),
        getInitialTab: () => this.page.locator('div .interactModal__fieldBar-fieldItem').filter({ hasText: 'Initial' }),
        getDateTab: () => this.page.locator('div .interactModal__fieldBar-fieldItem').filter({ hasText: 'Date' }),
        getUploadedDocument: () => this.page.locator('.react-pdf__Page__canvas').first(),
        getCancelBtn: () => this.page.locator('.documentPreview__document-header-button-icon'),
        getSaveBtnAndGoFormRequestsPage: () => this.page.getByRole('button', { name: 'Save' }),
        getModulWindowFormSaved: () => this.page.getByRole('heading', { name: "Form Saved"})

    }

    async fillFormNameInputField(form_name) {
        await this.locators.getFormNameInputField().fill(form_name);

        return this;
    }
    async fillOptionalMessageInputField(message) {
        await this.locators.getOptionalMessageInputField().fill(message);

        return this;
    }
    async clickCancelBtn() {
        await this.locators.getCancelBtn().click();

        return this;
    }

    async clickUploadFileBtn() {
        await this.locators.getUploadFileBtn().focus();

        return this;
    }
    async ToUploadFileSelector(file) {
        await this.locators.getToUploadFileSelector().setInputFiles(file);

        return this;
    }
    async clickFillTemplateBtn() {
        await this.locators.getFillTemplateBtn().click();

        return this.page;
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
    async clickSaveBtnAndGoFormRequestsPage() {
        await this.locators.getSaveBtnAndGoFormRequestsPage().click()

        return new FormRequestsPage(this.page)
    }
}
export default FormRequestsEditPage;
