import FileUploader from "../base/fileUploaderComponent";

export default class UploadFileTab {
  constructor(page) {

    this.page = page;
    this.fileUploader = new FileUploader(this.page);

  }
}