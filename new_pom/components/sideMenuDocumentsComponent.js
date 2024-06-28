import { step } from "allure-js-commons";
export default class SideMenuDocumentsComponent {
    constructor(page) {
        this.page = page;

        this.trash = this.page.getByRole('link', { name: 'Trash' });
        this.awaitingSignature = this.page.getByRole('link', {name: 'Awaiting Signature'});
        this.draft = this.page.getByRole('link', { name: 'Draft' });

    }

    async clickTrash() {
        await this.trash.click();
    }

    async clickAwaitingSignature() {
        await this.awaitingSignature.click();
    }

    async clickDraft() {
        await step('Click "Draft" submenu', async () => {
            await this.draft.click();
        })
    }
}