import ToastComponent from '../components/toastComponent';
import { step } from 'allure-js-commons';
import CalendarComponent from "../components/calendarComponent";

export default class FinalStepPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);
        this.expirationDateCalendar = new CalendarComponent(this.page);

        this.documentTitleField = this.page.getByPlaceholder('Enter the title');
        this.signDocumentAndSendForSignatureBtn = this.page.getByRole('button', {
            name: 'Sign Document and Send for Signature',
        });
        this.sendForSignatureBtn = this.page.getByRole('button', { name: 'Send for Signature' });
        this.documentOptionalMessageField = this.page.getByPlaceholder(
            'Add an optional message for the document signers.'
        );
        this.signDocumentBtn = this.page.getByRole('button', { name: 'Sign Document' });
    }

    async fillDocumentTitleField(title) {
        await step('Fill in the document title.', async () => {
            await this.documentTitleField.waitFor({ status: 'visible' });
            await this.documentTitleField.fill(title);
        });
    }

    async clickSignDocumentAndSendForSignatureBtn() {
        await step('Click on the "Sign Document and Send for Signature" button.', async () => {
            await this.signDocumentAndSendForSignatureBtn.click();
        });
    }

    async waitAndClickSendForSignatureBtn(text) {
        await step('Click on the "Send for Signature" button.', async () => {
            await this.toast.waitForToastIsHiddenByText(text);
            await this.sendForSignatureBtn.click();
        });
    }

    async fillDocumentOptionalMessageField(message) {
        await step('Fill in the document Optional Message.', async () => {
            await this.documentOptionalMessageField.fill(message);
        });
    }

    async clickSignDocumentBtn() {
        await this.signDocumentBtn.click();
    }
}
