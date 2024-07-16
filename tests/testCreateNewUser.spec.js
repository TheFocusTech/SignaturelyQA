import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import { URL_END_POINTS } from '../testData.js';
import { description, severity, Severity, epic, feature } from 'allure-js-commons';

test.describe('Verification of supporting tests', () => {
    test('Create Free User', async ({ createFreeUserAndLogin, signPage, settingsCompanyPage }) => {
        await description('Tests to maintain New User Creation.');
        await severity(Severity.BLOCKER);
        await epic('Verification of supporting tests');
        await feature('Tests to maintain New User Creation.');

        await signPage.sideMenu.clickSettings();
        await expect(settingsCompanyPage.page).toHaveURL(process.env.URL + URL_END_POINTS.settingsCompanyEndPoint);
    });

    test('Create Business User.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsBillingPlanPage,
        settingsBillingPage,
    }) => {
        await severity(Severity.BLOCKER);
        await epic('Verification of supporting tests');
        await feature('Tests to maintain New User Creation.');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await expect(settingsBillingPage.billingPlanWrapper).toContainText('Business');
        await expect(settingsBillingPlanPage.page).toHaveURL(process.env.URL + URL_END_POINTS.settingsBillingEndPoint);
    });
});