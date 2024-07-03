import { step } from "allure-js-commons";

export default class UpgradeYourPlanAPIModal {
    constructor(page) {
        this.page = page;

        this.subscribeButton = this.page.getByRole('button', { name: "Subscribe" });
        this.downgradeBtn = this.page.getByRole('button', { name: 'Downgrade'})
    }

    async clickSubscribeButton() {
        await step('Click Subscribe button', async () => {
            await this.subscribeButton.click();
        });
    }
    async clickDowngradeBtn() {
        await step(`Click Downgrade button to downgrade the API plan`, async () => {
            await this.downgradeBtn.click();
        });
    }
}