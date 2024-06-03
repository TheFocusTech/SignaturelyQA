import SettingsBillingPage from "./settingsBillingPage";

class SettingsCompanyPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSettingsBillingSidebarLink: () => this.page.getByRole('link', {name: 'Billing', exact: true}).first()
    }
   
    async clickSettingsBillingSidebarLinkAngGoSettingsBillingPage() {
        await this.locators.getSettingsBillingSidebarLink().click();

        return new SettingsBillingPage(this.page);
    }
    
}
export default SettingsCompanyPage;