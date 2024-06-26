import {step} from 'allure-js-commons';

export default class DeleteMyAccountModal {
    constructor(page) {
        this.page = page;

        this.deleteMyAccountModalBtn = this.page.locator('.profile__modal-button--delete');
    }

    async clickDeleteMyAccountModalBtn() {
        await step('Click on the "Delete My Account" button.', async () => {
            await this.deleteMyAccountModalBtn.click();
        });
    }
}
