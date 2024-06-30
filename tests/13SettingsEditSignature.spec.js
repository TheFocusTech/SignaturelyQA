import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin } from "../fixtures/base.js";
import { DATA_SIGNER, TOAST_MESSAGE, QASE_LINK, GOOGLE_DOC_LINK } from "../testData.js";
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Settings: Edit signature', () => {
    test.only('TC_13_51_01 | Verify that user can create Signature', async ({
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

        await step(`Verify that the user can see toast message "${TOAST_MESSAGE.signatureCreated}"`, async () => {
            await expect(settingsEditSignaturePage.toast.toastBody).toHaveText(TOAST_MESSAGE.signatureCreated);
        });
        await step('Verify that User can see one displayed signature', async () => {
            await expect(settingsEditSignaturePage.settingsSignatureList).toHaveCount(1);
        });
    })
})