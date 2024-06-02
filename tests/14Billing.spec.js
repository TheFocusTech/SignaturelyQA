import { expect } from '@playwright/test';
import { test, loginBusinessUser } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";

test.describe('Billing', () => {

    test('TC_14_57_02 | Verify the ability to successfully downgrade subscription', async ({page,loginBusinessUser}) => {
        const signPage = new SignPage(page);

        const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
        const settingsBillingPage = await settingsCompanyPage.clickSettingsBillingSidebarLinkAngGoSettingsBillingPage();
        const settingsBillingPlanPage = await settingsBillingPage.clickEditPlanBtnAndGoSettingsBillingPlanPage();

        await settingsBillingPlanPage.clickPersonalPlanSelectBtn();
        await settingsBillingPlanPage.clickDowngradeBtn();

        await expect(settingsBillingPlanPage.locators.getToasterPopup()).toHaveText('Plan has been successfully changed.');        
        await expect(settingsBillingPlanPage.locators.getRenewBusinessPlanBtn()).toBeVisible();
        
        await settingsBillingPlanPage.clickToasterCloseSuccessBtn();
        await settingsBillingPlanPage.clickRenewBusinessPlanBtn();
        await expect(settingsBillingPlanPage.locators.getToasterPopup()).toHaveText('Plan has been renew');
        await expect(settingsBillingPlanPage.locators.getCurrentPlanBtn()).toBeVisible();
    })
})