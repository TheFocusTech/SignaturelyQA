import AbstractBaseSet from "./abstractBaseSet";
import SettingsBillingPlanPage from "./settingsBillingPlanPage";
import UpgradeYourPlanModal from "./upgradeYourPlanModal";
import AbstractSettingsSet from "./abstractSettingsSet.js";

class SettingsBillingPage extends AbstractSettingsSet {
    constructor(page){
        super(page);
        // this.page = page;
    // }

    this.locators = {
        ...this.locators,        
        getEditPlanBtn: () => this.page.getByText('Edit Plan', { exact: true }),
        getBusinessUpgradeBtn: () => this.page.locator('.billing__table-column').filter({ hasText: 'Business' }).getByRole('button'),
        getBillingPlanWrapper: () => this. page.locator('.billing__plan-wrapper')
    }
    }
    
    async clickEditPlanBtnAndGoSettingsBillingPlanPage() {
        await this.locators.getEditPlanBtn().click();

        return new SettingsBillingPlanPage(this.page);
    }   

    async clickBusinessUpgradeAndGoToUpgradeYourPlanModal() {
        await this.locators.getBusinessUpgradeBtn().click();

        return new UpgradeYourPlanModal(this.page);
    } 
}
export default SettingsBillingPage;