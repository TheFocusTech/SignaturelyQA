export default class ChooseSignatureOrInitialModal {
    constructor(page) {
        this.page = page;

        this.signatureTyped = this.page.locator('.settingsSignature__item-inner');
        this.signNowBtn = this.page.getByRole('button', { name: 'Sign Now' });
    }

    async clickSignatureTyped() {
        await this.signatureTyped.click();
    }

    async clickSignNowBtn() {
        await this.signNowBtn.click();
    }
}