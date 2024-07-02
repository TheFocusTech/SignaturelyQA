import CreateUpdateFormComponent from "../../components/createUpdateFormComponent";
import FileUploaderComponent from "../../components/fileUploaderComponent";
import TableComponent from "../../components/tableComponent";
import ToastComponent from "../../components/toastComponent";
import { step } from "allure-js-commons";

export default class UpdateFormPage {
    constructor(page) {
        this.page = page;

        this.createUpdateForm = new CreateUpdateFormComponent(this.page)
        this.fileUploader = new FileUploaderComponent(this.page);
        this.table = new TableComponent(this.page);
        this.toast = new ToastComponent(this.page);
        
        this.deleteDocumentBtn = this.page.getByRole('button').locator('.button.cancel')
    }
    
    async clickDeleteDocumentBtn() {
        await step('Click the cross icon (X) next to the uploaded document to remove it.', async () => {
            await this.deleteDocumentBtn.click();
        })
    }
}
