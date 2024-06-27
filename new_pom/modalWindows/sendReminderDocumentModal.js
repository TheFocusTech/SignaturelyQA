export default class SendReminderDocumentModal {
  constructor(page) {
      this.page = page;

      this.signerCheckbox = this.page.locator('.uiCheckbox__inner').last();
      this.sendReminderBtn = this.page.getByRole('button', {name: 'Send Reminder'});
  }
  async clickSignerCheckbox() {
    await this.signerCheckbox.click();
}

  async clickSendReminderBtn() {
    await this.sendReminderBtn.click();
}

}