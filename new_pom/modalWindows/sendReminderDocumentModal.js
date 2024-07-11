import { step } from 'allure-js-commons';

export default class SendReminderDocumentModal {
    constructor(page) {
        this.page = page;

        this.signerCheckbox = this.page.locator('.uiCheckbox__inner').last();
        this.sendReminderBtn = this.page.getByRole('button', { name: 'Send Reminder' });
    }

    async clickSignerCheckbox() {
        await step("Click on the checkbox next to the signer's email", async () => {
            await this.signerCheckbox.click();
        });
    }

    async clickSendReminderBtn() {
        await step(`Click on "Send Reminder" button`, async () => {
            await this.sendReminderBtn.click();
        });
    }
}
