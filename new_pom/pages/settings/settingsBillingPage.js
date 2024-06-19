export default class NewSettingsBillingPage {
    constructor(page) {
        this.page = page;

        this.upgradePlanButton = this.page.getByRole('button', {name: "Upgrade Plan"});
        this.editPlanButton = this.page.getByRole('button', {name: "Edit Plan"});
    }

    async clickUpgradePlanButton() {
        await this.upgradePlanButton.click();
    }

    async clickEditPlanButton(){
        await this.editPlanButton.click();
    }
}