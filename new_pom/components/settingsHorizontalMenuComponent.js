export default class SettingsHorizontalMenuComponent {
    constructor(page) {
        this.page = page;

        this.billing = this.page.locator('.settingsNav__list').getByRole('link', {name: 'Billing'});
        this.api = this.page.getByRole('link', { name: 'API' });
    }

    async clickBilling() {
        await this.billing.click();
    }

    async clickAPI() {
        await this.api.click();
    }
}