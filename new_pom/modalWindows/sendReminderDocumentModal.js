import { step } from 'allure-js-commons';

export default class SendReminderDocumentModal {
    constructor(page) {
        this.page = page;

        this.signerCheckbox = this.page.locator('.uiCheckbox__inner').last();
        this.sendReminderBtn = this.page.getByRole('button', { name: 'Send Reminder' });
    }
    async clickSignerCheckbox() {
        await step(`Click the checkbox opposite the signer's details on the modal window`, async () => {
            await this.signerCheckbox.click();
        });
    }

    async clickSendReminderBtn() {
        await step(`Click the "Send Reminder" button on the modal window`, async () => {
            await this.sendReminderBtn.click();
        });
    }
}
