import { expect } from "@playwright/test";
import SignPage from "../page_objects/signPage";
import { test } from "../fixtures/base.js";
import {TOASTER_MESSAGE} from '../testData.js';

test.describe('Company', () => {

    test("TC_10_43_01 | Verify that the business user can fill company's form", async ({
        createBusinessUserAndLogin, signPage, settingsCompanyPage}) => {
        
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.LogoUpLoadFile('testDocuments/picture.jpg');
        await settingsCompanyPage.clickSaveBtn();
        await settingsCompanyPage.fillCompanyName();
        await settingsCompanyPage.fillFromEmail();
        await settingsCompanyPage.fillEmailClosingSignature();
        await settingsCompanyPage.checkActivateCheckbox();
        await settingsCompanyPage.fillRedirectionPage();
        await settingsCompanyPage.clickSaveBtn();
        
        await expect(settingsCompanyPage.toastPopup).toHaveText(TOASTER_MESSAGE.companyInformationSave);
    });
});


 