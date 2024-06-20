import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import {CARD_DETAILS, RANDOM_ANNUALLY_PLAN, PLANS, END_PLAN} from '../testData.js';

test.describe('Billing', () => {

    test('TC_14_57_02 | Verify the ability to successfully downgrade subscription', async ({createBusinessUserAndLogin, signPage, settingsCompanyPage, settingsBillingPage, settingsBillingPlanPage, downgradeToPersonalPlanModal, specialOneTimeOfferModal}) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await settingsBillingPage.clickEditPlanButton();
        await settingsBillingPlanPage.clickSelectPersonalPlanButton();
        await downgradeToPersonalPlanModal.clickDowngradeButton();        
        await specialOneTimeOfferModal.clickNoThanksModalBtn();
        await settingsBillingPlanPage.sideMenuSettings.clickBilling();

        await expect(settingsBillingPage.nextInvoiceInfo).toContainText(END_PLAN);           
    })

    test.describe('Upsell plan', () => {
        for (const plan of PLANS) {
            test(`TC_14_56_01 | Verify successful upsell of users subscription ${plan} plan`, async ({createFreeUserAndLogin, signPage, settingsCompanyPage, settingsBillingPage, settingsBillingPlanPage, upgradeYourPlanModal, specialOneTimeOfferModal}) => {
                await signPage.sideMenu.clickSettings();
                await settingsCompanyPage.horizontalMenu.clickBilling();
                await settingsBillingPage.clickUpgradePlanButton();
                await settingsBillingPlanPage.clickUpgradeButton(plan);
                await upgradeYourPlanModal.cardDetails.fillData(CARD_DETAILS.VISA);
                await upgradeYourPlanModal.clickSubscribeButton();
                await specialOneTimeOfferModal.clickYesUpgradeMeBtn();
                await expect(settingsBillingPlanPage.billingHeader).toContainText(RANDOM_ANNUALLY_PLAN(plan));
        })
       }
    })

    test('TC_14_54_01 | Attach/delete payment card', async ({
                                                                createFreeUserAndLogin,
                                                                signPage,
                                                                settingsCompanyPage,
                                                                settingsBillingPage,
                                                            }) => {
        test.setTimeout(100 * 1000);
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickBilling();
        let stripeEnterPaymentDetailsPage = await settingsBillingPage.clickAttachCardButton();
        await stripeEnterPaymentDetailsPage.attachCard(CARD_DETAILS.VISA_DEBIT);
        await settingsBillingPage.reloadPage();

        await expect(settingsBillingPage.creditCardData).toHaveText(CARD_DETAILS.VISA_DEBIT.displayingOnTheBillingPage);

        stripeEnterPaymentDetailsPage = await settingsBillingPage.clickAttachCardButton();
        await stripeEnterPaymentDetailsPage.attachCard(CARD_DETAILS.MASTERCARD);
        await settingsBillingPage.reloadPage();

        await expect(settingsBillingPage.creditCardData).toHaveText(CARD_DETAILS.MASTERCARD.displayingOnTheBillingPage);

        const settingBillingPortalPage = await settingsBillingPage.clickOpenBillingPortalButton();

        await expect(settingBillingPortalPage.paymentDefaultMethod).toHaveText(CARD_DETAILS.MASTERCARD.displayingOnTheBillingPortalPage)

        await settingBillingPortalPage.deleteAllNotDefaultCards();

        await expect(settingBillingPortalPage.paymentMethodsList).toHaveCount(1);
        await expect(settingBillingPortalPage.paymentMethodsList).toHaveText(CARD_DETAILS.MASTERCARD.displayingOnTheBillingPortalPage);
    });
})