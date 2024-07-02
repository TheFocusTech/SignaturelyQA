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
        this.dropDownMenu = this.page.getByRole('listitem').locator('div').nth(2);;
        this.deleteSignatureDropDownItem = this.page.getByRole('listitem').locator('div').filter({hasText: 'Delete'}).nth(2);
        this.editSignatureDropDownItem = this.page.getByRole('listitem').locator('div').filter({hasText: 'Edit'}).nth(3);
    }

    async clickCreateSignatureBtn() {
        await step('Click on the "Create Signature" button', async () => {
            await this.createSignatureBtn.click();
        })
    }

    async clickDropDownMenu() {
        await step('Click on the dropDown menu "Edit Delete Signature"', async () => {
            await this.dropDownMenu.click();
        })
    }

    async clickDeleteSignatureDropDownItem() {
        await step('Click on the "Delete Signature" drop down item', async () => {
            await this.deleteSignatureDropDownItem.click();
        })
    } 

    async clickEditSignatureDropDownItem() {
        await step('Click on the "Edit Signature" drop down item', async () => {
            await this.editSignatureDropDownItem.click();
        })
    }
}