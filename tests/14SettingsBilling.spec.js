import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import {
    CARD_DETAILS,
    RANDOM_ANNUALLY_PLAN,
    PLANS,
    END_PLAN,
    QASE_LINK,
    GOOGLE_DOC_LINK,
    TOAST_MESSAGE,
    BUSINESS_ANNUALLY_PLAN,
    RANDOM_MONTHLY_PLAN,
} from '../testData.js';
import { description, tags, severity, Severity, link, epic, feature, step } from 'allure-js-commons';

test.describe('Billing', () => {
    test('TC_14_57_02 | Verify user can downgrade subscription.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsBillingPage,
        settingsBillingPlanPage,
        downgradeToPersonalPlanModal,
        specialOneTimeOfferModal,
    }) => {
        await description('To verify user can downgrade subscription.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-57`, 'Qase: SIGN-57');
        await link(`${GOOGLE_DOC_LINK}83e29wiaygvp`, 'ATC_14_57_02');
        await epic('Settings');
        await feature('Billing');
        await tags('Subscription');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await settingsBillingPage.clickEditPlanButton();
        await settingsBillingPlanPage.clickSelectPersonalPlanButton();
        await downgradeToPersonalPlanModal.clickDowngradeButton();
        await specialOneTimeOfferModal.clickNoThanksModalBtn();
        await settingsBillingPlanPage.sideMenuSettings.clickBilling();

        await step('Verify text "Your plan will end on" displayed on Billing page.', async () => {
            await expect(settingsBillingPage.nextInvoiceInfo).toContainText(END_PLAN);
        });
    });

    PLANS.forEach((plan) => {
        test(`TC_14_56_01 | Verify user can upsell subscription ${plan} plan.`, async ({
            createFreeUserAndLogin,
            signPage,
            settingsCompanyPage,
            settingsBillingPage,
            settingsBillingPlanPage,
            upgradeYourPlanModal,
            specialOneTimeOfferModal,
        }) => {
            await description('To verify Free user can upgrade subscription plan.');
            await severity(Severity.CRITICAL);
            await link(`${QASE_LINK}/SIGN-56`, 'Qase: SIGN-56');
            await link(`${GOOGLE_DOC_LINK}8e0ff2hol3sq`, 'ATC_14_56_01');
            await epic('Settings');
            await feature('Billing');
            await tags('Upsell');

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.horizontalMenu.clickBilling();
            await settingsBillingPage.clickUpgradePlanButton();
            await settingsBillingPlanPage.clickUpgradeButton(plan);
            await upgradeYourPlanModal.cardDetails.fillData(CARD_DETAILS.VISA);
            await upgradeYourPlanModal.clickSubscribeButton();
            await specialOneTimeOfferModal.clickYesUpgradeMeBtn();
            await step(`Verify billing plan is ${plan} Annually Plan.`, async () => {
                await expect(settingsBillingPlanPage.billingHeader).toContainText(RANDOM_ANNUALLY_PLAN(plan));
            });
        });
    });

    test('TC_14_54_01 | Verify user can attach/delete payment card.', async ({
        createFreeUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsBillingPage,
    }) => {
        await description(
            'To verify the functionality of attaching a payment card through the settings-billing section and deleting a payment card through the Billing Portal. \n Attention: Refresh the page and extra wait 1 sec.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-54`, 'Qase: SIGN-54');
        await link(`${GOOGLE_DOC_LINK}khucr6xuqdib`, 'ATC_14_54_01');
        await epic('Settings');
        await feature('Billing');
        await tags('Payment Card', 'Billing Portal');

        test.setTimeout(100 * 1000);
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickBilling();
        let stripeEnterPaymentDetailsPage = await settingsBillingPage.clickAttachCardButton();
        await stripeEnterPaymentDetailsPage.attachCard(CARD_DETAILS.VISA_DEBIT);
        await settingsBillingPage.reloadPage();

        await step('Verify added payment card displayed on Billing page.', async () => {
            await expect(settingsBillingPage.creditCardData).toHaveText(
                CARD_DETAILS.VISA_DEBIT.displayingOnTheBillingPage
            );
        });

        stripeEnterPaymentDetailsPage = await settingsBillingPage.clickAttachCardButton();
        await stripeEnterPaymentDetailsPage.attachCard(CARD_DETAILS.MASTERCARD);
        await settingsBillingPage.reloadPage();

        await step('Verify added payment card displayed on Billing pag', async () => {
            await expect(settingsBillingPage.creditCardData).toHaveText(
                CARD_DETAILS.MASTERCARD.displayingOnTheBillingPage
            );
        });

        let settingBillingPortalPage = await settingsBillingPage.clickOpenBillingPortalButton();

        await step('Verify payment card displayed on Billing Portal page.', async () => {
            await expect(settingBillingPortalPage.paymentDefaultMethod).toHaveText(
                CARD_DETAILS.MASTERCARD.displayingOnTheBillingPortalPage
            );
        });

        await settingBillingPortalPage.deleteAllNotDefaultCards();

        await step('Verify there is only one payment card displayed on Billing Portal page.', async () => {
            await expect(settingBillingPortalPage.paymentMethodsList).toHaveCount(1);
        });
        await step('Verify there is the last added payment card displayed on Billing Portal page.', async () => {
            await expect(settingBillingPortalPage.paymentMethodsList).toHaveText(
                CARD_DETAILS.MASTERCARD.displayingOnTheBillingPortalPage
            );
        });
    });

    test('TC_14_57_01 | Verify user can upgrade subscription (from Monthly to Annually).', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsBillingPage,
        settingsBillingPlanPage,
        upgradeYourPlanModal,
    }) => {
        await description(
            'To verify user can successfully upgrade their subscription from monthly plan to annual plan.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-57`, 'Qase: SIGN-57');
        await link(`${GOOGLE_DOC_LINK}56zml0w3xji7`, 'ATC_14_57_01');
        await epic('Settings');
        await feature('Billing');
        await tags('Subscription');

        test.slow();
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await settingsBillingPage.clickEditPlanButton();
        await settingsBillingPlanPage.switchMonthlyAnnyallyToggle();
        await settingsBillingPlanPage.clickUpgradeButton(PLANS[1]);
        await upgradeYourPlanModal.clickSubscribeButton();
        await settingsBillingPlanPage.toast.waitForToastText();

        await step('Verify toast message.', async () => {
            await expect(await settingsBillingPlanPage.toast.toastBody).toHaveText(TOAST_MESSAGE.planSuccessChange);
        });

        await settingsBillingPlanPage.sideMenuSettings.clickBilling();

        await step('Verify Billing plan description is Business.', async () => {
            await expect(await settingsBillingPage.billingPlanDescription).toHaveText(BUSINESS_ANNUALLY_PLAN);
        });
    });

    test('TC_14_58_01 | Verify ability to successfully cancel subscription.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsBillingPage,
        cancelSubscriptionModal,
    }) => {
        await description('To verify users can cancel their subscription.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-58`, 'Qase: SIGN-58');
        await link(`${GOOGLE_DOC_LINK}iqyp5s242v7c`, 'ATC_14_58_01');
        await epic('Settings');
        await feature('Billing');
        await tags('Subscription');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await settingsBillingPage.clickCancelSubscriptionButton();
        await cancelSubscriptionModal.clickCancelSubscriptionButton();

        await step('Verify plan cancel message has appeared.', async () => {
            await expect(settingsBillingPage.nextInvoiceInfo).toContainText(END_PLAN);
        });
    });

    PLANS.forEach((plan) => {
        test(`TC_14_55_01 | Verify ability to successfully select subscription ${plan} plan.`, async ({
            createFreeUserAndLogin,
            signPage,
            settingsCompanyPage,
            settingsBillingPage,
            settingsBillingPlanPage,
            upgradeYourPlanModal,
            specialOneTimeOfferModal,
        }) => {
            await description('To verify Free users can successfully upgrade their subscription plan.');
            await severity(Severity.CRITICAL);
            await link(`${QASE_LINK}/SIGN-55`, 'Qase: SIGN-55');
            await link(`${GOOGLE_DOC_LINK}xfly7b3oksv7`, 'ATC_14_55_01');
            await epic('Settings');
            await feature('Billing');
            await tags('Subscription');

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.horizontalMenu.clickBilling();
            await settingsBillingPage.clickUpgradePlanButton();
            await settingsBillingPlanPage.clickUpgradeButton(plan);
            await upgradeYourPlanModal.cardDetails.fillData(CARD_DETAILS.VISA);
            await upgradeYourPlanModal.clickSubscribeButton();
            await settingsBillingPlanPage.toast.waitForToastText();

            await step('Verify toast message.', async () => {
                await expect(await settingsBillingPlanPage.toast.toastBody).toHaveText(TOAST_MESSAGE.planSuccessChange);
            });

            await specialOneTimeOfferModal.clickNoThanksModalBtn();
            await step(`Verify Billing plan is ${plan} Monthly Plan.`, async () => {
                await expect(settingsBillingPlanPage.billingHeader).toContainText(RANDOM_MONTHLY_PLAN(plan));
            });
        });
    });
});
