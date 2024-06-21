export default class CreateOrEditSignatureOnSettingModal {
    constructor(page) {
        this.page = page;

        this.fullNameField = this.page.locator('input').first();
        this.initialsField = this.page.locator('input').last();
        this.checkboxAgree = this.page.locator('div').getByText('I agree to sign electronically pursuant to the ');
        this.createSignatureBtn = this.page.getByRole('button', { name: 'Create Signature' });
    }

    async fillFullNameField(name) {
        await this.fullNameField.fill(name);
    }

    async fillInitialsField(initial) {
        await this.initialsField.fill(initial);
    }

    async clickCheckboxAgree() {
        await this.checkboxAgree.click();
    }

    async clickCreateSignatureBtn() {
        await this.createSignatureBtn.click();
    }
}