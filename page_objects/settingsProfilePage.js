import LoginPage from "./loginPage";
import SignPage from "./signPage";

class SettingsProfilePage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSettingsProfileLink: () => this.page.getByRole('link', {name: 'Profile', exact: true}).first(),
        getDeleteMyAccountBtn: () => this.page.page.getByText('Delete my Account', {exact: true}),
        getDeleteMyAccountModal: () => this.page.locator('.profile__modal-button--delete'),
        getToasterPopup: () => this.page.getByRole('alert'),
    }

    async clickSettingsProfileSidebarLink() {
        await this.locators.getSettingsProfileLink().click();

        return new SettingsProfilePage(this.page);
    }

    async clickDeleteMyAccountBtn() {
        await this.locators.getDeleteMyAccountBtn().click();

        return this;
    }

    async clickDeleteMyAccountModal() {
        await this.locators.getDeleteMyAccountModal().click();

        return new LoginPage(this.page);
    }


}
export default SettingsProfilePage;