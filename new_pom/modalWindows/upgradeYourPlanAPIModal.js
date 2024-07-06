import { step } from "allure-js-commons";

export default class UpgradeYourPlanAPIModal {
    constructor(page) {
        this.page = page;

        this.subscribeButton = this.page.getByRole('button', { name: "Subscribe" });
    }

    async clickSubscribeButton() {
        await step('Click Subscribe button', async () => {
            await this.subscribeButton.click();
        });
    }
}