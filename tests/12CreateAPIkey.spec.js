import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import {
    API_KEY_NAME, NO_API_KEY_MESSAGE,
    TOASTER_MESSAGE,
} from '../testData.js';
import settingsAPIPage from "../page_objects/settingsAPIPage";

test.describe('Create API key', () => {

    test('TC_12_48_01_01 | Verify User can copy API key created by the "Create API" button on the right.', async ({ createBusinessUserAndLogin, signPage, settingsCompanyPage,}) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickAPI();

        await settingsAPIPage.clickCreateAPIKeyButtonAtRight();

        // await settingsAPIPage.createAPIKeyModal.fillInCreateAPIKeyNameField(API_KEY_NAME)
        // await settingsAPIPage.createAPIKeyModal.clickCreateAPIButton();
        // await settingsAPIPage.createAPIKeyModal.clickCopyAPIButton();
        //
        // await settingsAPIPage.getToast().waitFor({ state: 'visible' });
        //
        // const toastMsg = settingsAPIPage.getToast().textContent()
        // console.log(toastMsg);
        //
        // const clipboardApiKeyValue = await settingsAPIPage.createAPIKeyModal.getAPIKeyValueText();
        // await settingsAPIPage.createAPIKeyModal.clickCloseDialogButton();
        //
        // // await settingsAPIPage.clickToaster();
        // await settingsAPIPage.fillBillingDetailsField(clipboardApiKeyValue);
        //
        // await expect(settingsAPIPage.billingDetailsTextField()).toHaveText(clipboardApiKeyValue);
    });
})