import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import {
    API_KEY_NAME,
} from '../testData.js';

test.describe('Create API key', () => {

    test('TC_12_48_01_01 | Verify User can copy API key created by the "Create API" button on the right.', async ({ createBusinessUserAndLogin, signPage, settingsCompanyPage, settingsAPIPage, createAPIKeyModal}) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickAPI();

        await settingsAPIPage.clickCreateAPIKeyButtonAtRight();

        await createAPIKeyModal.fillCreateAPIKeyNameField(API_KEY_NAME);
        await createAPIKeyModal.clickCreateAPIBtn();
        await createAPIKeyModal.clickCopyAPIBtn();

        await settingsAPIPage.toast.toastBody.waitFor();

        const clipboardApiKeyValue = await createAPIKeyModal.getAPIKeyValueText();

        await createAPIKeyModal.clickCloseAPIModalBtn();
        await settingsAPIPage.fillBillingDetailsField(clipboardApiKeyValue);

        await expect(settingsAPIPage.billingDetailsTextField).toHaveText(clipboardApiKeyValue);
    });

    test('TC_12_48_01_02 | Verify User can copy API key created by the "Create API" button in Table.', async ({ createBusinessUserAndLogin, signPage, settingsCompanyPage, settingsAPIPage, createAPIKeyModal}) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickAPI();

        await settingsAPIPage.table.clickCreateAPIKeyBtnInTable();

        await createAPIKeyModal.fillCreateAPIKeyNameField(API_KEY_NAME);
        await createAPIKeyModal.clickCreateAPIBtn();
        await createAPIKeyModal.clickCopyAPIBtn();

        await settingsAPIPage.toast.toastBody.waitFor();

        const clipboardApiKeyValue = await createAPIKeyModal.getAPIKeyValueText();

        await createAPIKeyModal.clickCloseAPIModalBtn();
        await settingsAPIPage.fillBillingDetailsField(clipboardApiKeyValue);

        await expect(settingsAPIPage.billingDetailsTextField).toHaveText(clipboardApiKeyValue);
    });
})