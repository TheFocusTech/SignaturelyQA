export default class SpecialOneTimeOfferModal {
    constructor(page) {
        this.page = page;

        this.upsellModal = this.page.locator('.upsellModal');
        this.upsellModalBtn = this.page.getByRole('button', { name: "Yes, upgrade me!" });
    }

    async clickYesUpgradeMeBtn() {
        await this.upsellModal.waitFor({ state: 'visible' });
        await this.upsellModalBtn.click();
        await this.upsellModal.waitFor({ state: 'hidden' });
    }
}