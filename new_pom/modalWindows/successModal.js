import { step } from 'allure-js-commons';

export default class SuccessModal {
    constructor(page) {
        this.page = page;

        this.statusDocument = this.page.getByText('Save a copy of your document');
        this.backToDocumentsBtn = this.page.getByRole('button', { name: 'Back to Documents' });
        this.backToFormsBtn = this.page.getByRole('button', { name: 'Back to Forms' });
        this.okBtn = this.page.getByRole('button', { name: 'Ok' });
        this.title = this.page.locator('.successSendModal__title');
        this.returnToDocumentsBtn = this.page.getByRole('button', { name: 'Return to Documents' });
        this.backToTempatesBtn = this.page.getByRole('button', { name: 'Back to Templates' });
    }

    async clickBackToDocumentsBtn() {
        await step('Click on "Back to Documents" button.', async () => {
            await this.statusDocument.waitFor({ state: 'visible' });
            await this.backToDocumentsBtn.click();
        });
    }

    async clickBackToFormsBtn() {
        await step('Click on "Back to Forms" button.', async () => {
            await this.backToFormsBtn.click();
        });
    }

    async clickOkBtn() {
        await step('Click on "Ok" button.', async () => {
            await this.okBtn.click();
        });
    }

    async clickReturnToDocumentsBtn() {
        await step('Click on "Return to Documents" button', async () => {
            await this.returnToDocumentsBtn.waitFor({ state: 'visible' });
            await this.returnToDocumentsBtn.click();
        });
    }

    async clickBackToTemplatesBtn() {
        await step('Click on "Back to templates" button.', async () => {
            await this.backToTempatesBtn.click();
        });
    }
}
