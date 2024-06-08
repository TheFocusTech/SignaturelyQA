class AbstractBaseSet {
    constructor(page){
        this.page = page;

        this.locators = {
            getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
            getSettingsSidebarLink: () => this.page.getByRole('link', {name: 'Settings', exact: true}),
            getDocumentsSidebarLink: () => this.page.getByRole('link', {name: 'Documents', exact: true}),
            getDropDownUser: () => this.page.locator('.dropDownUser__wrapper'),
            getEditSignatureDropItem: () => this.page.getByRole('banner').getByRole('link', { name: 'Edit Signature' }),
        }
    }

    async clickSignSidebarLinkAndGoSignPage() {
        await this.locators.getSignSidebarLink().click();
    }

    async clickSettingsSidebarLinkAndGoSettingsCompanyPage(){
        await this.locators.getSettingsSidebarLink().click();

        const { default: SettingsCompanyPage } = await import("./settingsCompanyPage.js");
        return new SettingsCompanyPage(this.page);
    }

    async clickDocumentsSidebarLinkAndGoDocumentsPage() {
        await this.locators.getDocumentsSidebarLink().click();

        const { default: DocumentsPage } = await import("./documentsPage.js");
        return new DocumentsPage(this.page);
    }

    async clickDropDownUser() {
        await this.locators.getDropDownUser().click();

        return this;
    }

    async clickEditSignatureAndGoEditSignaturePage() {
        await this.locators.getEditSignatureDropItem().click();

        const { default: SettingEditSignature} = await import("./settingEditSignature");
        return new SettingEditSignature(this.page);
    }
}
export default AbstractBaseSet;