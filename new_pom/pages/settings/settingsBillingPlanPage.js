import { getRandomInt } from "../../../helpers/utils.js"
import { PLANS } from "../../../testData.js"

export default class NewSettingsBillingPlanPage {
    randomPlan;

    constructor(page) {
        this.page = page;

        this.billingTableColumnHeader = this.page.locator('.billing__table-column--header');
        this.billingHeader = this.page.locator('.billing__trial-header');
    }

    async getRandomPlan() {
        const randomIndex = await getRandomInt(PLANS.length);
        this.randomPlan = PLANS[randomIndex];
        console.log(`Plan: ${this.randomPlan}`);

        return this.randomPlan;
    }

    async clickUpgradeButton() {
        await this.billingTableColumnHeader
            .filter({ hasText: this.randomPlan })
            .getByRole('button', { name: "Upgrade" })
            .click();
    }
}