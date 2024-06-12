class ActivateTrialStripePage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getUserHeaderName: () => this.page.locator('.dropDownUser__trigger-name'),
    }

}
export default ActivateTrialStripePage;