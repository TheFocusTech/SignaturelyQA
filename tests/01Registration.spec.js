import { expect } from "@playwright/test";
import { test } from "../fixtures/base"
import {
    retrieveUserEmailConfirmationLink,
    retrieveUserEmailConfirmCode,
} from "../helpers/utils";
import {
    URL_END_POINTS, BUSINESS_MONTHLY_PLAN, CARD_DETAILS, FREE_PLAN_DESCRIPTION, SUBSCRIPTIONS, SUBSCRIBE_TO_PERSONAL_PLAN,
    PLEASE_ENTER_CONFIRMATION_CODE, PERSONAL_PLAN_DESCRIPTION, NO_ATTACHED_CARD,
} from "../testData";
import { generateNewUserData } from "../helpers/utils";
import {description, tag, severity, Severity, link, epic, step} from "allure-js-commons";

test.describe('Registration', () => {

    test('TC_01_01_01 | Verify successful registration of Trial user', async ({page, request, signUpTrialPage, activateTrialStripePage, signPage, settingsCompanyPage, settingsBillingPage}) => {
        await description('To verify that a Trial user can successfully register.');
        await tag('Trial user');
        await severity(Severity.BLOCKER);
        await link("https://app.qase.io/case/SIGN-1",
                "Qase: SIGN-1");
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.3auuqi4u4l4v",
            "ATC_01_01_01"
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

        const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData.email);
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

    test('TC_01_02_01 | Verify successful registration of Free user', async ({ page, request, signUpFreePage, signPage, settingsCompanyPage, settingsBillingPage}) => {
        await description('To verify that a Free user can successfully register.');
        await tag('Free user');
        await severity(Severity.BLOCKER);
        await link("https://app.qase.io/case/SIGN-2",
                "Qase: SIGN-2");
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.18wd1qo653v",
            "ATC_01_02_01"
        );
        await epic('Registration');

        const newUserData = await generateNewUserData();
        await step('Navigate to the Free user registration page', async () => {
            await page.goto(URL_END_POINTS.signUpFree);
        });
        await signUpFreePage.yourInformation.fillNameInputField(newUserData.name);
        await signUpFreePage.yourInformation.fillEmailInputField(newUserData.email);
        await signUpFreePage.yourInformation.fillPasswordInputField(newUserData.password);
        await signUpFreePage.clickCreateAccountBtn();
        await step('Verify that the user is on the Confirm account page', async () => {
            await expect(page).toHaveURL(`${process.env.URL}${URL_END_POINTS.confirmAccountEndPoint}`);
        });

        const confirmationLink = await retrieveUserEmailConfirmationLink(request, newUserData.email);
        await step("Navigate to the confirmation link", async () => {
            await page.goto(confirmationLink);
        });
        await page.waitForURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickBilling();
        await step('Verify that no card attached', async () => {
            await expect(settingsBillingPage.creditCardData).toHaveText(NO_ATTACHED_CARD);
        });
        await step('Verify that the billing plan description is Free', async () => {
            await expect(settingsBillingPage.billingPlanDescription).toHaveText(FREE_PLAN_DESCRIPTION);
        });
    })

    SUBSCRIPTIONS.forEach((subscription) => {
        test(`TC_01_03_01 | Verify successful registration of Personal user with ${subscription} subscription`, async ({ request, page, signUpPersonalPage, confirmCodeModal, signPage, settingsCompanyPage, settingsBillingPage }) => {
            await description('To verify that a Personal user can successfully register.');
            await tag('Personal user');
            await severity(Severity.BLOCKER);
            await link("https://app.qase.io/case/SIGN-3",
                    "Qase: SIGN-3");
            await link(
                "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ygd7jqo6djdj",
                "ATC_01_03_01"
            );
            await epic('Registration');

            const newUserData = await generateNewUserData();
            await step('Navigate to the Personal user registration page', async () => {
                await page.goto(URL_END_POINTS.signUpPersonalEndPoint);
            });
            await step('Verify the Personal user registration page title', async () => {
                await expect(signUpPersonalPage.personalPageLabelTitle).toHaveText(SUBSCRIBE_TO_PERSONAL_PLAN);
            });

            await signUpPersonalPage.yourInformation.fillNameInputField(newUserData.name);
            await signUpPersonalPage.yourInformation.fillEmailInputField(newUserData.email);
            await signUpPersonalPage.yourInformation.fillPasswordInputField(newUserData.password);
            await signUpPersonalPage.clickSubscriptionButton(subscription);
            await signUpPersonalPage.cardDetails.fillData(CARD_DETAILS.VISA);
            await signUpPersonalPage.clickPurchaseNowButton();
            await step('Verify the Confirm modal title', async () => {
                await expect(confirmCodeModal.confirmCodeModalTitle).toHaveText(PLEASE_ENTER_CONFIRMATION_CODE);
            });

            const confirmCode = await retrieveUserEmailConfirmCode(request, newUserData.email);
            await confirmCodeModal.fillConfirmCodeInputField(confirmCode);
            await confirmCodeModal.clickSendButton();
            await step('Verify that the user is on the Home page', async () => {
                await expect(page).toHaveURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);
            });
            await step('Verify that the users name appears in the header of the page', async () => {
                await expect(signPage.header.userName).toHaveText(newUserData.name);
            });

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.horizontalMenu.clickBilling();
            await step(`Verify that the billing plan description is Business Personal ${subscription} Plan`, async () => {
                await expect(settingsBillingPage.billingPlanDescription).toHaveText(PERSONAL_PLAN_DESCRIPTION(subscription));
            });
        })
    })
})