export default class SuccessModal {
  constructor(page) {
    this.page = page;

    this.backToDocumentsBtn = this.page.getByRole('button', {name: 'Back to Documents'});
  }

  async clickBackToDocumentsBtn() {
    await this.backToDocumentsBtn.click();
  }


}