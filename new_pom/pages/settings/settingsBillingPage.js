import {URL_END_POINTS} from "../../../testData";

export default class NewSettingsBillingPage {
    constructor(page) {
        this.page = page;

        this.upgradePlanBtn = this.page.getByRole('button', {name: "Upgrade Plan"});
        this.editPlanBtn = this.page.getByText('Edit Plan', { exact: true });
    }

    async clickUpgradePlanButton() {
        await this.upgradePlanBtn.click();
    }

    async clickEditPlanBtn() {
        await this.editPlanBtn.click();
        await this.page.waitForURL(`${process.env.URL}${URL_END_POINTS.settingsBillingPlanEndPoint}`);
    }
}