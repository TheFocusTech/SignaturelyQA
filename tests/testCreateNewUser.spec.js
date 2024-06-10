import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import SignPage from '../page_objects/signPage.js';

test('Create Free User', async ({ page, request, createFreeUserAndLogin }) => {
    const signPage = new SignPage(page);

    await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
    await expect(page).toHaveURL(`${process.env.URL}/settings/company`)
});

test('Create Business User', async ({ page, request, createBusinessUserAndLogin }) => {
    const signPage = new SignPage(page);
    const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
    const settingsBillingPage = await settingsCompanyPage.clickSettingsBillingSidebarLinkAngGoSettingsBillingPage();

    const plan = settingsBillingPage.locators.getBillingPlanWrapper();
    await expect (plan).toContainText ('Business', {exact: true} )
    await expect(page).toHaveURL(`${process.env.URL}/settings/billing`);
});