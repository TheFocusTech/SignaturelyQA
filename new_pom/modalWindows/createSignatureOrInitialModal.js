import { test } from "../../fixtures/base"; 

export default class CreateSignatureOrInitialModal {
    constructor(page) {
        this.page = page;

        this.checkboxAgree = this.page.locator('div').getByText('I agree to sign electronically pursuant to the ');
        this.signNowBtn = this.page.getByRole('button', { name: 'Sign Now' });
        this.inputSignature = this.page.locator('input.requisiteModal__type-input');
    }

    async clickCheckboxAgree() {
        await test.step('Click the "I agree" checkbox for electronic signing.', async () => {
            await this.checkboxAgree.waitFor({ state: 'visible' });
            await this.checkboxAgree.click();
        });
    }

    async clickSignNowBtn() {
        await test.step('Click on the "Sign Now" button.', async () => {
            await this.signNowBtn.click();
        });
    }

    async fillInputSignature(text) {
        await this.inputSignature.fill(text);
    }

}