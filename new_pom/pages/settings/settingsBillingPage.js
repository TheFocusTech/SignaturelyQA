export default class NewSettingsBillingPage {
    constructor(page) {
        this.page = page;

        this.upgradePlanButton = this.page.getByRole('button', {name: "Upgrade Plan"});
    }

    async clickUpgradePlanButton() {
        await this.upgradePlanButton.click();
    }
}