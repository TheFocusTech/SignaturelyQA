import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";

export default class NewSettingsBillingPlanPage {

    constructor(page) {
        this.page = page;

        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);

        this.billingTableColumnHeader = this.page.locator('.billing__table-column--header');
        this.billingHeader = this.page.locator('.billing__trial-header');
        this.selectPersonalPlanButton = this.page.getByText('Select', { exact: true });        
    }

    async clickUpgradeButton(plan) {
        await this.billingTableColumnHeader
            .filter({ hasText: plan })
            .getByRole('button', { name: "Upgrade" })
            .click();
    }

    async clickSelectPersonalPlanButton(){
        await this.selectPersonalPlanButton.click();
    }

}