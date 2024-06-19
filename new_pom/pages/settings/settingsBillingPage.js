import {URL_END_POINTS} from "../../../testData";

export default class NewSettingsBillingPage {
    constructor(page) {
        this.page = page;

        this.upgradePlanBtn = this.page.getByRole('button', {name: "Upgrade Plan"});
        this.editPlanBtn = this.page.getByText('Edit Plan', { exact: true });
        this.billingPlanDescription = this.page.locator('.billing__plan-description');
    }

    async clickUpgradePlanButton() {
        await this.upgradePlanBtn.click();
    }
}