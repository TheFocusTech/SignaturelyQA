import ToastComponent from "../components/toastComponent";

export default class FinalStepPage {
  constructor(page) {

    this.page = page;
    this.toast = new ToastComponent(this.page);

<<<<<<< HEAD
    this.documentTitleField = this.page.getByPlaceholder("Enter the title");
    this.signDocumentAndSendForSignatureBtn = this.page.getByRole("button", { name: "Sign Document and Send for Signature" });
    this.sendForSignatureBtn = this.page.getByRole("button", { name: "Send for Signature" });
=======
    this.toastComponent = new ToastComponent(this.page)
    this.documentTitleField = this.page.getByPlaceholder('Enter the title');
    this.signDocumentAndSendForSignatureBtn = this.page.getByRole('button', { name: 'Sign Document and Send for Signature' });
    this.sendForSignatureBtn = this.page.getByRole('button', { name: 'Send for Signature' }); 
    this.documentOptionalMessageField = this.page.getByPlaceholder('Add an optional message for the document signers.');
    this.signDocumentBtn = this.page.getByRole('button', { name: 'Sign Document' });
    
    }

>>>>>>> 5cd2d645e7833c3583e5c3e3346c7d97ed65bc02
  }

  async fillDocumentTitleField(title) {
    await this.documentTitleField.waitFor({ status: "visible" });
    await this.documentTitleField.fill(title);
  }

  async clickSignDocumentAndSendForSignatureBtn() {
    await this.signDocumentAndSendForSignatureBtn.click();
  }

       
  async clickSendForSignatureBtn() {
    await this.toast.waitForToastDocumentSaved();
    await this.sendForSignatureBtn.click();
  }
<<<<<<< HEAD
}
=======


    async fillDocumentOptionalMessageField(message) {
        await this.documentOptionalMessageField.fill(message);
    }

    async clickSignDocumentBtn() {
        await this.signDocumentBtn.click();
    }

}
>>>>>>> 5cd2d645e7833c3583e5c3e3346c7d97ed65bc02
