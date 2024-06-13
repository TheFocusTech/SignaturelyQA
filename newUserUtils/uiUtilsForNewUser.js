import { newUserNumber, newUserEmail, newUserPassword } from "./apiUtilsForNewUser";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
import { VISA_CARD_DATA } from '../testData.js';

export async function newFreeUserLogin(page) {
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.fillEmailAddressInputField(newUserEmail);
    await loginPage.fillPasswordInputField(newUserPassword);
    await loginPage.clickLoginAndGoSignPage();
}

export async function upgradeFreeUserToBusinessAndLogin(page) {
    const signPage = new SignPage(page);
    const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
    let settingsBillingPage = await settingsCompanyPage.clickSettingsBillingSidebarLinkAngGoSettingsBillingPage();
    const upgradeYourPlanModal = await settingsBillingPage.clickBusinessUpgradeAndGoToUpgradeYourPlanModal();
    await upgradeYourPlanModal.fillCreditCardData(
        VISA_CARD_DATA.cardNumber,
        VISA_CARD_DATA.expirationDate,
        VISA_CARD_DATA.cvc,
        VISA_CARD_DATA.fullNameOnCard,
        VISA_CARD_DATA.zip);
    const specialOfferUpsellModal = await upgradeYourPlanModal.clickSubscribeButtonAnGoToSpecialOfferUpsellModal();
    const settingsBillingPlanPage = await specialOfferUpsellModal.cancelSpecialOfferAndGoToSettingsBillingPlanPage();
    await settingsBillingPlanPage.locators.getToasterPopup().isVisible();
    await settingsBillingPlanPage.waitForToasterHidden();
    await settingsBillingPlanPage.locators.getToasterPopup().isHidden();
    console.log(`Free User #${newUserNumber} has been successfully upgraded to Bussiness`);
    await settingsBillingPlanPage.clickSignSidebarLinkAndGoSignPage();
}