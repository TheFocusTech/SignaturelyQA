import SettingsBillingPage from "./settingsBillingPage";
import SettingsAPIPage from "./settingsAPIPage";
import SettingsEditSignaturePage from "./settingsEditSignaturePage";

class SettingsCompanyPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSettingsBillingSidebarLink: () => this.page.getByRole('link', {name: 'Billing', exact: true}).first(),
        getAPILink: () => this.page.getByRole('link', { name: 'API' }),
        getEditSignatureLink: () => this.page.getByLabel('Settings').getByRole('link', {name: 'Edit Signature'}),
    }
   
    async clickSettingsBillingSidebarLinkAngGoSettingsBillingPage() {
        await this.locators.getSettingsBillingSidebarLink().click();

        return new SettingsBillingPage(this.page);
    }

    async clickAPILinkAndGoAPIPage(){
        await this.locators.getAPILink().click();

        return new SettingsAPIPage(this.page);
    }

    async clickEditSignatureLinkAndGoSettingsEditSignaturePage() {
        await this.locators.getEditSignatureLink().click();

        return new SettingsEditSignaturePage(this.page);
    }
}
export default SettingsCompanyPage;