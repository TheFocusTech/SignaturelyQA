import { expect } from '@playwright/test';
import { test, loginBusinessUser } from "../fixtures/base.js";
import {
    API_KEY_NAME, NO_API_KEY_MESSAGE,
    TOASTER_MESSAGE,
} from '../testData.js';
import SignPage from "../page_objects/signPage";

test.describe('Create API key', () => {

    test.only('TC_12_48_01_01 | Verify User can copy API key created by the "Create API" button on the right.', async ({ page, loginBusinessUser }) => {
        const signPage = new SignPage(page);

        const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
        const settingsAPIPage = await settingsCompanyPage.clickAPILinkAndGoAPIPage();

        const createAPIKeyModal = await settingsAPIPage.clickCreateAPIKeyButtonAtRight();
        await createAPIKeyModal.fillInCreateAPIKeyNameField(API_KEY_NAME)
        await createAPIKeyModal.clickCreateAPIButton();
        await createAPIKeyModal.clickCopyAPIButton();

        await settingsAPIPage.locators.getToaster().waitFor({ state: 'visible' });
        await expect(settingsAPIPage.locators.getToaster()).toHaveText(TOASTER_MESSAGE.copyApiKey);

        let clipboardApiKeyValue = await createAPIKeyModal.getAPIKeyValueText();
        await createAPIKeyModal.clickCloseDialogButton();

        await settingsAPIPage.clickToaster();
        await settingsAPIPage.fillBillingDetailsField(clipboardApiKeyValue);

        await expect(settingsAPIPage.locators.getBillingDetailsTextField()).toHaveText(clipboardApiKeyValue);

        await settingsAPIPage.removeAPIKeys();

        await settingsAPIPage.locators.getCreateAPIKeyButtonInTable().waitFor({ state: 'visible' });
        await expect(settingsAPIPage.locators.getEmptyAPiKeysHeader()).toHaveText(NO_API_KEY_MESSAGE)

        await settingsAPIPage.clickSignSidebarLinkAndGoSignPage();
    });
})