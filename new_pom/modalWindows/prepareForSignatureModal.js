export default class PrepareForSignatureModal {
  constructor(page) {
    this.page = page;
    this.signDocumentRadioBtn = this.page.getByText('Sign a Document', { exact: true });
    this.signAndSendForSignatureRadioBtn = this.page.locator('div').filter({ hasText: /^Sign & Send for Signature$/ });
    this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
    this.gotItBtn = this.page.getByRole('button', { name: 'Got it' });
    this.signFieldsItem = this.page.locator('.interactModal__fieldBar-fieldItem-icon').first();
    this.addOtherSigners = this.page.getByText('Add signer');
    this.addOtherSignersName1Field = this.page.getByPlaceholder('Name');
    this.addOtherSignersEmail1Field = this.page.getByPlaceholder('Email');
    this.addOtherSignersName2Field = this.page.getByPlaceholder('Name', { exact: true }).nth(1);
    this.addOtherSignersEmail2Field = this.page.getByPlaceholder('Email', { exact: true }).nth(1);
    this.customSigningOrderCheckbox = this.page.locator('.uiCheckbox__inner');
    this.customSigningOrderPositionNumberOne = this.page.locator('span.signers__item-order-position').first();
    this.customSigningOrderPositionNumberTwo = this.page.locator('span.signers__item-order-position').last();
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

  async fillkAddOtherSignersName1Field(name) {
    await this.addOtherSignersName1Field.fill(name)
  }

  async fillAddOtherSignersEmail1Field(email) {
    await this.addOtherSignersEmail1Field.fill(email)
  }

  async fillkAddOtherSignersName2Field(name) {
    await this.addOtherSignersName2Field.fill(name)
  }

  async fillAddOtherSignersEmail2Field(email) {
    await this.addOtherSignersEmail2Field.fill(email)
  }

  async clickCustomSigningOrderCheckbox() {
    await this.customSigningOrderCheckbox.click();
  }
}