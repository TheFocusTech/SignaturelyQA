import {step} from 'allure-js-commons';

export default class SuccessModal {
    constructor(page) {
        this.page = page;

        this.statusDocument = this.page.getByText('Save a copy of your document');
        this.backToDocumentsBtn = this.page.getByRole('button', { name: 'Back to Documents' });
        this.backToFormsBtn = this.page.getByRole('button', { name: 'Back to Forms' });
    }

    async clickBackToDocumentsBtn() {
        await step('Click on the "Back to Documents" button.', async () => {
            await this.statusDocument.waitFor({state: 'visible'});
            await new Promise(resolve => setTimeout(resolve, 1000));
            await this.backToDocumentsBtn.click();
        });
    }

    async clickBackToFormsBtn() {
     await this.backToFormsBtn.waitFor();
     await this.backToFormsBtn.click();
    }
}
