export default class FinelStepPage {
    constructor(page) {
        this.page = page;

        this.documentTitleField = this.page.getByPlaceholder('Enter the title');
        this.signDocumentAndSendForSignatureBtn = this.page.getByRole('button', { name: 'Sign Document and Send for Signature' });
    }

    async fillDocumentTitleField(title) {
        await this.documentTitleField.waitFor({ status: 'visible' });
        await this.documentTitleField.fill(title);
    }

    async clickSignDocumentAndSendForSignatureBtn() {
        await this.signDocumentAndSendForSignatureBtn.click();
    }

}