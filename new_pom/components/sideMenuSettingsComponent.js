import { step } from 'allure-js-commons';

export default class SideMenuSettingsComponent {
    constructor(page) {
        this.page = page;

        this.menuItems = this.page.locator('.sidebar__item-link-list');
        this.billing = this.menuItems.getByRole('link', { name: 'Billing' });
        this.editSignature = this.menuItems.getByRole('link', { name: 'Edit Signature' });
        this.profile = this.menuItems.getByRole('link', { name: 'Profile' });
    }

    async clickBilling() {
        await step('Click on "Billing" item in the Settings submenu', async () => {
            await this.billing.click();
        });
    }

    async clickEditSignature() {
        await step('Click on "Edit Signature" item in the Settings submenu', async () => {
            await this.editSignature.click();
        });
    }

    async clickProfile() {
        await step('Click on "Profile" item in the Settings submenu', async () => {
            await this.profile.click();
        });
    }
}
