import {step} from "allure-js-commons";

export default class SettingsHorizontalMenuComponent {
    constructor(page) {
        this.page = page;

        this.billing = this.page.locator('.settingsNav__list').getByRole('link', {name: 'Billing'});
        this.api = this.page.getByRole('link', { name: 'API' });
    }

    async clickBilling() {
        await step('Click on "Billing" on horizontal Settings SubMenu', async () => {
            await this.billing.click();
        });
    }

    async clickAPI() {
        await step('Click on "API" on horizontal Settings SubMenu', async () => {
            await this.api.click();
        });
    }
}