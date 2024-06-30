import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { CARD_DETAILS, RANDOM_ANNUALLY_PLAN, PLANS, END_PLAN, QASE_LINK, GOOGLE_DOC_LINK } from '../testData.js';
import { description, tags, severity, Severity, link, epic, feature, step } from 'allure-js-commons';

test.describe('Billing', () => {
    test('TC_14_57_02 | Verify the ability to successfully downgrade subscription', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsBillingPage,
        settingsBillingPlanPage,
        downgradeToPersonalPlanModal,
        specialOneTimeOfferModal,
    }) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await settingsBillingPage.clickEditPlanButton();
        await settingsBillingPlanPage.clickSelectPersonalPlanButton();
        await downgradeToPersonalPlanModal.clickDowngradeButton();
        await specialOneTimeOfferModal.clickNoThanksModalBtn();
        await settingsBillingPlanPage.sideMenuSettings.clickBilling();

        await expect(settingsBillingPage.nextInvoiceInfo).toContainText(END_PLAN);
    });

    PLANS.forEach((plan) => {
        test(`TC_14_56_01 | Verify successful upsell of users subscription ${plan} plan`, async ({
            createFreeUserAndLogin,
            signPage,
            settingsCompanyPage,
            settingsBillingPage,
            settingsBillingPlanPage,
            upgradeYourPlanModal,
            specialOneTimeOfferModal,
        }) => {
            await description('Objective: Verify that free users can successfully upgrade their subscription plan.\n');
            await severity(Severity.CRITICAL);
            await link(`${QASE_LINK}/SIGN-56`, 'Qase: SIGN-56');
            await link(`${GOOGLE_DOC_LINK}8e0ff2hol3sq`, 'ATC_14_56_01');
            await epic('Setting');
            await feature('Billing');
            await tags('Upsell');

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.horizontalMenu.clickBilling();
            await settingsBillingPage.clickUpgradePlanButton();
            await settingsBillingPlanPage.clickUpgradeButton(plan);
            await upgradeYourPlanModal.cardDetails.fillData(CARD_DETAILS.VISA);
            await upgradeYourPlanModal.clickSubscribeButton();
            await specialOneTimeOfferModal.clickYesUpgradeMeBtn();
            await step(`Verify that the billing plan is ${plan} Annually Plan`, async () => {
                await expect(settingsBillingPlanPage.billingHeader).toContainText(RANDOM_ANNUALLY_PLAN(plan));
            });
        });
    });

    test('TC_14_54_01 | Attach/delete payment card', async ({
        createFreeUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsBillingPage,
    }) => {
        await description(
            'Objective: To verify the functionality of attaching a payment card ' +
                'through the settings-billing section and deleting a payment card through the Billing Portal.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-54`, 'Qase: SIGN-54');
        await link(`${GOOGLE_DOC_LINK}khucr6xuqdib`, 'ATC_14_54_01');
        await epic('Setting');
        await feature('Billing');
        await tags('Payment Card', 'Billing Portal');

        test.setTimeout(100 * 1000);
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickBilling();
        let stripeEnterPaymentDetailsPage = await settingsBillingPage.clickAttachCardButton();
        await stripeEnterPaymentDetailsPage.attachCard(CARD_DETAILS.VISA_DEBIT);
        await settingsBillingPage.reloadPage();

        await step('Verify that the added payment card displayed on the Billing page', async () => {
            await expect(settingsBillingPage.creditCardData).toHaveText(
                CARD_DETAILS.VISA_DEBIT.displayingOnTheBillingPage
            );
        });

        stripeEnterPaymentDetailsPage = await settingsBillingPage.clickAttachCardButton();
        await stripeEnterPaymentDetailsPage.attachCard(CARD_DETAILS.MASTERCARD);
        await settingsBillingPage.reloadPage();

        await step('Verify that the added payment card displayed on the Billing page', async () => {
            await expect(settingsBillingPage.creditCardData).toHaveText(
                CARD_DETAILS.MASTERCARD.displayingOnTheBillingPage
            );
        });

        let settingBillingPortalPage = await settingsBillingPage.clickOpenBillingPortalButton();

        await step('Verify that the payment card displayed on the Billing Portal page', async () => {
            await expect(settingBillingPortalPage.paymentDefaultMethod).toHaveText(
                CARD_DETAILS.MASTERCARD.displayingOnTheBillingPortalPage
            );
        });

        await settingBillingPortalPage.deleteAllNotDefaultCards();

        await step('Verify that there is only one payment card displayed on the Billing Portal page.', async () => {
            await expect(settingBillingPortalPage.paymentMethodsList).toHaveCount(1);
        });
        await step(
            'Verify that there is the last added payment card displayed on the Billing Portal page.',
            async () => {
                await expect(settingBillingPortalPage.paymentMethodsList).toHaveText(
                    CARD_DETAILS.MASTERCARD.displayingOnTheBillingPortalPage
                );
            }
        );
    });

  test('TC_14_57_01 | Verify that user can upgrade subscription (from Monthly to Annually)', async ({
    createBusinessUserAndLogin,
    signPage,
    settingsCompanyPage,
    settingsBillingPage,
    settingsBillingPlanPage,
  }) => {
    await description(
      'Objective: Verify that a user can successfully upgrade their subscription from a monthly plan to an annual plan.'
    );
    await severity(Severity.CRITICAL);
    await link(`${QASE_LINK}/SIGN-57`, 'Qase: SIGN-57');
    await link(`${GOOGLE_DOC_LINK}56zml0w3xji7`, 'ATC_14_57_01');
    await epic('Setting');
    await feature('Billing');
    await tags('Subscription');

    test.slow();
    await signPage.sideMenu.clickSettings();
    await settingsCompanyPage.sideMenuSettings.clickBilling();
    await settingsBillingPage.clickEditPlanButton();
    await settingsBillingPlanPage.switchMonthlyAnnyallyToggle();
    await settingsBillingPlanPage.clickUpgradeButton(PLANS[1]);
    await settingsBillingPlanPage.upgradeYourPlanModal.clickSubscribeButton();
    await settingsBillingPlanPage.toast.waitForToastText();
      
    await step('Verify the toast message', async () => {
      await expect(await settingsBillingPlanPage.toast.toastBody).toHaveText(TOAST_MESSAGE.planSuccessChange);
    });

    await settingsBillingPlanPage.sideMenuSettings.clickBilling();

    await step('Verify that the billing plan description is Business', async () => {
      await expect(await settingsBillingPage.billingPlanDescription).toHaveText(BUSINESS_ANNUALLY_PLAN);
    });
  });
});
