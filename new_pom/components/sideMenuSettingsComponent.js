export default class SideMenuSettingsComponent {
    constructor(page) {
        this.page = page;

        this.menuItems = this.page.locator('.sidebar__item-link-list');
        this.billing = this.menuItems.getByRole('link', {name: 'Billing'});
        this.editSignature = this.menuItems.getByRole('link', {name: 'Edit Signature'});
    }

    async clickBilling() {
        await this.billing.click();
    }

    async clickEditSignature() {
        await this.editSignature.click();
    }
}