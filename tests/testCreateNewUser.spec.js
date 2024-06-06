import { expect } from '@playwright/test';
import { test, createFreeUser, createBusinessUser } from "../fixtures/base.js";
import SignPage from '../page_objects/signPage.js';

test('Create Free User', async ({ page, request, createFreeUser }) => {
    const signPage = new SignPage(page);

    await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
    await expect(page).toHaveURL(`${process.env.URL}/settings/company`)
});

test('Create Business User', async ({ page, request, createBusinessUser }) => {
    const signPage = new SignPage(page);
    const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
    const settingsBillingPage = await settingsCompanyPage.clickSettingsBillingSidebarLinkAngGoSettingsBillingPage();

    const plan = settingsBillingPage.locators.getBillingPlanWrapper();
    await expect (plan).toContainText ('Business', {exact: true} )
    await expect(page).toHaveURL(`${process.env.URL}/settings/billing`);
});