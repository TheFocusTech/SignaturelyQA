import SettingsBillingPage from "./settingsBillingPage";
import SettingsAPIPage from "./settingsAPIPage";
import AbstractBaseSet from "./abstractBaseSet";
import AbstractSettingsSet from "./abstractSettingsSet.js";

class SettingsCompanyPage extends AbstractSettingsSet {
    constructor(page){
        super(page);
        // this.page = page;
    // }

    this.locators = {
        ...this.locators,
        // getSettingsBillingSidebarLink: () => this.page.getByRole('link', {name: 'Billing', exact: true}).first(),
        // getAPILink: () => this.page.getByRole('link', { name: 'API' }),
    }
}
   
    // async clickSettingsBillingSidebarLinkAngGoSettingsBillingPage() {
    //     await this.locators.getSettingsBillingSidebarLink().click();

    //     return new SettingsBillingPage(this.page);
    // }

    // async clickAPILinkAndGoAPIPage(){
    //     await this.locators.getAPILink().click();

    //     return new SettingsAPIPage(this.page);
    // }
}
export default SettingsCompanyPage;