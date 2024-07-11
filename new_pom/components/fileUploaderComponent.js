import { step } from 'allure-js-commons';
import { BULK_DOCUMENTS } from "../../testData";

export default class FileUploaderComponent {
    constructor(page) {
        this.page = page;

        this.fileInput = this.page.locator('input[type = "file"]');
        this.progressBar = this.page.locator('.progress-bar');
        this.deleteUploadedFileBtn = this.page.locator('button.button.cancel');
        this.uploadFileBtn = this.page.getByRole('button', { name: 'Upload File' });
    }

    async uploadFile(file) {
        await step('Upload file.', async () => {
            await this.uploadFileBtn.hover();
            await this.fileInput.setInputFiles(file);
            await this.progressBar.waitFor({ state: 'visible' });
            await this.progressBar.waitFor({ state: 'hidden' });
        });
    }

    async deleteUploadedFile() {
        await step('Delete uploaded file.', async () => {
            await this.deleteUploadedFileBtn.waitFor();
            await this.deleteUploadedFileBtn.hover();
            await this.deleteUploadedFileBtn.click({ force: true });
        })
    }

    async uploadCsvFile(file) {
        await step(`Upload the .csv file with ${BULK_DOCUMENTS.number} recipients.`, async () => {
            await this.fileInput.setInputFiles(file);
        });
    }
}
