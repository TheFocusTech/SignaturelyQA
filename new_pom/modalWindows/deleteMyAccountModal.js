import {step} from 'allure-js-commons';

export default class DeleteMyAccountModal {
    constructor(page) {
        this.page = page;

        this.deleteMyAccountModal = this.page.locator('.profile__modal-button--delete');
    }

    async clickDeleteMyAccountModal() {
        await step('Click on the "Delete My Account" button.', async () => {
            await this.deleteMyAccountModal.click();
        });
    }
}






