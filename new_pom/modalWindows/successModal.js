export default class SuccessModal {
    constructor(page) {
        this.page = page;

        this.statusDocument = this.page.getByText('Save a copy of your document');
        this.backToDocumentsBtn = this.page.getByRole('button', { name: 'Back to Documents' });
    }

    async clickBackToDocumentsBtn() {
      await this.statusDocument.waitFor({state: 'visible'});
      await this.backToDocumentsBtn.click();
  }

}
