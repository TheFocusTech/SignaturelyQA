import AbstractBaseSet from "./abstractBaseSet";
import SignPage from "./signPage";
import AbstractSettingsSet from "./abstractSettingsSet.js";

class SettingsBillingPlanPage extends AbstractSettingsSet {
    constructor(page){
        super(page);
        // this.page = page;
    // }

    this.locators = {
        ...this.locators,        
        getPersonalPlanSelectBtn: () => this.page.getByText('Select', { exact: true }),
        // getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
        getDowngradeBtn: () => this.page.getByRole('button', {name: 'Downgrade'}),
        getToasterPopup: () => this.page.getByRole('alert'),
        getToasterCloseSuccessBtn: () => this.page.locator('[type = "success"]'),
        getRenewBusinessPlanBtn: () => this.page.getByText('Renew', { exact: true }),
        getCurrentPlanBtn: () => this.page.getByText('Current Plan', { exact: true })
    }
}

    async clickPersonalPlanSelectBtn() {
        await this.locators.getPersonalPlanSelectBtn().click();

        return this;
    }
    async clickDowngradeBtn(){
        await this.locators.getDowngradeBtn().click();

        return this;
    } 
    async clickRenewBusinessPlanBtn(){
        await this.locators.getRenewBusinessPlanBtn().click();

        return this;
    }
    async clickToasterCloseSuccessBtn(){
        await this.locators.getToasterCloseSuccessBtn().click();

        return this;
    }
    // async clickSignSidebarLinkAndGoSignPage(){
    //     await this.locators.getSignSidebarLink().click();

    //     return new SignPage(this.page);
    // }
   
}
export default SettingsBillingPlanPage;