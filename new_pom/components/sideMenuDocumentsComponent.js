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
        await step('Click on "Trash" item in the Documents SideMenu', async () => {
            await this.trash.click();
        });
    }

    async clickAwaitingSignature() {
        await step('Click on "Awaiting Signature" item in the Documents submenu', async () => {
            await this.awaitingSignature.click();
        });
    }

    async clickDraft() {
        await step('Click on "Draft" item in the Documents submenu', async () => {
            await this.draft.click();
        });
    }

    async clickCompleted() {
        await step('Click on "Completed" item in the Documents submenu', async () => {
            await this.completed.click();
        });
    }

    async clickVoided() {
        await step('Click on "Voided" item in the Documents submenu', async () => {
            await this.voided.click();
        });
    }
}
