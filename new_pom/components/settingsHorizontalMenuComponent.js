import {step} from "allure-js-commons";

export default class SettingsHorizontalMenuComponent {
    constructor(page) {
        this.page = page;

        this.billing = this.page.locator('.settingsNav__list').getByRole('link', {name: 'Billing'});
        this.api = this.page.getByRole('link', { name: 'API' });
    }

    async clickBilling() {
        await step('Click "Billing" on horizontal menu', async () => {
            await this.billing.click();
        });
    }

    async clickAPI() {
        await step('Click API on Horizontal Menu', async () => {
            await this.api.click();
        });
    }
}