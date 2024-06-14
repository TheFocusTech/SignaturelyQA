import FileUploaderComponent from "../../components/fileUploaderComponent";

export default class UploadFileOnSignPage {
  constructor(page) {

    this.page = page;
    this.fileUploader = new FileUploaderComponent(this.page);

    this.prepareDocumentBtn = this.page.getByRole('button', { name: 'Prepare Document' });

  }

  async clickPrepareDocumentBtn() {
    await this.prepareDocumentBtn.click();
  }
}