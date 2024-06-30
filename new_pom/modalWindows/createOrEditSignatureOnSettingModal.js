import { step } from "allure-js-commons";
export default class CreateOrEditSignatureOnSettingModal {
    constructor(page) {
        this.page = page;

        this.fullNameField = this.page.locator('input').first();
        this.initialsField = this.page.locator('input').last();
        this.checkboxAgree = this.page.locator('div').getByText('I agree to sign electronically pursuant to the ');
        this.createSignatureBtn = this.page.getByRole('button', { name: 'Create Signature' });
        this.deleteBtn = this.page.getByRole('button', { name: 'Delete' });
    }

    async fillFullNameField(name) {
        await step('Fill "Full Name" field', async () => {
            await this.fullNameField.fill(name);
        })
    }

    async fillInitialsField(initial) {
        await step('Fill "Initials" field', async () => {
            await this.initialsField.fill(initial);
        })
    }

    async clickCheckboxAgree() {
        await step('Click the "I agree" checkbox for electronic signing', async () => {
            await this.checkboxAgree.click();
        })
    }

    async clickCreateSignatureBtn() {
        await step('Click the "Create Signature" button', async () => {
            await this.createSignatureBtn.click();
        })
    }

    async clickDeleteBtn() {
        await step('Click the "Delete" button', async () => {
            await this.deleteBtn.click();
        })
    }
}