import FileUploaderComponent from "../../components/fileUploaderComponent";
import {step} from 'allure-js-commons';

export default class UpdateFormPage {
    constructor(page) {
        this.page = page;
        this.fileUploader = new FileUploaderComponent(this.page);

        this.formNameField = this.page.getByPlaceholder('A form name to identify your');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.fillTemplateBtn = this.page.getByRole('button', { name: 'Fill Template' });
        this.deleteDocumentBtn = this.page.locator('.documentPreview__document-header-button-icon');
    }

    async fillFormNameField(name) {
        await step('Fill the Form name field in the Update Form window with the new name.', async () => {
            await this.formNameField.fill(name);
        })
    }
    async fillOptionalMessageField(message) {
        await step('Fill the Optional message field with the new description.', async () => {
            await this.optionalMessageField.fill(message);
        })
    }
    async clickFillTemplateBtn() {
        await step('Click the Fill template button.', async () => {
            await this.fillTemplateBtn.waitFor();
            await this.fillTemplateBtn.click();
        })
    }
    async clickDeleteDocumentBtn() {
        await step('Click the cross icon (X) next to the uploaded document to remove it.', async () => {
            await this.deleteDocumentBtn.click();
        })
    }
}
