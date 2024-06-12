class ActivateTrialStripePage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getUserHeaderName: () => this.page.locator('.dropDownUser__trigger-name'),
        getBillingInfoHeader: () => this.page.locator('.sign-up-second-step__billing-info h3'),
        getFreeTrialStatement: () => this.page.locator('.sign-up-second-step__title')
    }

}
export default ActivateTrialStripePage;