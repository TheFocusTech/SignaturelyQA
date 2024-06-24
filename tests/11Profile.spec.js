import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { generateRandomPassword } from "../helpers/utils.js";
import { TOAST_MESSAGE, URL_END_POINTS } from "../testData.js";


test.describe('Profile', () => {

    test('TC_11_45_01 | Verify that User can change password', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        loginPage
    }) => {

        const newPassword = generateRandomPassword(15);
       
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.fillNewPasswordInputField(newPassword);
        await settingsProfilePage.fillRepeatNewPasswordInputField(newPassword);
        await settingsProfilePage.clickSaveButton();

        await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
        
        await settingsProfilePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.profileUpdated);
        await settingsProfilePage.sideMenu.clickSign();
        await loginPage.fillEmailAddressInput(process.env.NEW_USER_EMAIL);
        await loginPage.fillPasswordInput(newPassword);
        await loginPage.clickLogin();
        
        await expect(signPage.page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
    })
})