export default class SettingsHorizontalMenuComponent {
    constructor(page) {
        this.page = page;

        this.billing = this.page.locator('.settingsNav__list a[href="/settings/billing"]');
    }

    async clickBilling() {
        await this.billing.click();
    }
}