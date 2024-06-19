import StripeEnterPaymentDetailsPage from "./stripeEnterPaymentDetailsPage";
import SettingBillingPortalPage from "./settingBillingPortalPage";

export default class NewSettingsBillingPage {
    constructor(page) {
        this.page = page;

        this.upgradePlanButton = this.page.getByRole('button', {name: "Upgrade Plan"});
        this.attachCardButton = this.page.getByRole('button', {name: "Attach Card"});
        this.creditCardData = this.page.locator('.creditCard__data');
        this.openBillingPortalButton = this.page.getByRole('button', { name: 'Open Billing Portal' });
    }

    async clickUpgradePlanButton() {
        await this.upgradePlanButton.click();
    }

    async clickAttachCardButton() {
        await this.attachCardButton.waitFor();
        const newPagePromise = this.page.waitForEvent('popup');
        await this.attachCardButton.click();
        const newPage = await newPagePromise;

        return new StripeEnterPaymentDetailsPage(newPage);
    }

    async reloadPage(){
        await this.page.reload();
        await this.page.waitForTimeout(1000);
    }

    async clickOpenBillingPortalButton(){
        await this.page.waitForTimeout(1000)
        const pagePromise = this.page.waitForEvent('popup', { timeout: 10 * 1000 });
        await this.openBillingPortalButton.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState('load', { timeout: 20 * 1000 });

        return new SettingBillingPortalPage(newPage);
    }
}