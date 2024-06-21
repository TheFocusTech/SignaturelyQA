import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";

export default class NewSettingsEditSignaturePage {
    constructor(page) {
        this.page = page;

        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);
        
        this.createSignatureBtn = this.page.getByRole('button', {name: 'Create Signature'});
    }

    async clickCreateSignatureBtn() {
        await this.createSignatureBtn.click();
    }
}