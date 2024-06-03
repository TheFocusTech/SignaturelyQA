import SettingsBillingPage from "./settingsBillingPage";
import SettingsAPIPage from "./settingsAPIPage";

class SettingsCompanyPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSettingsBillingSidebarLink: () => this.page.getByRole('link', {name: 'Billing', exact: true}).first(),
        getAPILink: () => this.page.getByRole('link', { name: 'API' }),
    }
   
    async clickSettingsBillingSidebarLinkAngGoSettingsBillingPage() {
        await this.locators.getSettingsBillingSidebarLink().click();

        return new SettingsBillingPage(this.page);
    }

    async clickAPILinkAndGoAPIPage(){
        await this.locators.getAPILink().click();

        return new SettingsAPIPage(this.page);
    }
}
export default SettingsCompanyPage;