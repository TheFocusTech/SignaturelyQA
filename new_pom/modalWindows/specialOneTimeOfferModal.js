import { step } from "allure-js-commons";

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

    async clickNoThanksModalBtn() {
        await step('Click "No,thanks" button on the One Time Special Offer Modal', async () => {
            await this.upsellModal.waitFor({ state: 'visible' });
            await this.noThanksModalBtn.click();
            await this.upsellModal.waitFor({ state: 'hidden' });
        });
    }
}