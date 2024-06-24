import { CARD_DETAILS, TOAST_MESSAGE } from '../testData.js';

export async function newFreeUserLogin({ page, loginPage }) {
    await page.goto("/");
    await loginPage.fillEmailAddressInput(process.env.NEW_USER_EMAIL);
    await loginPage.fillPasswordInput(process.env.NEW_USER_PASSWORD);
    await loginPage.clickLogin();
}

export async function upgradeFreeUserToBusinessAndLogin({
    signPage,
    settingsCompanyPage,
    upgradeYourPlanModal,
    settingsBillingPlanPage,
    specialOneTimeOfferModal }) {

    await signPage.sideMenu.clickSettings();
    await settingsCompanyPage.sideMenuSettings.clickBilling();
    await settingsBillingPlanPage.clickUpgradeButton("Business");
    await upgradeYourPlanModal.cardDetails.fillData(CARD_DETAILS.VISA);
    await upgradeYourPlanModal.clickSubscribeButton();
    await specialOneTimeOfferModal.clickNoThanksModalBtn();
    await settingsBillingPlanPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.planSuccessChange);
    console.log(`Free User #${process.env.NEW_USER_NUMBER} has been successfully upgraded to Bussiness`);
    await settingsBillingPlanPage.sideMenu.clickSign();
}