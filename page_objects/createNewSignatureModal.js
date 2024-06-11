import SettingsEditSignaturePage from "./settingsEditSignaturePage";

class CreateNewSignatureModal {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getFullNameInputField: () => this.page.locator('div').filter({ hasText: /^Full Name \*$/ }).getByRole('textbox'),
        getInitialsInputField: () => this.page.locator('div').filter({ hasText: /^Initials \*$/ }).getByRole('textbox'),
        getAgreementCheckbox: () => this.page.locator('.uiCheckbox__inner'),
        getCreateSignatureBtn: () => this.page.getByRole('button', {name: 'Create Signature', exact: true}),
    }

    async fillFullNameInputField(name) {
        await this.locators.getFullNameInputField().fill(name);

        return this;
    }

    async fillInitialsInputField(initials) {
        await this.locators.getInitialsInputField().fill(initials);

        return this;
    }

    async clickAgreementCheckbox() {
        await this.locators.getAgreementCheckbox().click();

        return this;
    }

    async clickCreateSignatureBtnAndGoSettingsEditSignaturePage() {
        await this.locators.getCreateSignatureBtn().click();

        return new SettingsEditSignaturePage(this.page);
    }
}
export default CreateNewSignatureModal;