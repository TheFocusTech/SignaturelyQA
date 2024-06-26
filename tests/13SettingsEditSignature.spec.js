import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin } from "../fixtures/base.js";
import { DATA_SIGNER, TOAST_MESSAGE } from "../testData.js";

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
})