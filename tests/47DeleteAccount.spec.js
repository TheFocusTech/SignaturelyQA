import { expect } from '@playwright/test';
import { test,createFreeUserAndLogin  } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import SettingsCompanyPage from '../page_objects/settingsCompanyPage.js';
import {TOASTER_MESSAGE} from '../testData.js';

test.describe('Profile', () => {

    test('TC_11_47_01 | Verify that user can delete account', async ({page, createFreeUserAndLogin}) => {
        
        const signPage = new SignPage(page);
        const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
        const settingsProfilePage = await settingsCompanyPage.clickSettingsProfileLink();

        settingsProfilePage.clickDeleteMyAccountBtn();
        settingsProfilePage.clickDeleteMyAccountModal();

        await expect(settingsProfilePage).toHaveURL('https://staging.d2twwklgqmrfet.amplifyapp.com/login');
        await expect(settingsProfilePage.locators.getToasterPopup()).toHaveText(TOASTER_MESSAGE.deleteAccount);
    });
})