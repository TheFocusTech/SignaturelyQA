export default class FileUploaderComponent {
    constructor(page) {
        this.page = page;

        this.fileInput = this.page.locator('input[type = "file"]');
        this.progressBar = this.page.locator('.progress-bar');
    }

    async uploadFile(file) {
        await this.fileInput.setInputFiles(file);
    }

    async waitForVisibleProgressBar() {
        await this.progressBar.waitFor('visible');
    }

    async waitForHiddenProgressBar() {
        await this.progressBar.waitFor('hidden');
    }
}