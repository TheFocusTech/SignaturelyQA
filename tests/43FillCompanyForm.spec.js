import { expect } from '@playwright/test';
import { test, loginBusinessUser } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import {TOASTER_MESSAGE} from '../testData.js';

test.describe('Company', () => {

    test("TC_10_43_01 | Verify that the business user can fill company's form", async ({ page, loginBusinessUser }) => {
        const signPage = new SignPage(page);
        const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
        
        await settingsCompanyPage.LogoUpLoadFile('testDocuments/picture.jpg');
        await settingsCompanyPage.clickSaveBtn();
        await settingsCompanyPage.fillCompanyNameField();
        await settingsCompanyPage.fillFromEmailField();
        await settingsCompanyPage.fillEmailClosingSignatureField();
        await settingsCompanyPage.checkActivateCheckbox();
        await settingsCompanyPage.fillRedirectionPage();
        await settingsCompanyPage.clickSaveBtn();
    
        await expect(settingsCompanyPage.locators.getToasterPopup()).toHaveText(TOASTER_MESSAGE.companyInformationSave);
    });
});


