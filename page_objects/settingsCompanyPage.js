import SettingsBillingPage from "./settingsBillingPage";
import SettingsEditSignaturePage from "./settingsEditSignaturePage";

class SettingsCompanyPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSettingsBillingSidebarLink: () => this.page.getByRole('link', {name: 'Billing', exact: true}).first(),
        getEditSignatureLink: () => this.page.getByLabel('Settings').getByRole('link', {name: 'Edit Signature'}),
    }
   
    async clickSettingsBillingSidebarLinkAngGoSettingsBillingPage() {
        await this.locators.getSettingsBillingSidebarLink().click();

        return new SettingsBillingPage(this.page);
    }

    async clickEditSignatureLinkAndGoSettingsEditSignaturePage() {
        await this.locators.getEditSignatureLink().click();

        return new SettingsEditSignaturePage(this.page);
    }
}
export default SettingsCompanyPage;