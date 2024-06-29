import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin } from "../fixtures/base.js";
import { DATA_SIGNER, TOAST_MESSAGE } from "../testData.js";
import { createSignature } from "../helpers/preconditions.js";
import { description, tag, severity, Severity, link, epic, step } from "allure-js-commons";

test.describe('Settings: Edit signature', () => {

    test('TC_13_51_01 | Verify that user can create Signature.', async ({ createBusinessUserAndLogin, signPage, settingsCompanyPage, settingsEditSignaturePage, createOrEditSignatureOnSettingModal }) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickEditSignature();
        await settingsEditSignaturePage.clickCreateSignatureBtn();
        await createOrEditSignatureOnSettingModal.fillFullNameField(DATA_SIGNER.fullName);
        await createOrEditSignatureOnSettingModal.fillInitialsField(DATA_SIGNER.initials);
        await createOrEditSignatureOnSettingModal.clickCheckboxAgree();
        await createOrEditSignatureOnSettingModal.clickCreateSignatureBtn();

        await expect(settingsEditSignaturePage.toast.toastBody).toHaveText(TOAST_MESSAGE.signatureCreated);
        await expect(settingsEditSignaturePage.settingsSignatureList).toHaveCount(1);
    })

    test('TC_13_53_01 | Verify that user can delete Signature.', async ({ 
        createBusinessUserAndLogin, 
        signPage, settingsCompanyPage, 
        settingsEditSignaturePage, 
        createOrEditSignatureOnSettingModal }) => {
            await description('Verify that user can delete our Signature.');
            await severity(Severity.CRITICAL);
            await link(
                'https://app.qase.io/case/SIGN-53',
                'Qase: SIGN-53'
            );
            await link(
                'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.9go15k207w7b',
                'ATC_13_53_01'
            );
            await epic('Settings');
            await tag('Delete Signature');
            test.setTimeout(120 * 1000);

            await createSignature(
                signPage, 
                settingsCompanyPage, 
                settingsEditSignaturePage, 
                createOrEditSignatureOnSettingModal, 
                );

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.sideMenuSettings.clickEditSignature();

            await settingsEditSignaturePage.clickDropDownMenu();
            await settingsEditSignaturePage.clickDeleteSignatureDropDownItem();
            
            await createOrEditSignatureOnSettingModal.clickDeleteBtn();

            await step('Verify that Signature was deleted', async () => {
                await expect(settingsEditSignaturePage.toast.toastBody.first()).toHaveText(TOAST_MESSAGE.signatureDeleted);
            })

            await step('Verify that Signature was deleted from the list', async () => {
                await expect(settingsEditSignaturePage.settingsSignatureList).toHaveCount(1);
            })
    })
})