import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { generateRandomPassword } from "../helpers/utils.js";
import { TOAST_MESSAGE, URL_END_POINTS } from "../testData.js";
import { description, tag, severity, Severity, link, epic, step } from "allure-js-commons";


test.describe('Profile', () => {

    test('TC_11_45_01 | Verify that User can change password', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        loginPage,
    }) => {
        await description('Objective: To verify that the User can change a password and login with a new password');
        await severity(Severity.CRITICAL);
        await link("https://app.qase.io/case/SIGN-45", 
            "Qase: SIGN-45");
        await link("https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ei34zdu9ql4d", 
            "ATC_11_45_01");
        await epic('Profile');
        await tag('Password');

        const newPassword = generateRandomPassword(15);

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.fillNewPasswordInputField(newPassword);
        await settingsProfilePage.fillRepeatNewPasswordInputField(newPassword);
        await settingsProfilePage.clickSaveButton();

        await step(`Verify that a toast message with the text "${TOAST_MESSAGE.profileUpdated}" popped up `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
        });

        await settingsProfilePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.profileUpdated);
        await settingsProfilePage.sideMenu.clickSign();
        await loginPage.fillEmailAddressInput(process.env.NEW_USER_EMAIL);
        await loginPage.fillPasswordInput(newPassword);
        await loginPage.clickLogin();
        
        await step(`Verify that the User is logged in with a new password and is on the homepage ${URL_END_POINTS.signEndPoint} `, async () => {
            await expect(signPage.page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
    });
    
 });

    test('TC_11_47_01 | Verify that user can delete account', async ({
        createBusinessUserAndLogin, 
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        deleteMyAccountModal,
        loginPage
    }) => {
        await description('Objective: To verify that the User can delete account');
        await severity(Severity.CRITICAL);
        await link(
            'https://app.qase.io/case/SIGN-47',
            'Qase: SIGN-47'
        )
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.tcq6ypzibzp5",
            "АTC_11_47_01"
        );
        await epic('Profile');
        await tag('Delete account');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.clickDeleteMyAccountBtn();
        await deleteMyAccountModal.clickDeleteMyAccountModalBtn();

        await step(`Verify that the User is deleted account and is on the loginpage ${URL_END_POINTS.loginEndPoint} `, async () => {
            await expect(loginPage.page).toHaveURL(process.env.URL + URL_END_POINTS.loginEndPoint);
        })
        await step(`Verify that a toast message with the text "${TOAST_MESSAGE.deleteAccount}" popped up `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.deleteAccount);
        })
    });
});
       
