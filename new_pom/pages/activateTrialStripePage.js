export default class ActivateTrialStripePage {
    constructor(page) {
        this.page = page;

        this.userHeaderName = this.page.locator('.dropDownUser__trigger-name');
        this.billingInfoHeader = this.page.locator('.sign-up-second-step__billing-info h3');
        this.freeTrialStatement = this.page.locator('.sign-up-second-step__title');
    }
}
