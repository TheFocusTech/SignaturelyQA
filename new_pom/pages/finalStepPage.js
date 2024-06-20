export default class FinalStepPage {
    constructor(page) {
        this.page = page;

        this.documentTitleField = this.page.getByPlaceholder('Enter the title');
        this.signDocumentAndSendForSignatureBtn = this.page.getByRole('button', { name: 'Sign Document and Send for Signature' });
        this.documentOptionalMessageField = this.page.getByPlaceholder('Add an optional message for the document signers.');
        this.signDocumentBtn = this.page.getByRole('button', { name: 'Sign Document' });
    }

    async fillDocumentTitleField(title) {
        await this.documentTitleField.waitFor({ status: 'visible' });
        await this.documentTitleField.fill(title);
    }

    async clickSignDocumentAndSendForSignatureBtn() {
        await this.signDocumentAndSendForSignatureBtn.click();
    }

    async fillDocumentOptionalMessageField(message) {
        await this.documentOptionalMessageField.fill(message);
    }

    async clickSignDocumentBtn() {
        await this.signDocumentBtn.click();
    }

}