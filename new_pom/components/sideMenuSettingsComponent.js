import {test} from "../../fixtures/base";

export default class SideMenuSettingsComponent {
    constructor(page) {
        this.page = page;

        this.menuItems = this.page.locator('.sidebar__item-link-list');
        this.billing = this.menuItems.getByRole('link', {name: 'Billing'});
        this.editSignature = this.menuItems.getByRole('link', {name: 'Edit Signature'});
    }

    async clickBilling() {
        await test.step("Click on the Billing option in the side menu", async () => {
            await this.billing.click();
        });
    }

    async clickEditSignature() {
        await this.editSignature.click();
    }
}