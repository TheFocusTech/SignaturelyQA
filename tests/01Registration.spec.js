import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { retrieveUserEmailConfirmationLink, retrieveUserEmailConfirmCode } from '../helpers/utils';
import {
    URL_END_POINTS,
    BUSINESS_MONTHLY_PLAN,
    CARD_DETAILS,
    FREE_PLAN_DESCRIPTION,
    SUBSCRIPTIONS,
    SUBSCRIBE_TO_PERSONAL_PLAN,
    SUBSCRIBE_TO_BUSINESS_PLAN,
    PLEASE_ENTER_CONFIRMATION_CODE,
    PERSONAL_PLAN_DESCRIPTION,
    BUSINESS_PLAN_DESCRIPTION,
    NO_ATTACHED_CARD,
    EMAIL_SUBJECTS,
    QASE_LINK,
    GOOGLE_DOC_LINK,
} from '../testData';
import { generateNewUserData } from '../helpers/utils';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Registration', () => {
    test('TC_01_01_01 | Verify successful registration of the Trial user', async ({
        page,
        request,
        signUpTrialPage,
        activateTrialStripePage,
        signPage,
        settingsCompanyPage,
        settingsBillingPage,
    }) => {
        await description('To verify the Trial user can successfully register');
        await tag('Trial user');
        await severity(Severity.BLOCKER);
        await link(`${QASE_LINK}/SIGN-1`, 'Qase: SIGN-1');
        await link(`${GOOGLE_DOC_LINK}3auuqi4u4l4v`, 'ATC_01_01_01');
        await epic('Registration');

        const newUserData = await generateNewUserData();
        await step('Navigate to the Trial user registration page', async () => {
            await page.goto(URL_END_POINTS.signUpTrialEndPoint);
        });
        await signUpTrialPage.yourInformation.fillNameInputField(newUserData.name);
        await signUpTrialPage.yourInformation.fillEmailInputField(newUserData.email);
        await signUpTrialPage.yourInformation.fillPasswordInputField(newUserData.password);
        await signUpTrialPage.clickCreateAccountBtn();
        await step('Verify the user is on the Confirm account page', async () => {
            await expect(page).toHaveURL(`${process.env.URL}${URL_END_POINTS.confirmAccountEndPoint}`);
        });

        const confirmationLink = await retrieveUserEmailConfirmationLink(
            request,
            newUserData.email,
            EMAIL_SUBJECTS.emailConfirmation
        );
        await step('Navigate to the confirmation link', async () => {
            await page.goto(confirmationLink);
        });
        await page.waitForURL(`${process.env.URL}${URL_END_POINTS.activateTrialEndPoint}`);
        await step("Verify the user's name appears in the header of the page", async () => {
            await expect(activateTrialStripePage.header.userName).toHaveText(newUserData.name);
        });

        await activateTrialStripePage.cardDetails.fillData(CARD_DETAILS.VISA);
        await activateTrialStripePage.clickStartMy7DayFreeTrialBtn();
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await step('Verify the billing plan description is Business Monthly Plan', async () => {
            await expect(settingsBillingPage.billingPlanDescription).toHaveText(BUSINESS_MONTHLY_PLAN);
        });
    });

    test('TC_01_02_01 | Verify successful registration of the Free user', async ({
        page,
        request,
        signUpFreePage,
        signPage,
        settingsCompanyPage,
        settingsBillingPage,
    }) => {
        await description('To verify the Free user can successfully register');
        await tag('Free user');
        await severity(Severity.BLOCKER);
        await link(`${QASE_LINK}SIGN-2`, 'Qase: SIGN-2');
        await link(`${GOOGLE_DOC_LINK}18wd1qo653v`, 'ATC_01_02_01');
        await epic('Registration');

        const newUserData = await generateNewUserData();
        await step('Navigate to the Free user registration page', async () => {
            await page.goto(URL_END_POINTS.signUpFree);
        });
        await signUpFreePage.yourInformation.fillNameInputField(newUserData.name);
        await signUpFreePage.yourInformation.fillEmailInputField(newUserData.email);
        await signUpFreePage.yourInformation.fillPasswordInputField(newUserData.password);
        await signUpFreePage.clickCreateAccountBtn();
        await step('Verify the user is on the Confirm account page', async () => {
            await expect(page).toHaveURL(`${process.env.URL}${URL_END_POINTS.confirmAccountEndPoint}`);
        });

        const confirmationLink = await retrieveUserEmailConfirmationLink(
            request,
            newUserData.email,
            EMAIL_SUBJECTS.emailConfirmation
        );
        await step('Navigate to the Confirmation link', async () => {
            await page.goto(confirmationLink);
        });
        await page.waitForURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickBilling();
        await step('Verify no card is attached', async () => {
            await expect(settingsBillingPage.creditCardData).toHaveText(NO_ATTACHED_CARD);
        });
        await step('Verify the billing plan description is Free', async () => {
            await expect(settingsBillingPage.billingPlanDescription).toHaveText(FREE_PLAN_DESCRIPTION);
        });
    });

    SUBSCRIPTIONS.forEach((subscription) => {
        test(`TC_01_03_01 | Verify successful registration of Personal user with ${subscription} subscription`, async ({
            request,
            page,
            signUpPersonalPage,
            confirmCodeModal,
            signPage,
            settingsCompanyPage,
            settingsBillingPage,
        }) => {
            await description('To verify the Personal user can successfully register.');
            await tag('Personal user');
            await severity(Severity.BLOCKER);
            await link(`${QASE_LINK}/SIGN-3`, 'Qase: SIGN-3');
            await link(`${GOOGLE_DOC_LINK}ygd7jqo6djdj`, 'ATC_01_03_01');
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
            await step('Verify the user is on the Home page', async () => {
                await expect(page).toHaveURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);
            });
            await step("Verify the user's name appears in the header of the page", async () => {
                await expect(signPage.header.userName).toHaveText(newUserData.name);
            });

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.horizontalMenu.clickBilling();
            await step(
                `Verify that the billing plan description is Business Personal ${subscription} Plan`,
                async () => {
                    await expect(settingsBillingPage.billingPlanDescription).toHaveText(
                        PERSONAL_PLAN_DESCRIPTION(subscription)
                    );
                }
            );
        });
    });

    SUBSCRIPTIONS.forEach((subscription)=>{
        test(`TC_01_59_01| Verify successful registration of Business User with ${subscription} subscription`, async({
        request,
        page,
        signUpBusinessPage,
        confirmCodeModal,
        signPage,
        settingsCompanyPage,
        settingsBillingPage
        })=>{
            await description('To verify the Business user can successfully register');
            await tag('Business User');
            await severity(Severity.BLOCKER);
            await link(
                `${QASE_LINK}/SIGN-59`,
                "Qase:Sign-59"
            );
            await link(
                `${GOOGLE_DOC_LINK}bfiytgerhgx1`,
                "ATC_01_59_01"
            );
            await epic('Registration');

            const newUserData = await generateNewUserData();
            await step('Navigate to the Business user registration page',async()=>{
                await page.goto(URL_END_POINTS.signUpBusinessEndPoint);
            });
            await step('Verify the Business user registration page title',async()=>{
                await expect(signUpBusinessPage.businessPageLabelTitle).toHaveText(SUBSCRIBE_TO_BUSINESS_PLAN);
            });

            await signUpBusinessPage.yourInformation.fillNameInputField(newUserData.name);
            await signUpBusinessPage.yourInformation.fillEmailInputField(newUserData.email);
            await signUpBusinessPage.yourInformation.fillPasswordInputField(newUserData.password);
            await signUpBusinessPage.clickSubscriptionButton(subscription);
            await signUpBusinessPage.cardDetails.fillData(CARD_DETAILS.VISA);
            await signUpBusinessPage.clickPurchaseNowButton();
            await step('Verify the Confirm modal title',async()=>{
                await expect(confirmCodeModal.confirmCodeModalTitle).toHaveText(PLEASE_ENTER_CONFIRMATION_CODE);
            });

            const confirmCode=await retrieveUserEmailConfirmCode(request,newUserData.email);
            await confirmCodeModal.fillConfirmCodeInputField(confirmCode);
            await confirmCodeModal.clickSendButton();
            await step('Verify the user is on the Home page',async()=>{
                await expect(page).toHaveURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);
            });
            await step("Verify the user's name appears in the header of the page",async()=>{
                await expect(signPage.header.userName).toHaveText(newUserData.name);
            });

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.horizontalMenu.clickBilling();
            await step(`Verify the billing plan description is Business Personal ${subscription} Plan`,async()=>{
                await expect(settingsBillingPage.billingPlanDescription).toHaveText(BUSINESS_PLAN_DESCRIPTION(subscription));
            });
        })
    })
});
