import { expect } from "@playwright/test";
import { test, loginBusinessUser } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import { FULL_NAME_INITIALS_FIELDS, TOASTER_MESSAGE } from "../testData.js";
import SettingsEditSignaturePage from "../page_objects/settingsEditSignaturePage.js";


test.describe('Settings: Edit signature', () => {

    test('TC_13_51_01 | "Settings: Edit signature" - Verify that user can create Signature.', async ({ page, loginBusinessUser }) => {
        const signPage = new SignPage(page);

        const editSignaturePage = await signPage.clickSettingsSidebarLinkAngGoSettingsEditSignaturePage();
        
        const createNewSignatureModal = await editSignaturePage.clickCreateSignatureAndGoCreateNewSignaturePage();

        await createNewSignatureModal.fillFullNameInputField(FULL_NAME_INITIALS_FIELDS.name);
        await createNewSignatureModal.fillInitialsInputField(FULL_NAME_INITIALS_FIELDS.initials);
        await createNewSignatureModal.clickAgreementCheckbox();

        const settingsEditSignaturePage = await createNewSignatureModal.clickCreateSignatureBtn();

        await expect(settingsEditSignaturePage.locators.getToast()).toHaveText(TOASTER_MESSAGE.signatureCreated);

        await settingsEditSignaturePage.clickSignSidebarLinkAndGoSignPage();
    })
})