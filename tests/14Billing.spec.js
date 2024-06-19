import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage.js";
import {ACTION_BUTTON, VISA_CARD_DATA, RANDOM_ANNUALLY_PLAN, PLANS} from '../testData.js';

test.describe('Billing', () => {

    test('TC_14_57_02 | Verify the ability to successfully downgrade subscription', async ({createBusinessUserAndLogin, signPage, settingsCompanyPage, settingsBillingPage, settingsBillingPlanPage, downgradeToPersonalPlanModal, specialOneTimeOfferModal}) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await settingsBillingPage.clickEditPlanButton();
        await settingsBillingPlanPage.clickSelectPersonalPlanButton();
        await downgradeToPersonalPlanModal.clickDowngradeButton();        
        await specialOneTimeOfferModal.clickNoThanksModalBtn();
        await expect(settingsBillingPlanPage.businessPlanActionButton).toHaveText(ACTION_BUTTON.renew);         
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