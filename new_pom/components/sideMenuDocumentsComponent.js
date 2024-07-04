import { step } from 'allure-js-commons';

export default class SideMenuDocumentsComponent {
    constructor(page) {
        this.page = page;

        this.trash = this.page.getByRole('link', { name: 'Trash' });
        this.awaitingSignature = this.page.getByRole('link', { name: 'Awaiting Signature' });
        this.draft = this.page.getByRole('link', { name: 'Draft' });
        this.completed = this.page.getByRole('link', { name: 'Completed' });
        this.voided = this.page.getByRole('link', { name: 'Voided' });
    }

    async clickTrash() {
        await this.trash.click();
    }

    async clickAwaitingSignature() {
        await step('Click the "Awaiting Signature" item on the left SideMenu', async () => {
            await this.awaitingSignature.click();
        });
    }

    async clickDraft() {
        await step('Click "Draft" submenu', async () => {
            await this.draft.click();
        });
    }

    async clickCompleted() {
        await step('Click "Completed" submenu', async () => {
            await this.completed.click();
        });
    }

    async clickVoided() {
        await step('Click "Voided" submenu', async () => {
            await this.voided.click();
        });
    }
}
