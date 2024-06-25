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
}
