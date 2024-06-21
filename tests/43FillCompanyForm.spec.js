import { expect } from "@playwright/test";
import SignPage from "../page_objects/signPage";
import { test } from "../fixtures/base.js";
import {TOASTER_MESSAGE, COMPANY_INFO} from '../testData.js';

test.describe('Company', () => {

    test("TC_10_43_01 | Verify that the business user can fill company's form", async ({
        createBusinessUserAndLogin, signPage, settingsCompanyPage}) => {
        
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.logoUpLoadFile('testDocuments/picture.jpg');
        await settingsCompanyPage.clickSaveBtn();
        await settingsCompanyPage.fillCompanyName(COMPANY_INFO.companyName);
        await settingsCompanyPage.fillFromEmail(COMPANY_INFO.emailFrom);
        await settingsCompanyPage.fillEmailClosingSignature(COMPANY_INFO.emailTo);
        await settingsCompanyPage.checkActivateCheckbox();
        await settingsCompanyPage.fillRedirectionPage(COMPANY_INFO.redirectionPage);
        await settingsCompanyPage.clickSaveBtn();
        
        await expect(settingsCompanyPage.toastPopup).toHaveText(TOASTER_MESSAGE.companyInformationSave);
    });
});


 