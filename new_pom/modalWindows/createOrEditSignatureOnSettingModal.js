import { step } from "allure-js-commons";

export default class CreateOrEditSignatureOnSettingModal {
    constructor(page) {
        this.page = page;

        this.fullNameField = this.page.locator('input').first();
        this.initialsField = this.page.locator('input').last();
        this.checkboxAgree = this.page.locator('div').getByText('I agree to sign electronically pursuant to the ');
        this.createSignatureBtn = this.page.getByRole('button', { name: 'Create Signature' });
        this.deleteBtn = this.page.getByRole('button', { name: 'Delete' });
        this.updateBtn = this.page.getByRole('button', { name: 'Update signature' });
    }

    async fillFullNameField(name) {
        await step('Fill in "Full Name" input field.', async () => {
            await this.fullNameField.fill(name);
        })
    }

    async fillInitialsField(initial) {
        await step('Fill in "Initials" input field.', async () => {
            await this.initialsField.fill(initial);
        })
    }

    async clickCheckboxAgree() {
        await step('Check "I agree" checkbox.', async () => {
            await this.checkboxAgree.click();
        })
    }

    async clickCreateSignatureBtn() {
        await step('Click on "Create Signature" button.', async () => {
            await this.createSignatureBtn.click();
        })
    }

    async clickDeleteBtn() {
        await step('Click on "Delete" button.', async () => {
            await this.deleteBtn.click();
        })
    }

    async clickUpdateBtn() {
        await step('Click on "Update signature" button.', async () => {
            await this.updateBtn.click();
        })
    }
}