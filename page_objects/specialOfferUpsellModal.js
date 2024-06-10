import SettingsBillingPlanPage from "./settingsBillingPlanPage";

class SpecialOfferUpsellModal {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getNoThanksBtn: () => this.page.locator('.upsellModal__button-cancel'),
    }

    async cancelSpecialOfferAndGoToSettingsBillingPlanPage() {
        await this.locators.getNoThanksBtn().waitFor({ state: 'visible' });
        await this.locators.getNoThanksBtn().click()
        await this.locators.getNoThanksBtn().waitFor({ state: 'hidden' });

        return new SettingsBillingPlanPage(this.page);
    }
}
export default SpecialOfferUpsellModal;