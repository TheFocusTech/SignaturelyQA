import { step } from 'allure-js-commons';

export default class DeclineModal {
    constructor(page) {
        this.page = page;
        this.declineBtn = this.page.getByRole('button', { name: 'Decline' });
    }

    async clickDeclineBtn() {
        await step('Click on the "Decline" button to decline the signing request', async () => {
            await this.declineBtn.waitFor({ state: 'visible' });
            await this.declineBtn.click();
        });
    }
}
