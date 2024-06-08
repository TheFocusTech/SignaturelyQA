import AbstractBaseSet from "./abstractBaseSet";

class AbstractSettingsSet extends AbstractBaseSet {
    constructor(page){
        super(page);

        this.locators = {
            ...this.locators,
            
            getSettingsBillingSidebarLink: () => this.page.getByRole('link', {name: 'Billing', exact: true}).first(),
            getAPILink: () => this.page.getByRole('link', { name: 'API' }),

        }
    }
    
    async clickSettingsBillingSidebarLinkAngGoSettingsBillingPage() {
        await this.locators.getSettingsBillingSidebarLink().click();

        const { default: SettingsBillingPage } = await import("./settingsBillingPage.js");
        return new SettingsBillingPage(this.page);
    }

    async clickAPILinkAndGoAPIPage(){
        await this.locators.getAPILink().click();

        const { default: SettingsAPIPage } = await import("./settingsAPIPage.js");
        return new SettingsAPIPage(this.page);
    }

}
export default AbstractSettingsSet;