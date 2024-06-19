export default class NewSettingsBillingPlanPage {

    constructor(page) {
        this.page = page;

        this.billingTableColumnHeader = this.page.locator('.billing__table-column--header');
        this.billingHeader = this.page.locator('.billing__trial-header');
        this.selectPersonalPlanButton = this.page.getByText('Select', { exact: true });
        this.businessPlanActionButton = this.billingTableColumnHeader.last().locator('div').last();
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