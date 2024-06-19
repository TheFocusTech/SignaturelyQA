import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage.js";
import {TOASTER_MESSAGE, CARD_DETAILS, RANDOM_ANNUALLY_PLAN, PLANS} from '../testData.js';

test.describe('Billing', () => {

    test.skip('TC_14_57_02 | Verify the ability to successfully downgrade subscription', async ({page,createBusinessUserAndLogin}) => {
        const signPage = new SignPage(page);

        const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
        const settingsBillingPage = await settingsCompanyPage.clickSettingsBillingSidebarLinkAngGoSettingsBillingPage();
        const settingsBillingPlanPage = await settingsBillingPage.clickEditPlanBtnAndGoSettingsBillingPlanPage();

        await settingsBillingPlanPage.clickPersonalPlanSelectBtn();
        await settingsBillingPlanPage.clickDowngradeBtn();

        await expect(settingsBillingPlanPage.locators.getToasterPopup()).toHaveText(TOASTER_MESSAGE.planSuccessChange);
        await expect(settingsBillingPlanPage.locators.getRenewBusinessPlanBtn()).toBeVisible();

        await settingsBillingPlanPage.clickToasterCloseSuccessBtn();
        await settingsBillingPlanPage.clickRenewBusinessPlanBtn();
        await expect(settingsBillingPlanPage.locators.getToasterPopup()).toHaveText(TOASTER_MESSAGE.planRenew);
        await expect(settingsBillingPlanPage.locators.getCurrentPlanBtn()).toBeVisible();
        await settingsBillingPlanPage.clickSignSidebarLinkAndGoSignPage();
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
        test.setTimeout(150 * 1000);
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

        await expect(settingBillingPortalPage.paymenttMethodsList).toHaveCount(1);
        await expect(settingBillingPortalPage.paymenttMethodsList).toHaveText(CARD_DETAILS.MASTERCARD.displayingOnTheBillingPortalPage);
    });
})