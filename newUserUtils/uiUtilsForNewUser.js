import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
import { CARD_DETAILS } from '../testData.js';

export async function newFreeUserLogin(page) {
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.fillEmailAddressInputField(process.env.NEW_USER_EMAIL);
    await loginPage.fillPasswordInputField(process.env.NEW_USER_PASSWORD);
    await loginPage.clickLoginAndGoSignPage();
}

export async function upgradeFreeUserToBusinessAndLogin(page) {
    const signPage = new SignPage(page);
    const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
    let settingsBillingPage = await settingsCompanyPage.clickSettingsBillingSidebarLinkAngGoSettingsBillingPage();
    const upgradeYourPlanModal = await settingsBillingPage.clickBusinessUpgradeAndGoToUpgradeYourPlanModal();
    await upgradeYourPlanModal.fillCreditCardData(CARD_DETAILS.VISA);
    const specialOfferUpsellModal = await upgradeYourPlanModal.clickSubscribeButtonAnGoToSpecialOfferUpsellModal();
    const settingsBillingPlanPage = await specialOfferUpsellModal.cancelSpecialOfferAndGoToSettingsBillingPlanPage();
    await settingsBillingPlanPage.locators.getToasterPopup().isVisible();
    await settingsBillingPlanPage.waitForToasterHidden();
    await settingsBillingPlanPage.locators.getToasterPopup().isHidden();
    console.log(`Free User #${process.env.NEW_USER_NUMBER} has been successfully upgraded to Bussiness`);
    await settingsBillingPlanPage.clickSignSidebarLinkAndGoSignPage();
}