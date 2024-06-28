import CreateTemplateComponent from "../../components/createTemplateComponent";
import FileUploaderComponent from "../../components/fileUploaderComponent";

export default class EditTemplatesPage {

    constructor(page) {
        this.page = page;
        this.createTemplate = new CreateTemplateComponent(this.page);
        this.fileUploader = new FileUploaderComponent(this.page);
    }
}