import { step } from 'allure-js-commons';

export default class SuccessModal {
    constructor(page) {
        this.page = page;

        this.statusDocument = this.page.getByText('Save a copy of your document');
        this.backToDocumentsBtn = this.page.getByRole('button', { name: 'Back to Documents' });
        this.backToFormsBtn = this.page.getByRole('button', { name: 'Back to Forms' });
        this.okBtn = this.page.getByRole('button', { name: 'Ok' });
    }

    async clickBackToDocumentsBtn() {
        await step('Click on the "Back to Documents" button.', async () => {
            await this.statusDocument.waitFor({state: 'visible'});
            await this.backToDocumentsBtn.click();
        });
    }

    async clickBackToFormsBtn() {
        await step('Click on the "Back to Forms" button.', async () => {
        await this.backToFormsBtn.click();
        });
    }

    async clickOkBtn() {
        await step('Click on the "Ok" button.', async () => {
        await this.okBtn.click();
        });
    }
}
