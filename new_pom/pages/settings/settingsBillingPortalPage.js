import {step} from "allure-js-commons";

export default class SettingsBillingPortalPage {
    constructor(page) {
        this.page = page;

        this.paymentMethodsList = this.page.locator('[class="Box-root Flex-flex Flex-alignItems--center Flex-direction--row"]');
        this.paymentDefaultMethod = this.paymentMethodsList.filter({hasText: 'Default'});
        this.moreOptionsButtonList = this.page.getByText('More options');
        this.deleteOptions = this.page.locator('[data-test="menu-contents"]').getByText('Delete');
        this.deletePaymentMethodButtonOnDialog = this.page.locator('.Dialog-footer').getByText('Delete payment method');
    }

    async deleteAllNotDefaultCards() {
        await step('Delete all not default cards', async () => {
            await this.page.waitForTimeout(2000);
            let count = await this.moreOptionsButtonList.count();
            while (count > 0) {
                await this.moreOptionsButtonList.nth(0).click()
                await this.deleteOptions.click();
                await this.deletePaymentMethodButtonOnDialog.click();
                await this.page.waitForTimeout(1000)
                count = await this.moreOptionsButtonList.count();
            }
        });
    }
}