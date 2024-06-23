import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import { URL_END_POINTS } from '../testData.js';

test.describe('Out of scope. Tests to maintain New User Creation.', () => {

    test('Create Free User', async ({
        createFreeUserAndLogin,
        signPage,
        settingsCompanyPage }) => {

        await signPage.sideMenu.clickSettings();
        await expect(settingsCompanyPage.page).toHaveURL(process.env.URL + URL_END_POINTS.settingsCompanyEndPoint)
    });

    test('Create Business User', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsBillingPlanPage,
        settingsBillingPage }) => {

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await expect(settingsBillingPage.billingPlanWrapper).toContainText('Business')
        await expect(settingsBillingPlanPage.page).toHaveURL(process.env.URL + URL_END_POINTS.settingsBillingEndPoint);
    });
})