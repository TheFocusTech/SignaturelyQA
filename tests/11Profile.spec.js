import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import { TOASTER_MESSAGE } from '../testData.js';
import { generateRandomPassword } from '../helpers/utils.js';

test.describe('Profile', () => {

    test('TC_11_45_01 | Verify User can update a password', async ({ page, createBusinessUserAndLogin }) => {
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
    })
})
