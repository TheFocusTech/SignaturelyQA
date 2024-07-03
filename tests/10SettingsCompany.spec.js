import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import {TOAST_MESSAGE, COMPANY_INFO, UPLOAD_FILE_PATH, QASE_LINK, GOOGLE_DOC_LINK} from '../testData.js';
import { description, tags, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Company', () => {
    
    test("TC_10_43_01 | Verify that the business user can fill company's form", async ({
        createBusinessUserAndLogin, signPage, settingsCompanyPage, page }) => {
       
        await description("To verify the process of filling company form.");
        await tags('Fill company form');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-43`, 'Qase: SIGN-43');
        await link(`${GOOGLE_DOC_LINK}buu76mms6cci`, 'ATC_10_43_01');
    
        await epic("Settings: Company");
        await tags("Fill company's form");

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.logoUpLoadFile(UPLOAD_FILE_PATH.jpgDocument);
        await settingsCompanyPage.clickSaveBtn();
        await settingsCompanyPage.fillCompanyName(COMPANY_INFO.companyName);
        await settingsCompanyPage.fillFromEmail(COMPANY_INFO.emailFrom);
        await settingsCompanyPage.fillEmailClosingSignature(COMPANY_INFO.emailTo);
        await settingsCompanyPage.checkActivateCheckbox();
        await settingsCompanyPage.fillRedirectionPage(COMPANY_INFO.redirectionPage);
        await settingsCompanyPage.clickSaveBtn();
        
        await step('Verify that toas "Company information successfully saved" appears', async () =>{
            await expect(settingsCompanyPage.toast.toastBody).toHaveText(TOAST_MESSAGE.companyInformationSave);
        })

        await page.reload();

        const actualCompanyName = await settingsCompanyPage.companyName.inputValue();
        const actualEmailClosingSignature = await settingsCompanyPage.emailClosingSignature.inputValue();
        const actualFromEmailName = await settingsCompanyPage.fromEmail.inputValue();
        const actualRedirectionPage = await settingsCompanyPage.redirectionPage.inputValue();
        
        
        await step('Verify that that the entered information is displayed correctly after saving', async () =>{
            expect(actualCompanyName).toEqual(COMPANY_INFO.companyName);
            expect(actualEmailClosingSignature).toEqual(COMPANY_INFO.emailTo);
            expect(actualFromEmailName).toEqual(COMPANY_INFO.emailFrom);
            expect(actualRedirectionPage).toEqual(COMPANY_INFO.redirectionPage);
        })
    });

    test("TC_10_43_02 | Verify that the business user can fill company's form with checkboxes", async ({
        createBusinessUserAndLogin, signPage, settingsCompanyPage, page }) => {
       
        await description("To verify the process of filling company form with checkboxes.");
        await tags('Fill company form with checkboxes');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-43`, 'Qase: SIGN-43');
        await link(`${GOOGLE_DOC_LINK}ogb9whitbbe1`, 'ATC_10_43_02');
    
        await epic("Settings: Company with checkboxes");
        await tags("Fill company's form");
       
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.logoUpLoadFile(UPLOAD_FILE_PATH.jpgDocument);
        await settingsCompanyPage.clickSaveBtn();
        await settingsCompanyPage.fillCompanyName(COMPANY_INFO.companyName);
        await settingsCompanyPage.fillFromEmail(COMPANY_INFO.emailFrom);
        await settingsCompanyPage.fillEmailClosingSignature(COMPANY_INFO.emailTo);
        await settingsCompanyPage.checkActivateCheckbox();
        await settingsCompanyPage.fillRedirectionPage(COMPANY_INFO.redirectionPage);
        await settingsCompanyPage.checkDocumentsCheckbox();
        await settingsCompanyPage.checkTemplateCheckbox();
        await settingsCompanyPage.checkFormsCheckbox();
        await settingsCompanyPage.checkEnable1Checkbox();
        await settingsCompanyPage.checkEnable2Checkbox();
        await settingsCompanyPage.checkEnable3Checkbox();
        await settingsCompanyPage.clickSaveBtn();
        
        await step('Verify that toast "Company information successfully saved" appears', async () =>{
            await expect(settingsCompanyPage.toast.toastBody).toHaveText(TOAST_MESSAGE.companyInformationSave);
        })

        await page.reload();

        const actualCompanyName = await settingsCompanyPage.companyName.inputValue();
        const actualEmailClosingSignature = await settingsCompanyPage.emailClosingSignature.inputValue();
        const actualFromEmailName = await settingsCompanyPage.fromEmail.inputValue();
        const actualRedirectionPage = await settingsCompanyPage.redirectionPage.inputValue();
        
            await step('Verify that that the entered information is displayed correctly after saving', async () =>{
            expect(actualCompanyName).toEqual(COMPANY_INFO.companyName);
            expect(actualEmailClosingSignature).toEqual(COMPANY_INFO.emailTo);
            expect(actualFromEmailName).toEqual(COMPANY_INFO.emailFrom);
            expect(actualRedirectionPage).toEqual(COMPANY_INFO.redirectionPage);
        });
    });

});
