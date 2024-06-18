export default class FileUploaderComponent {
    constructor(page) {
        this.page = page;

        this.fileInput = this.page.locator('input[type = "file"]');
        this.progressBar = this.page.locator('.progress-bar');
    }

    async uploadFile(file) {
        await this.fileInput.setInputFiles(file);
        await this.progressBar.waitFor({ state: 'visible' });
        await this.progressBar.waitFor({ state: 'hidden' });
    }

}