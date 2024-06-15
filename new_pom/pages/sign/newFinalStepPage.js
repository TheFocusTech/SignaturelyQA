
import NewDocumentsPage from "../documents/newDocumentsPage";

export default class NewFinalStepPage {
  constructor(page) {
    this.page = page;

    this.toastDocumentSaved = this.page.getByText('Document successfully saved!', { exact: true });
    this.sendForSignatureBtn = this.page.getByRole('button', {name: 'Send for Signature'});
    this.successSendModal = this.page.getByText('Save a copy of your document');
    this.backToDocumentBtn = this.page.getByRole('button', {name: 'Back to Documents  '})

  }

  async waitForToastDocumentSavedVisible() {
    await this.toastDocumentSaved.waitFor('visible');
  }
  async waitForToastDocumentSavedHidden() {
    await this.toastDocumentSaved.waitFor({ state: 'hidden' });
  }

  async clickSendForSignatureBtn() {
    await this.sendForSignatureBtn.click();
  }

  async waitForSuccessSendModalVisible() {
    await this.successSendModal.waitFor({ status: 'attached' });
  }

  async clickBackToDocumentBtn() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.backToDocumentBtn.click();

    return new NewDocumentsPage(this.page);

  }

}