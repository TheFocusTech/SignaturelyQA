export default class SuccessModal {
    constructor(page) {
        this.page = page;

        this.statusDocument = this.page.getByText('Save a copy of your document');
        this.backToDocumentsBtn = this.page.getByRole('button', { name: 'Back to Documents' });
        this.backToFormsBtn = this.page.getByRole('button', { name: 'Back to Forms' });
    }

    async clickBackToDocumentsBtn() {
      await this.statusDocument.waitFor({state: 'visible'});
      await this.backToDocumentsBtn.click();
    }

    async clickBackToFormsBtn() {
      await this.backToFormsBtn.click();
    }
}
