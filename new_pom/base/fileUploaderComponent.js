export default class FileUploader {
  constructor(page) {
    this.page = page;
    this.fileInput = this.page.locator('input[type = "file"]');

  }

  async uploadFile(file) {
    await this.fileInput.setInputFiles(file);
  }
}