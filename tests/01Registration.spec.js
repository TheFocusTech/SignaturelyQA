import { expect } from "@playwright/test";
import { test } from "../fixtures/base"
import {
    retrieveUserEmailConfirmationLink,
    createNewUserThroughApi,
    createNewFreeUserThroughApi,
    retrieveUserEmailConfirmCode,
} from "../helpers/utils";
import {
    URL_END_POINTS, BUSINESS_MONTHLY_PLAN, CARD_DETAILS, FREE_PLAN_DESCRIPTION, SUBSCRIPTIONS, SUBSCRIBE_TO_PERSONAL_PLAN,
    PLEASE_ENTER_CONFIRMATION_CODE, PERSONAL_PLAN_DESCRIPTION,
} from "../testData";
import { generateNewUserData } from "../helpers/utils";
import {description, tag, severity, Severity, link, epic, step} from "allure-js-commons";

test.describe('Registration', () => {

    test('TC_01_01_01 | Verify successful registration of Trial user', async ({page, request, signUpTrialPage, activateTrialStripePage, signPage, settingsCompanyPage, settingsBillingPage}) => {
        await description('To verify that a Trial user can successfully register.');
        await tag('Trial user');
        await severity(Severity.BLOCKER);
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.3auuqi4u4l4v",
            "TC_01_01_01"
        );
        await epic('Registration');

        const newUserData = await generateNewUserData();
        await step('Navigate to the Trial user registration page', async () => {
            await page.goto(URL_END_POINTS.signUpTrialEndPoint);
        });
        await signUpTrialPage.yourInformation.fillNameInputField(newUserData.name);
        await signUpTrialPage.yourInformation.fillEmailInputField(newUserData.email);
        await signUpTrialPage.yourInformation.fillPasswordInputField(newUserData.password);
        await signUpTrialPage.clickCreateAccountBtn();
        await step('Verify that the user is on the Confirm account page', async () => {
            await expect(page).toHaveURL(`${process.env.URL}${URL_END_POINTS.confirmAccountEndPoint}`);
        });

        const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData);
        await step("Navigate to the confirmation link", async () => {
            await page.goto(confirmationLink);
        });
        await page.waitForURL(`${process.env.URL}${URL_END_POINTS.activateTrialEndPoint}`);
        await step("Verify that the user's name appears in the header of the page", async () => {
            await expect(activateTrialStripePage.header.userName).toHaveText(newUserData.name);
        });

        await activateTrialStripePage.cardDetails.fillData(CARD_DETAILS.VISA);
        await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await step("Verify that the billing plan description is Business Monthly Plan", async () => {
            await expect(settingsBillingPage.billingPlanDescription).toHaveText(BUSINESS_MONTHLY_PLAN);
        });
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