import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";
import ToastComponent from "../../components/toastComponent";

export default class NewSettingsEditSignaturePage {
    constructor(page) {
        this.page = page;

        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);
        this.toast = new ToastComponent(this.page);
        
        this.createSignatureBtn = this.page.getByRole('button', {name: 'Create Signature'});
        this.settingsSignatureList = this.page.locator('.settingsSignature__list');
    }

    async clickCreateSignatureBtn() {
        await this.createSignatureBtn.click();
    }
}