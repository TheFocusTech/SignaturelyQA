import { expect } from "@playwright/test";
import SignPage from "../page_objects/signPage";
import { test } from "../fixtures/base.js";
import {TOAST_MESSAGE, COMPANY_INFO} from '../testData.js';
import { allure } from "allure-playwright";
import {Severity} from "allure-js-commons";

test.describe('Company', () => {
    
    test("TC_10_43_01 | Verify that the business user can fill company's form", async ({
        createBusinessUserAndLogin, signPage, settingsCompanyPage }) => {
       
        await allure.description("To verify the process of filling company form.");
        await allure.tags('Fill company form');
        await allure.severity(Severity.CRITICAL);
        await allure.link(
            "Documentation",
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.buu76mms6cci",
            "TC_10_43_01"
        );
        await allure.epic("Settings: Company");
        
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.logoUpLoadFile('testDocuments/picture.jpg');
        await settingsCompanyPage.clickSaveBtn();
        await settingsCompanyPage.fillCompanyName(COMPANY_INFO.companyName);
        await settingsCompanyPage.fillFromEmail(COMPANY_INFO.emailFrom);
        await settingsCompanyPage.fillEmailClosingSignature(COMPANY_INFO.emailTo);
        await settingsCompanyPage.checkActivateCheckbox();
        await settingsCompanyPage.fillRedirectionPage(COMPANY_INFO.redirectionPage);
        await settingsCompanyPage.clickSaveBtn();
        
        await test.step('Verify that toas "Company information successfully saved" appears', async () =>{
            await expect(settingsCompanyPage.toastPopup).toHaveText(TOAST_MESSAGE.companyInformationSave);

        const actualCompanyName = await settingsCompanyPage.companyName.inputValue();
        const actualEmailClosingSignature = await settingsCompanyPage.emailClosingSignature.inputValue();
        const actualFromEmailName = await settingsCompanyPage.fromEmailName.inputValue();
        const actualRedirectionPage = await settingsCompanyPage.redirectionPage.inputValue();
        
        await test.step('Verify that that the entered information is displayed correctly after saving', async () =>{
            expect(actualCompanyName).toEqual(COMPANY_INFO.companyName);
            expect(actualEmailClosingSignature).toEqual(COMPANY_INFO.emailTo);
            expect(actualFromEmailName).toEqual(COMPANY_INFO.emailFrom);
            expect(actualRedirectionPage).toEqual(COMPANY_INFO.redirectionPage);
        });
    });
   });
});
