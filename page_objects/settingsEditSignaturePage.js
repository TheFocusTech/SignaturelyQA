import SignPage from "./signPage";
import CreateNewSignaturePage from "./createNewSignaturePage";

class SettingsEditSignaturePage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getCreateSignatureBtn: () => this.page.getByRole('button', {name: 'Create Signature'}),
        getToaster: () => this.page.locator('.Toastify__toast-body'),
        getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
    }

    async clickCreateSignatureAndGoCreateNewSignaturePage() {
        await this.locators.getCreateSignatureBtn().click();

        return new CreateNewSignaturePage(this.page);
    }

    async clickSignSidebarLinkAndGoSignPage() {
        await this.locators.getSignSidebarLink().click();

        return new SignPage(this.page);
    }
}
export default SettingsEditSignaturePage;