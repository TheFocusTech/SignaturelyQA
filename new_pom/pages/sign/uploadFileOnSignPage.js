import FileUploaderComponent from "../../components/fileUploaderComponent";
import { test } from "../../../fixtures/base"; 

export default class UploadFileOnSignPage {
    constructor(page) {

        this.page = page;
        this.fileUploader = new FileUploaderComponent(this.page);

        this.prepareDocumentBtn = this.page.getByRole('button', { name: 'Prepare Document' });

    }

    async clickPrepareDocumentBtn() {
        await test.step('Click on the "Prepare Document" button', async () => {
            await this.prepareDocumentBtn.waitFor();
            await this.prepareDocumentBtn.click();
        });
    }
}