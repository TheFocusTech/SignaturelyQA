import SettingsBillingPlanPage from "./settingsBillingPlanPage";

class SettingsBillingPage {
    constructor(page){
        this.page = page;
    }

    locators = {        
        getEditPlanBtn: () => this.page.getByText('Edit Plan', { exact: true })
    }

    async clickEditPlanBtnAndGoSettingsBillingPlanPage() {
        await this.locators.getEditPlanBtn().click();

        return new SettingsBillingPlanPage(this.page);
    }   
   
}
export default SettingsBillingPage;