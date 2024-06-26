import ToastComponent from "../../components/toastComponent";
import SideMenuComponent from "../../components/sideMenuComponent";
import { step } from "allure-js-commons";

export default class SettingsProfilePage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);
        this.sideMenu = new SideMenuComponent(this.page);

        this.newPasswordInputField = this.page.getByPlaceholder('Password', { exact: true });
        this.repeatNewPasswordInputField = this.page.getByPlaceholder('Repeat Password');
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.deleteMyAccountBtn = this.page.getByText('Delete my Account', {exact: true});
        this.emailAddressInputField = this.page.getByPlaceholder('username@gmail.com');
        this.updateBtn = this.page.getByRole('button', {name: "Update Email"});
    }

    async fillNewPasswordInputField(password) {
        await step('Fill "New Password" input field', async () => {
            await this.newPasswordInputField.type(password);
        });
    }

    async fillRepeatNewPasswordInputField(password) {
        await step('Fill "Repeate new Password" input field', async () => {
            await this.repeatNewPasswordInputField.type(password);
        });
    }

    async clickSaveButton() {
        await step('Click "Save" button', async () => {
            await this.saveButton.click();
        });
    }

    async clickDeleteMyAccountBtn() {
        await step('Click "Delete My Account" button', async () => {
            await this.deleteMyAccountBtn.click();

    async deleteCurrentEmailFromEmailAddressInputField() {
        await step('Delete email in the "Email Address" field', async () => {
            await this.emailAddressInputField.clear();
        });
    }

    async fillNewEmailIntoEmailAddressInputField(email) {
        await step('Fill "Email Address" field with new email', async () => {
            await this.emailAddressInputField.fill(email);
        });
    }

    async clickUpdateBtn() {
        await step('Click "Update" button', async () => {
            await this.updateBtn.click();
        });
    }
}
