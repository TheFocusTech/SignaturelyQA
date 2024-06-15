export default class PrepareForSignatureModal {
  constructor(page) {
    this.page = page;
    this.signDocumentRadioBtn = this.page.getByText('Sign a Document', { exact: true });
    this.signAndSendForSignatureRadioBtn = this.page.getByText('Sign & Send for Signature', { exact: true });
    this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
    this.gotItBtn = this.page.getByRole('button', { name: 'Got it' });
    this.signFieldsItem = this.page.locator('.interactModal__fieldBar-fieldItem-icon').first();
    this.addOtherSigners = this.page.getByText('Add signer', { exact: true });
    this.addOtherSignersNameField = this.page.getByText('Name', { exact: true });
    this.addOtherSignersEmailField = this.page.getByText('Email', { exact: true });

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

  async clickSignAndSendForSignatureRadioBtn() {
    await this.signAndSendForSignatureRadioBtn.click();
  }

  async clickAddOtherSignersBtn() {
    await this.addOtherSigners.click();
  }

  async fillkAddOtherSignersNameField(name) {
    await this.addOtherSignersNameField.fill(name)
  }

  async fillAddOtherSignersEmailField(email) {
    await this.addOtherSignersEmailField.fill(email)
  }




}