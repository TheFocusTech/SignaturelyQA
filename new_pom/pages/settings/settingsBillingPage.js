import StripeEnterPaymentDetailsPage from './stripeEnterPaymentDetailsPage';
import SettingsBillingPortalPage from './settingsBillingPortalPage';
import { step } from 'allure-js-commons';

export default class SettingsBillingPage {
    constructor(page) {
        this.page = page;

        this.upgradePlanBtn = this.page.getByRole('button', { name: 'Upgrade Plan' });
        this.editPlanBtn = this.page.getByText('Edit Plan', { exact: true });
        this.billingPlanDescription = this.page.locator('.billing__plan-description');
        this.upgradePlanButton = this.page.getByRole('button', { name: 'Upgrade Plan' });
        this.attachCardButton = this.page.getByRole('button', { name: 'Attach Card' });
        this.creditCardData = this.page.locator('.creditCard__data');
        this.openBillingPortalButton = this.page.getByRole('button', { name: 'Open Billing Portal' });
        this.editPlanButton = this.page.getByRole('button', { name: 'Edit Plan' });
        this.nextInvoiceInfo = this.page.locator('.billing__plan-group--next-invoice');
        this.billingPlanWrapper = this.page.locator('.billing__plan-wrapper');
        this.cancelSubscriptionBtn = this.page.getByRole('button', { name: 'Cancel subscription' });
    }

    async clickUpgradePlanButton() {
        await step('Click on "UpgradePlan" button', async () => {
            await this.upgradePlanBtn.click();
        });
    }

    async clickAttachCardButton() {
        let newPage;
        await step('Click on "Attach Card" button', async () => {
            await this.attachCardButton.waitFor();
            const newPagePromise = this.page.waitForEvent('popup');
            await this.attachCardButton.click();
            newPage = await newPagePromise;
            await newPage.waitForLoadState('load', { timeout: 20 * 1000 });
        });
        return new StripeEnterPaymentDetailsPage(newPage);
    }

    async reloadPage() {
        await step('Refresh page', async () => {
            await this.page.reload();
            await this.page.waitForTimeout(1000);
        });
    }

    async clickOpenBillingPortalButton() {
        let newPage;
        await step('Click on "Open Billing Portal" button', async () => {
            await this.page.waitForTimeout(1000);
            const pagePromise = this.page.waitForEvent('popup', { timeout: 10 * 1000 });
            await this.openBillingPortalButton.click();
            newPage = await pagePromise;
            await newPage.waitForLoadState('load', { timeout: 40 * 1000 });
        });
        return new SettingsBillingPortalPage(newPage);
    }

    async clickEditPlanButton() {
        await step('Click on "Edit plan" button.', async () => {
            await this.editPlanButton.click();
        });
    }

    async clickCancelSubscriptionButton() {
        await step('Click on "Cancel subscription" button.', async () => {
            await this.cancelSubscriptionBtn.click();
        });
    }
}
