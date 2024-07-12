import { step } from 'allure-js-commons';

export default class CancelSubscriptionModal {
    constructor(page) {
        this.page = page;

        this.cancelSubscriptionBtn = this.page.getByRole('button', { name: 'Cancel Subscription' });
    }

    async clickCancelSubscriptionButton() {
        await step('Click on "Cancel subscription" button in pop-up window.', async () => {
            await this.cancelSubscriptionBtn.click();
        });
    }
}
