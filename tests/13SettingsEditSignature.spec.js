import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin } from "../fixtures/base.js";
import { DATA_SIGNER, TOAST_MESSAGE, QASE_LINK, GOOGLE_DOC_LINK } from "../testData.js";
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';
import { createSignature } from '../helpers/preconditions.js';

test.describe('Settings: Edit signature', () => {
    test('TC_13_51_01 | Verify that user can create Signature', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsEditSignaturePage,
        createOrEditSignatureOnSettingModal
    }) => {
        await description('Verify that the user can create a Signature.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-51`, 'Qase: SIGN-51');
        await link(`${GOOGLE_DOC_LINK}5bzz9ln1m6ek`, 'ATC_13_51_01');
        await epic('Settings: Edit signature');
        await tag('Create a signature');
        
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickEditSignature();
        await settingsEditSignaturePage.clickCreateSignatureBtn();
        await createOrEditSignatureOnSettingModal.fillFullNameField(DATA_SIGNER.fullName);
        await createOrEditSignatureOnSettingModal.fillInitialsField(DATA_SIGNER.initials);
        await createOrEditSignatureOnSettingModal.clickCheckboxAgree();
        await createOrEditSignatureOnSettingModal.clickCreateSignatureBtn();
        await settingsEditSignaturePage.toast.waitForToastText();

        await step(`Verify that the user can see toast message "${TOAST_MESSAGE.signatureCreated}"`, async () => {
            await expect(settingsEditSignaturePage.toast.toastBody).toHaveText(TOAST_MESSAGE.signatureCreated);
        });
        await step('Verify that User can see one displayed signature', async () => {
            await expect(settingsEditSignaturePage.settingsSignatureList).toHaveCount(1);
        });
    })

    test('TC_13_53_01 | Verify that user can delete Signature.', async ({ 
        createBusinessUserAndLogin, 
        signPage, settingsCompanyPage, 
        settingsEditSignaturePage, 
        createOrEditSignatureOnSettingModal 
    }) => {
        await description('Verify that user can delete our Signature.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-53`, 'Qase: SIGN-53');
        await link(`${GOOGLE_DOC_LINK}9go15k207w7b`,'ATC_13_53_01');
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