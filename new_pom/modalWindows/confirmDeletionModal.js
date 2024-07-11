import { step } from 'allure-js-commons';

export default class ConfirmDeletionModal {
    constructor(page) {
        this.page = page;

        this.yesDelete = this.page.getByRole('button', { name: 'Yes, Delete' });
    }

    async clickYesDelete() {
        await step('Click on "Yes, Delete" button', async () => {
            await this.yesDelete.waitFor();
            await this.yesDelete.click();
        });
    }
}