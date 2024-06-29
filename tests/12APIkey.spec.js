import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { API_KEY_NAME, API_PLANS, currentPlan, TOAST_MESSAGE, QASE_LINK, GOOGLE_DOC_LINK } from '../testData.js';
import { description, epic, feature, link, Severity, severity, step, tags } from 'allure-js-commons';

test.describe('API key', () => {
    test('TC_12_48_01 | Copy API key created by the "Create API" button on the right.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsAPIPage,
        createAPIKeyModal,
    }) => {
        await description('To verify that user can copy API key created by the "Create API" button on the right.');
        await severity(Severity.BLOCKER);
        await link(`${QASE_LINK}/SIGN-48`, 'Qase: SIGN-48');
        await link(`${GOOGLE_DOC_LINK}l0o8p7o1i4k`, 'ATC_12_48_01');
        await epic('API');
        await tags('Settings, API key');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickAPI();

        await settingsAPIPage.clickCreateAPIKeyBtnAtRight();

        await createAPIKeyModal.fillCreateAPIKeyNameField(API_KEY_NAME);
        await createAPIKeyModal.clickCreateAPIBtn();
        await createAPIKeyModal.clickCopyAPIBtn();

        const clipboardApiKeyValue = await createAPIKeyModal.APIKeyValue.innerText();

        await step('Wait the toast appears indicating API key has been successfully copied to clipboard', async () => {
            await settingsAPIPage.toast.toastBody.waitFor();
        });
        await step('Verify the toast message that API key has been successfully copied to clipboard', async () => {
            await expect(settingsAPIPage.toast.toastBody).toHaveText(TOAST_MESSAGE.copyApiKey);
        });

        await step('Ensure the API key is not empty', async () => {
            await expect(createAPIKeyModal.getAPIKeyValueText()).not.toBe('');
        });
        await step('Ensure the API key is not undefined', async () => {
            await expect(createAPIKeyModal.getAPIKeyValueText()).not.toBe('undefined');
        });

        await createAPIKeyModal.clickCloseAPIModalBtn();
        await settingsAPIPage.pasteIntoBillingDetailsField(clipboardApiKeyValue);

        await expect(settingsAPIPage.billingDetailsTextField).toHaveText(clipboardApiKeyValue);
    });

    test('TC_12_48_01_02 | Verify User can copy API key created by the "Create API" button in Table.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsAPIPage,
        createAPIKeyModal,
    }) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickAPI();

        await settingsAPIPage.table.clickCreateAPIKeyBtnInTable();

        await createAPIKeyModal.fillCreateAPIKeyNameField(API_KEY_NAME);
        await createAPIKeyModal.clickCreateAPIBtn();
        await createAPIKeyModal.clickCopyAPIBtn();

        await settingsAPIPage.toast.toastBody.waitFor();

        // const clipboardApiKeyValue = await createAPIKeyModal.getAPIKeyValueText();
        const clipboardApiKeyValue = await createAPIKeyModal.APIKeyValue.innerText();

        await createAPIKeyModal.clickCloseAPIModalBtn();
        await settingsAPIPage.fillBillingDetailsField(clipboardApiKeyValue);

        await expect(settingsAPIPage.billingDetailsTextField).toHaveText(clipboardApiKeyValue);
    });

    API_PLANS.forEach((apiPlan) => {
        test(`TC_12_49_01 | Purchase ${apiPlan} API plan`, async ({
            createBusinessUserAndLogin,
            signPage,
            settingsCompanyPage,
            settingsAPIPage,
            upgradeYourPlanAPIModal,
        }) => {
            await description('Objective: Verify that the user can successfully purchase an API plan');
            await severity(Severity.CRITICAL);
            await link(`${QASE_LINK}/SIGN-49`, 'Qase: SIGN-49');
            await link(`${GOOGLE_DOC_LINK}mme3zetebvpb`, 'TC_12_49_01');
            await epic('Setting');
            await feature('API');
            await tags('Subscription');

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.horizontalMenu.clickAPI();
            await settingsAPIPage.clickUpgradeButton(apiPlan);
            await upgradeYourPlanAPIModal.clickSubscribeButton();

            await step('Verify that the toast with "Api plan have been upgraded" appears.', async () => {
                await expect(settingsAPIPage.toast.toastBody).toHaveText(TOAST_MESSAGE.apiPlanUpgraded);
            });
            await step('Verify that the selected plan is marked as Current plan.', async () => {
                await expect(settingsAPIPage.apiPlansList.filter({ hasText: apiPlan })).toContainText(currentPlan);
            });
        });
    });
});
