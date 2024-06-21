import FileUploaderComponent from "../components/fileUploaderComponent";

export default class CreateFormPage {
    constructor(page) {
        this.page = page;
        this.fileUploader = new FileUploaderComponent(this.page);

        this.formNameField = this.page.getByPlaceholder('A form name to identify your');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.fillTemplateBtn = this.page.getByRole('button', { name: 'Fill Template' });
    }

    async fillFormNameField(name) {
        try {
            await this.formNameField.fill(name);
        } finally {

        }
    }

    async fillOptionalMessageField(message) {
        try {
            await this.optionalMessageField.fill(message);
            } finally {

        }
    }

    async clickFillTemplateBtn() {
        await this.fillTemplateBtn.waitFor();
        await this.fillTemplateBtn.click();
    }
}