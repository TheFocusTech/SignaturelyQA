import ToastComponent from "../components/toastComponent";
import { test } from "../../fixtures/base"; 

export default class FinalStepPage {
    constructor(page) {

        this.page = page;
        this.toast = new ToastComponent(this.page);

        this.documentTitleField = this.page.getByPlaceholder("Enter the title");
        this.signDocumentAndSendForSignatureBtn = this.page.getByRole("button", { name: "Sign Document and Send for Signature" });
        this.sendForSignatureBtn = this.page.getByRole("button", { name: "Send for Signature" });
        this.documentOptionalMessageField = this.page.getByPlaceholder('Add an optional message for the document signers.');
        this.signDocumentBtn = this.page.getByRole('button', { name: 'Sign Document' });

    }

    async fillDocumentTitleField(title) {
        await test.step('Fill in the document title.', async () => {
            await this.documentTitleField.waitFor({ status: "visible" });
            await this.documentTitleField.fill(title);
        });
    }

    async clickSignDocumentAndSendForSignatureBtn() {
        await test.step('Click on the "Sign Document and Send for Signature" button.', async () => {
            await this.signDocumentAndSendForSignatureBtn.click();
        });
    }

    async waitAndClickSendForSignatureBtn() {
        await this.toast.waitForToastCompleted();
        await this.sendForSignatureBtn.click();
    }

    async fillDocumentOptionalMessageField(message) {
        await this.documentOptionalMessageField.fill(message);
    }

    async clickSignDocumentBtn() {
        await this.signDocumentBtn.click();
    }

    async clickSendForSignatureBtn() {
        await this.sendForSignatureBtn.click();
    }

}
