import TableComponent from "../components/tableComponent";
import ToastComponent from "../components/toastComponent";

export default class FinalStepPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.documentTitleField = this.page.getByPlaceholder('Enter the title');
        this.signDocumentAndSendForSignatureBtn = this.page.getByRole('button', { name: 'Sign Document and Send for Signature' });
        this.sendForSignatureBtn = this.page.getByRole('button', {name: 'Send for Signature'});
    }

    async fillDocumentTitleField(title) {
        await this.documentTitleField.waitFor({ status: 'visible' });
        await this.documentTitleField.fill(title);
    }

    async clickSignDocumentAndSendForSignatureBtn() {
        await this.signDocumentAndSendForSignatureBtn.click();
    }

    async clickSendForSignatureBtn() {
        await this.sendForSignatureBtn.click();
    }

}