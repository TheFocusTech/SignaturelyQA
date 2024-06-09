import { expect } from '@playwright/test';
import { test, createBusinessUserAndLogin } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import {TOASTER_MESSAGE} from '../testData.js';

test.describe.skip('Billing', () => {

    test('TC_14_57_02 | Verify the ability to successfully downgrade subscription', async ({page,createBusinessUserAndLogin}) => {
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
})