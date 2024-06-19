export default class SideMenuSettingsComponent {
    constructor(page) {
        this.page = page;


        this.billing = this.page.getByRole('link', {name: 'Billing', exact: true}).first()
    }

    async clickBilling() {
        await this.billing.click();
    }
}