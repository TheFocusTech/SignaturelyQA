import SettingsBillingPage from "./settingsBillingPage";
import SettingsAPIPage from "./settingsAPIPage";
import SettingsProfilePage from "./settingsProfilePage";

class SettingsCompanyPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSettingsBillingSidebarLink: () => this.page.getByRole('link', {name: 'Billing', exact: true}).first(),
        getAPILink: () => this.page.getByRole('link', { name: 'API' }),
        getSettingsProfileSidebarMenuOption: () => this.page.locator('.sidebar__item-link').getByText('Profile')
    }
   
    async clickSettingsBillingSidebarLinkAngGoSettingsBillingPage() {
        await this.locators.getSettingsBillingSidebarLink().click();

        return new SettingsBillingPage(this.page);
    }

    async clickAPILinkAndGoAPIPage(){
        await this.locators.getAPILink().click();

        return new SettingsAPIPage(this.page);
    }

    async clickSettingsProfileSidebarMenuOptionAndGoToSettingsProfilePage() {
        await this.locators.getSettingsProfileSidebarMenuOption().click();

        return new SettingsProfilePage(this.page);
    }
}
export default SettingsCompanyPage;