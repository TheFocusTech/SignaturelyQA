import { step } from 'allure-js-commons';

export default class SideMenuDocumentsComponent {
    constructor(page) {
        this.page = page;

        this.trash = this.page.getByRole('link', { name: 'Trash' });
        this.awaitingSignature = this.page.getByRole('link', { name: 'Awaiting Signature' });
    }

    async clickTrash() {
        await this.trash.click();
    }

    async clickAwaitingSignature() {
        await step('Click the "Awaiting Signature" item on the left SideMenu', async () => {
            await this.awaitingSignature.click();
        });
    }
}
