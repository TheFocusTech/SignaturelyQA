import { expect } from "@playwright/test";
import { test } from "../fixtures/base"
import {
    retrieveUserEmailConfirmationLink,
    createNewUserThroughApi,
    createNewFreeUserThroughApi,
} from "../helpers/utils";
import {
    URL_END_POINTS,
    START_YOUR_FREE_TRIAL_STATEMENT,
    BILLING_INFORMATION,
    BUSINESS_MONTHLY_PLAN,
    CARD_DETAILS,
    FREE_PLAN_DESCRIPTION
} from "../testData";

test('TC_01_01_02 | Verify that user redirects to the Activate-trial page', async ({page, request, activateTrialStripePage}) => {
    const newUserData = await createNewUserThroughApi(request);
    const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData);

    await page.goto(confirmationLink);
    await page.waitForURL(`${process.env.URL}${URL_END_POINTS.activateTrialEndPoint}`);

    await expect(activateTrialStripePage.userHeaderName).toHaveText(newUserData.name);
    await expect(activateTrialStripePage.freeTrialStatement).toContainText(START_YOUR_FREE_TRIAL_STATEMENT);
    await expect(activateTrialStripePage.billingInfoHeader).toHaveText(BILLING_INFORMATION)
})

test('TC_01_01_03 | Verify that user redirects to the homepage after filling Billing information',
    async ({page, request, activateTrialStripePage, signPage, settingsCompanyPage, settingsBillingPage, settingsBillingPlanPage}) => {
    const newUserData = await createNewUserThroughApi(request);
    const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData);

    await page.goto(confirmationLink);
    await activateTrialStripePage.cardDetails.fillData(CARD_DETAILS.VISA);
    await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();
    await expect(signPage.userHeaderName).toHaveText(newUserData.name);

    await signPage.sideMenu.clickSettings();
    await settingsCompanyPage.sideMenuSettings.clickBilling();
    await expect(settingsBillingPage.billingPlanDescription).toHaveText(BUSINESS_MONTHLY_PLAN)
 })

test('TC_01_02_02 | Verify that Free user redirects to the SignPage after confirmation of the registration', async({page, request, signPage, settingsCompanyPage, settingsBillingPage}) => {
    const newUserData = await createNewFreeUserThroughApi(request);
    const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData);

    await page.goto(confirmationLink);
    await page.waitForURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);

    await signPage.sideMenu.clickSettings();
    await settingsCompanyPage.horizontalMenu.clickBilling();
    await expect(settingsBillingPage.billingPlanDescription).toHaveText(FREE_PLAN_DESCRIPTION);
})