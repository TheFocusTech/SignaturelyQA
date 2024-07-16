import { CARD_DETAILS, TOAST_MESSAGE } from '../testData.js';
import { step } from "allure-js-commons";

export async function newFreeUserLogin({ page, loginPage }) {
    await step(`Free User Login`, async () => {
        await page.goto("/");
        await page.waitForLoadState('load');
        await loginPage.fillEmailAddressInput(process.env.NEW_USER_EMAIL);
        await loginPage.fillPasswordInput(process.env.NEW_USER_PASSWORD);
        await loginPage.clickLogin();
    });
}

export async function upgradeFreeUserToBusinessAndLogin({
    signPage,
    settingsCompanyPage,
    upgradeYourPlanModal,
    settingsBillingPlanPage,
    specialOneTimeOfferModal }) {
    await step(`Upgrade Free User to Business`, async () => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickBilling();
        await settingsBillingPlanPage.clickUpgradeButton("Business");
        await upgradeYourPlanModal.cardDetails.fillData(CARD_DETAILS.VISA);
        await upgradeYourPlanModal.clickSubscribeButton();
        await specialOneTimeOfferModal.clickNoThanksModalBtn();
        await settingsBillingPlanPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.planSuccessChange);
        console.log(`Free User #${process.env.NEW_USER_NUMBER} has been successfully upgraded to Business`);
        await settingsBillingPlanPage.sideMenu.clickSign();
    });
}