
export default class PrepareForSignatureModal {
  constructor(page) {
    this.page = page;

        this.signDocumentRadioBtn = this.page.getByText('Sign a Document', { exact: true });
        this.sendForSignatureRadioBtn = this.page.getByText('Send for Signature', { exact: true });
        this.addSignerBtn = this.page.getByText('Add signer', { exact: true });
        this.signerNameField = this.page.locator('//input[@placeholder="Name"]');
        this.signerEmailField = this.page.locator('//input[@placeholder="Email"]');
        this.addRecipientsBtn = this.page.getByText('Recipients', { exact: true });
        this.recipientEmailField = this.page.locator('//input[@placeholder="test@signaturely.com"]');        
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
        this.gotItBtn = this.page.getByRole('button', { name: 'Got it' });
        this.signFieldsItem = this.page.getByRole('complementary').getByText('Sign')
        this.signPlaceCanvas = this.page.locator('.interactModal__documentView');
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

    async clickSendForSignatureRadioBtn(){
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

    async clickAddRecipientsBtn() {
        await this.addRecipientsBtn.click();
    }

    async fillRecipientEmailField(email) {
        await this.recipientEmailField.fill(email);
    }

    async clickSignPlaceCanvas() {
      await this.signPlaceCanvas.click();
    }

    async clickSaveBtn() {
        await this.saveBtn.click();
      }

}