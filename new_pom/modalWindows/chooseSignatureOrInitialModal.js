export default class ChooseSignatureOrInitialModal {
    constructor(page) {
        this.page = page;

        this.signatureTyped = this.page.locator('.settingsSignature__item-inner');
        this.signNowBtn = this.page.getByRole('button', { name: 'Sign Now' });
    }

    async clickSignatureTyped() {
        await step('Click "Signature" on the "Typed" tab', async () => {
            await this.signatureTyped.click();
        })
    }

    async clickSignNowBtn() {
        await step('Click "Sign Now" button', async () => {
            await this.signNowBtn.click();
        })
    }
}