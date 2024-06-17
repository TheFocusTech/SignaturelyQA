
export default class PrepareForSignatureModal {
  constructor(page) {
    this.page = page;

    this.signDocumentRadioBtn = this.page.getByText('Sign a Document', { exact: true });
    this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
    this.gotItBtn = this.page.getByRole('button', { name: 'Got it' });
    this.signFieldsItem = this.page.locator('.interactModal__fieldBar-fieldItem-icon').first();
    this.sendForSignatureRadioBtn = this.page.getByText('Send for Signature', { exact: true });
    this.addSignerBtn = this.page.getByText('Add signer', { exact: true });
    this.signerNameField = this.page.locator('//input[@placeholder="Name"]');
    this.signerEmailField = this.page.locator('//input[@placeholder="Email"]');
    this.signPlaceCanvas = this.page.locator('//div[@class="react-pdf__Page documentPage__inner-pdf_page"]');
    this.saveBtn = this.page.getByRole('button', { name: 'Save' });
    this.prepareForSignerTitle = this.page.getByText('Prepare for Signing');

  }

  async clickSignDocumentRadioBtn() {
    await this.signDocumentRadioBtn.click();
  }

  async clickContinueBtn() {
    await this.continueBtn.click();
  }

  async clickSignFieldsItem() {
    await this.signFieldsItem.click();
  }

  async clickGotItBtn() {
    await this.gotItBtn.click();
  }

  async clickSendForSignatureRadioBtn() {
    await this.sendForSignatureRadioBtn.click();
  }

  async clickAddSignerBtn() {
    await this.addSignerBtn.click();
  }

  async fillSignerNameField(name) {
    await this.signerNameField.fill(name);
  }

  async fillSignerEmailField(email) {
    await this.signerEmailField.fill(email);
  }

  async clickSignPlaceCanvas() {
    await this.signPlaceCanvas.click();
  }

  async clickSaveBtn() {
    await this.saveBtn.click();
  }

  

}