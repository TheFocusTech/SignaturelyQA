export default class FileUploaderComponent {
    constructor(page) {
        this.page = page;

        this.fileInput = this.page.locator('input[type = "file"]');
        this.progressBar = this.page.locator('.progress-bar');
        this.prepareDocumentBtn = this.page.getByRole('button', { name: 'Prepare Document' });
    }

    
    async uploadFile(file) {
        await this.fileInput.setInputFiles(file);
        await this.progressBar.waitFor('visible');
        await this.progressBar.waitFor('hidden');
    }

    async clickPrepareDocumentBtn() {
        await this.prepareDocumentBtn.waitFor();
        await this.prepareDocumentBtn.click();
      }
}