import LoginPage from "./loginPage";

class SettingsProfilePage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getNewPasswordInputField: () => this.page.getByPlaceholder('Password', { exact: true }),
        getRepeatNewPasswordInputField: () => this.page.getByPlaceholder('Repeat Password'),
        getSaveBtn: () => this.page.getByRole('button', { name: 'Save' }),
        getToastBody: () => this.page.locator('.Toastify__toast-body'),
        getSignSidebarMenuOption: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
    }

    async fillNewPasswordInputField(password) {
        await this.locators.getNewPasswordInputField().type(password);

        return this;
    }

    async fillRepeatNewPasswordInputField(password) {
        await this.locators.getRepeatNewPasswordInputField().type(password);

        return this;
    }

    async clickSaveButton() {
        await this.locators.getSaveBtn().click();
       
        return this;
    }

    async getToasterText() {
        const toasterMessageText =  await this.locators.getToastBody().innerText();

        return toasterMessageText;
    }

    async waitForToasterVisible() {
        await this.locators.getToastBody().waitFor({ state: 'visible' });
    }

    async waitForToasterHidden() {
        await this.locators.getToastBody().waitFor({ state: 'hidden' });
    }

    async clickSignSidebarMenuOptionAndGoToLoginPageAfterUpdatePassword() {
        await this.locators.getSignSidebarMenuOption().click();

        return new LoginPage(this.page);
    }
}
export default SettingsProfilePage;
