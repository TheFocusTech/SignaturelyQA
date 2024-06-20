export default class SpecialOneTimeOfferModal {
    constructor(page) {
        this.page = page;

        this.upsellModal = this.page.locator('.upsellModal');
        this.upsellModalBtn = this.page.getByRole('button', { name: "Yes, upgrade me!" });        
        this.noThanksModalBtn = this.page.getByText("No thanks");
    }

    async clickYesUpgradeMeBtn() {
        await this.upsellModal.waitFor({ state: 'visible' });
        await this.upsellModalBtn.click();
        await this.upsellModal.waitFor({ state: 'hidden' });
    }

    async clickNoThanksModalBtn(){
        await this.upsellModal.waitFor({ state: 'visible' });        
        await this.noThanksModalBtn.click();
        await this.upsellModal.waitFor({ state: 'hidden' });
    }
}