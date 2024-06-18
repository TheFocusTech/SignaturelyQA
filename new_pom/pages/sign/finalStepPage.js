import SuccessModal from "../../modalWindows/successModal";


export default class FinalStepPage {
  constructor(page) {
    this.page = page;

    this.successModal = new SuccessModal(this.page);

    this.sendForSignatureBtn = this.page.getByRole('button', {name: 'Send for Signature'});

  }

  async clickSendForSignatureBtn() {
    await this.sendForSignatureBtn.click();
  }


}