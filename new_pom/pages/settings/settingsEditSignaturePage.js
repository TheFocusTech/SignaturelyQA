import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";
import ToastComponent from "../../components/toastComponent";
import { step } from "allure-js-commons"; 

export default class SettingsEditSignaturePage {
    constructor(page) {
        this.page = page;

        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);
        this.toast = new ToastComponent(this.page);
        
        this.createSignatureBtn = this.page.getByRole('button', {name: 'Create Signature'});
        this.settingsSignatureList = this.page.locator('.settingsSignature__list');
        this.settingsSignatureItem = this.page.locator('.settingsSignature__item');
        this.dropDownMenu = this.page.locator('.settingsSignature__dropDown-trigger');
        this.deleteSignatureDropDownItem = this.page.getByRole('listitem').locator('div').filter({hasText: 'Delete'}).nth(3);
        this.editSignatureDropDownItem = this.page.getByRole('listitem').locator('div').filter({hasText: 'Edit'}).nth(3);
    }

    async clickCreateSignatureBtn() {
        await step('Click on "Create Signature" button', async () => {
            await this.createSignatureBtn.click();
        })
    }

    async clickDropDownMenu() {
        await step("Open signature's dropdown menu", async () => {
            await this.dropDownMenu.click();
        })
    }

    async clickDeleteSignatureDropDownItem() {
        await step('Click on "Delete" item in dropdown menu', async () => {
            await this.deleteSignatureDropDownItem.click();
        })
    }

    async clickEditSignatureDropDownItem() {
        await step('Click on "Edit" item in dropdown menu', async () => {
            await this.editSignatureDropDownItem.click();
        })
    }
}