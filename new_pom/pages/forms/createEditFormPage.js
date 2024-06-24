import FileUploaderComponent from "../../components/fileUploaderComponent";

export default class CreateEditFormPage {
    constructor(page) {
        this.page = page;
        this.fileUploader = new FileUploaderComponent(this.page);

        this.formNameField = this.page.getByPlaceholder('A form name to identify your');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.fillTemplateBtn = this.page.getByRole('button', { name: 'Fill Template' });
        this.cancelBtn = this.page.locator('.documentPreview__document-header-button-icon');
    }

    async fillFormNameField(name) {
            await this.formNameField.fill(name);
    }
    async fillOptionalMessageField(message) {
            await this.optionalMessageField.fill(message);
    }
    async clickFillTemplateBtn() {
        await this.fillTemplateBtn.waitFor();
        await this.fillTemplateBtn.click();
    }
    async clickCancelBtn() {
        await this.cancelBtn.click();
    }
}