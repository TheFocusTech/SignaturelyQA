import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage.js";
import {TOASTER_MESSAGE, VISA_CARD_DATA, RANDOM_ANNUALLY_PLAN, PLANS} from '../testData.js';

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
                await upgradeYourPlanModal.cardDetails.fillData(VISA_CARD_DATA);
                await upgradeYourPlanModal.clickSubscribeButton();
                await specialOneTimeOfferModal.clickYesUpgradeMeBtn();
                await expect(settingsBillingPlanPage.billingHeader).toContainText(RANDOM_ANNUALLY_PLAN(plan));
        })
       }
    })
})