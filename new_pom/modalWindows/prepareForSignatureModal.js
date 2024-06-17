export default class PrepareForSignatureModal {
  constructor(page) {
    this.page = page;

    this.signDocumentRadioBtn = this.page.getByText('Sign a Document', { exact: true });
    this.signAndSendForSignatureRadioBtn = this.page.getByText('Sign & Send for Signature', { exact: true });
    this.addSigner = this.page.getByText('Add signer');
    this.addSignersName1Field = this.page.getByPlaceholder('Name');
    this.addSignersEmail1Field = this.page.getByPlaceholder('Email');
    this.addSignersName2Field = this.page.getByPlaceholder('Name', { exact: true }).nth(1);
    this.addSignersEmail2Field = this.page.getByPlaceholder('Email', { exact: true }).nth(1);
    this.customSigningOrderCheckbox = this.page.locator('.uiCheckbox__inner');
    this.customSigningOrderPositionNumberOne = this.page.locator('span.signers__item-order-position').first();
    this.customSigningOrderPositionNumberTwo = this.page.locator('span.signers__item-order-position').last();
    this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
    this.gotItBtn = this.page.getByRole('button', { name: 'Got it' });
    this.signFieldsItem = this.page.locator('.interactModal__fieldBar-fieldItem-icon').first();
    this.sendForSignatureRadioBtn = this.page.getByText('Send for Signature', { exact: true });
    this.addSignerBtn = this.page.getByText('Add signer', { exact: true });
    this.signerNameField = this.page.locator('//input[@placeholder="Name"]');
    this.signerEmailField = this.page.locator('//input[@placeholder="Email"]');
    this.signPlaceCanvas = this.page.locator('//div[@class="react-pdf__Page documentPage__inner-pdf_page"]');
    this.saveBtn = this.page.getByRole('button', { name: 'Save' });

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

  async clickAddSignerBtn() {
    await this.addSigner.click();
  }

  async fillAddSignersName1Field(name) {
    await this.addSignersName1Field.fill(name)
  }

  async fillAddSignersEmail1Field(email) {
    await this.addSignersEmail1Field.fill(email)
  }

  async fillAddSignersName2Field(name) {
    await this.addSignersName2Field.fill(name)
  }

  async fillAddSignersEmail2Field(email) {
    await this.addSignersEmail2Field.fill(email)
  }

  async clickCustomSigningOrderCheckbox() {
    await this.customSigningOrderCheckbox.click();
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