import { expect } from '@playwright/test';
import { test, loginBusinessUser } from "../fixtures/base.js";
import { changeUserPasswordApiAdmin } from '../helpers/apiCalls.js';
import SignPage from "../page_objects/signPage";
import { TOASTER_MESSAGE, URL_END_POINTS } from '../testData.js';
import { generateRandomPassword } from '../helpers/utils.js'

test.describe('Profile', () => {

    test('TC_11_45_01 | Verify User can update a password', async ({ page, loginBusinessUser, request }) => {
        const newPassword = generateRandomPassword(25);
        console.log(newPassword);

        const signPage = new SignPage(page);
        const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
        const settingsProfilePage = await settingsCompanyPage.clickSettingsProfileSidebarMenuOptionAndGoToSettingsProfilePage();
        await settingsProfilePage.fillNewPasswordInputField(newPassword);
        await settingsProfilePage.fillRepeatNewPasswordInputField(newPassword);
        await settingsProfilePage.clickSaveButton();
        await settingsProfilePage.waitForToasterVisible();
        expect(await settingsProfilePage.locators.getToastBody().isVisible()).toBe(true);
        await expect(settingsProfilePage.locators.getToastBody()).toHaveText(TOASTER_MESSAGE.profileUpdated);
        await settingsProfilePage.waitForToasterHidden();
        expect(await settingsProfilePage.locators.getToastBody().isHidden()).toBe(true);
        const loginPage = await settingsProfilePage.clickSignSidebarMenuOptionAndGoToLoginPageAfterUpdatePassword();
        await expect(page).toHaveURL('https://staging.d2twwklgqmrfet.amplifyapp.com/login');

        const updatedUserCredentials = {
            email: process.env.USER_EMAIL,
            password:`${newPassword}`
        };

        const responce = await changeUserPasswordApiAdmin(request, updatedUserCredentials);
        await expect(responce).toBeOK();
        await loginPage.fillEmailAddressInputField(process.env.USER_EMAIL);
        await loginPage.fillPasswordInputField(process.env.USER_PASSWORD);
        await loginPage.clickLoginAndGoSignPage();
        await expect(page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
    })
})
