import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin } from "../fixtures/base.js";
import { DATA_SIGNER, TOAST_MESSAGE, QASE_LINK, GOOGLE_DOC_LINK, SIGNERS_DATA } from "../testData.js";
import { description, tag, severity, Severity, link, epic, feature, step } from 'allure-js-commons';
import { createSignature } from '../helpers/preconditions.js';

test.describe('Settings: Edit signature', () => {
    test('TC_13_51_01 | Verify user can create Signature.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsEditSignaturePage,
        createOrEditSignatureOnSettingModal
    }) => {
        await description('To verify Business user can create Signature.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-51`, 'Qase: SIGN-51');
        await link(`${GOOGLE_DOC_LINK}5bzz9ln1m6ek`, 'ATC_13_51_01');
        await epic('Settings');
        await feature('Edit signature');
        await tag('Create a signature');
        
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickEditSignature();
        await settingsEditSignaturePage.clickCreateSignatureBtn();
        await createOrEditSignatureOnSettingModal.fillFullNameField(DATA_SIGNER.fullName);
        await createOrEditSignatureOnSettingModal.fillInitialsField(DATA_SIGNER.initials);
        await createOrEditSignatureOnSettingModal.clickCheckboxAgree();
        await createOrEditSignatureOnSettingModal.clickCreateSignatureBtn();
        await settingsEditSignaturePage.toast.waitForToastText();

        await step(`Verify user can see toast message "${TOAST_MESSAGE.signatureCreated}".`, async () => {
            await expect(settingsEditSignaturePage.toast.toastBody).toHaveText(TOAST_MESSAGE.signatureCreated);
        });
        await step('Verify user can see one displayed signature.', async () => {
            await expect(settingsEditSignaturePage.settingsSignatureList).toHaveCount(1);
        });
    })

    test('TC_13_53_01 | Verify user can delete signature.', async ({ 
        createBusinessUserAndLogin, 
        signPage, settingsCompanyPage, 
        settingsEditSignaturePage, 
        createOrEditSignatureOnSettingModal 
    }) => {
        await description('To verify Business user can delete signature.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-53`, 'Qase: SIGN-53');
        await link(`${GOOGLE_DOC_LINK}9go15k207w7b`,'ATC_13_53_01');
        await epic('Settings');
        await feature('Edit signature');
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

            
        await step('Verify signature was deleted', async () => {
            await expect(settingsEditSignaturePage.toast.toastBody.first()).toHaveText(TOAST_MESSAGE.signatureDeleted);
        })

        await step('Verify signature was deleted from the list', async () => {
            await expect(settingsEditSignaturePage.settingsSignatureItem).toHaveCount(0);
        })
    })

    test('TC_13_52_01 | Verify user can edit signature.', async ({ 
        createBusinessUserAndLogin, 
        signPage, settingsCompanyPage, 
        settingsEditSignaturePage, 
        createOrEditSignatureOnSettingModal 
    }) => {
        await description('To verify user can edit signature.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-52`, 'Qase: SIGN-52');
        await link(`${GOOGLE_DOC_LINK}b94zmc9ufxyk`, 'ATC_13_52_01');
        await epic('Settings');
        await feature('Edit signature');
        await tag('Edit Signature');

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
        await settingsEditSignaturePage.clickEditSignatureDropDownItem();   ;

        await createOrEditSignatureOnSettingModal.fillInitialsField(SIGNERS_DATA.signerName2);
        await createOrEditSignatureOnSettingModal.clickCheckboxAgree();
        await createOrEditSignatureOnSettingModal.clickUpdateBtn();

        await step('Verify signature was edited.', async () => {
            await expect(settingsEditSignaturePage.toast.toastBody.first()).toHaveText(TOAST_MESSAGE.updateSignature);
        })

        await step('Verify signature only one.', async () => {
            await expect(settingsEditSignaturePage.settingsSignatureList).toHaveCount(1);
        })
    })
})