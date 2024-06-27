import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import {API_KEY_NAME, TOAST_MESSAGE } from '../testData.js';
import {description, tag, severity, Severity, link, epic, step} from "allure-js-commons";

test.describe('Create API key', () => {

    test.only('TC_12_48_01 | Verify User can copy API key created by the "Create API" button on the right.', async ({ createBusinessUserAndLogin, signPage, settingsCompanyPage, settingsAPIPage, createAPIKeyModal}) => {
        await description('To verify that a Free user can successfully register.');
        await severity(Severity.BLOCKER);
        await link(
            'https://app.qase.io/case/SIGN-48',
            'Qase: SIGN-48'
        );
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.l0o8p7o1i4k",
            "ATC_12_48_01"
        );
        await epic('API');
        await tag('Settings, API key');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickAPI();

        await settingsAPIPage.clickCreateAPIKeyBtnAtRight();

        await createAPIKeyModal.fillCreateAPIKeyNameField(API_KEY_NAME);
        await createAPIKeyModal.clickCreateAPIBtn();
        await createAPIKeyModal.clickCopyAPIBtn();

        await step('Wait the toast appears indicating API key has been successfully copied to clipboard', async () => {
            await settingsAPIPage.toast.toastBody.waitFor();
        });
        await step('Verify the toast message that API key has been successfully copied to clipboard', async () => {
            await expect(settingsAPIPage.toast.toastBody).toHaveText(TOAST_MESSAGE.copyApiKey);
        });

        const clipboardApiKeyValue = await createAPIKeyModal.APIKeyValue.innerText();

        await step('Ensure the API key is not empty', async () => {
            await expect(clipboardApiKeyValue).not.toBe('');
        });

        await createAPIKeyModal.clickCloseAPIModalBtn();
        await settingsAPIPage.rightClickBillingDetailsField();
        await settingsAPIPage.fillBillingDetailsField(clipboardApiKeyValue);

        await step('Verify the copied API Key appears in the "Billing Details" input', async () => {
            await expect(settingsAPIPage.billingDetailsTextField).toHaveText(clipboardApiKeyValue);
        });
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