import { expect } from "@playwright/test";
import { test } from "../fixtures/base"
import {
    retrieveUserEmailConfirmationLink,
    createNewUserThroughApi,
    createNewFreeUserThroughApi,
    retrieveUserEmailConfirmCode,
} from "../helpers/utils";
import {
    URL_END_POINTS, START_YOUR_FREE_TRIAL_STATEMENT, BILLING_INFORMATION, BUSINESS_MONTHLY_PLAN, CARD_DETAILS,
    FREE_PLAN_DESCRIPTION, SUBSCRIPTIONS, SUBSCRIBE_TO_PERSONAL_PLAN, PLEASE_ENTER_CONFIRMATION_CODE, PERSONAL_PLAN_DESCRIPTION,
} from "../testData";

test.describe('Registration', () => {

    test('TC_01_01_02 | Verify that user redirects to the Activate-trial page', async ({ page, request, activateTrialStripePage }) => {
        const newUserData = await createNewUserThroughApi(request);
        const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData);

        await page.goto(confirmationLink);
        await page.waitForURL(`${process.env.URL}${URL_END_POINTS.activateTrialEndPoint}`);

        await expect(activateTrialStripePage.userHeaderName).toHaveText(newUserData.name);
        await expect(activateTrialStripePage.freeTrialStatement).toContainText(START_YOUR_FREE_TRIAL_STATEMENT);
        await expect(activateTrialStripePage.billingInfoHeader).toHaveText(BILLING_INFORMATION)
    })

    test('TC_01_01_03 | Verify that user redirects to the homepage after filling Billing information', async ({ request, page, activateTrialStripePage, signPage, settingsCompanyPage, settingsBillingPage }) => {
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

    test('TC_01_02_02 | Verify that Free user redirects to the SignPage after confirmation of the registration', async ({ page, request, signPage, settingsCompanyPage, settingsBillingPage}) => {
        const newUserData = await createNewFreeUserThroughApi(request);
        const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData);

        await page.goto(confirmationLink);
        await page.waitForURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickBilling();
        await expect(settingsBillingPage.billingPlanDescription).toHaveText(FREE_PLAN_DESCRIPTION);
    })

    test.describe('Personal User registration', () => {
        for (const subscription of SUBSCRIPTIONS) {
            test(`TC_01_03_01 | Verify successful Personal User registration with ${subscription} subscription`, async ({request, page, signUpPersonalPage, confirmCodeModal, signPage, settingsCompanyPage, settingsBillingPage }) => {
                const newUserData = await createNewUserThroughApi(request);
                await page.goto(URL_END_POINTS.signUpPersonalEndPoint);
                await expect(signUpPersonalPage.personalPageLabelTitle).toHaveText(SUBSCRIBE_TO_PERSONAL_PLAN);

                await signUpPersonalPage.fillNameInputField(newUserData.name);
                await signUpPersonalPage.fillEmailInputField(newUserData.email);
                await signUpPersonalPage.fillPasswordInputField(newUserData.password);
                await signUpPersonalPage.clickSubscriptionButton(subscription);
                await signUpPersonalPage.cardDetails.fillData(CARD_DETAILS.VISA);
                await signUpPersonalPage.clickPurchaseNowButton();
                await expect(confirmCodeModal.confirmCodeModalTitle).toHaveText(PLEASE_ENTER_CONFIRMATION_CODE);

                const confirmCode = await retrieveUserEmailConfirmCode(request, newUserData.email);
                await confirmCodeModal.fillConfirmCodeInputField(confirmCode);
                await confirmCodeModal.clickSendButton();
                await expect(signPage.header.userName).toHaveText(newUserData.name);

                await signPage.sideMenu.clickSettings();
                await settingsCompanyPage.horizontalMenu.clickBilling();
                await expect(settingsBillingPage.billingPlanDescription).toHaveText(PERSONAL_PLAN_DESCRIPTION(subscription));
            })
        }
    })
})