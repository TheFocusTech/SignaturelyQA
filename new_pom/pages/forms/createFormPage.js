import CreateUpdateFormComponent from "../../components/createUpdateFormComponent";
import TableComponent from "../../components/tableComponent";
import ToastComponent from "../../components/toastComponent";
import FileUploaderComponent from "../../components/fileUploaderComponent";

export default class CreateFormPage {
    constructor(page) {
        this.page = page;

        this.createUpdateForm = new CreateUpdateFormComponent(this.page)
        this.fileUploader = new FileUploaderComponent(this.page);
        this.table = new TableComponent(this.page); 
        this.toast = new ToastComponent(this.page);
    }
    
}
