import {expect} from '@playwright/test';
import {test} from "../fixtures/base.js";
import {API_KEY_NAME, API_PLANS, currentPlan, TOAST_MESSAGE} from '../testData.js';
import {description, epic, feature, link, Severity, severity, step, tags} from "allure-js-commons";

test.describe('API key', () => {

    test('TC_12_48_01_01 | Verify User can copy API key created by the "Create API" button on the right.', async ({
                                                                                                                      createBusinessUserAndLogin,
                                                                                                                      signPage,
                                                                                                                      settingsCompanyPage,
                                                                                                                      settingsAPIPage,
                                                                                                                      createAPIKeyModal
                                                                                                                  }) => {
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.horizontalMenu.clickAPI();

        await settingsAPIPage.clickCreateAPIKeyBtnAtRight();

        await createAPIKeyModal.fillCreateAPIKeyNameField(API_KEY_NAME);
        await createAPIKeyModal.clickCreateAPIBtn();
        await createAPIKeyModal.clickCopyAPIBtn();

        await settingsAPIPage.toast.toastBody.waitFor();

        const clipboardApiKeyValue = await createAPIKeyModal.getAPIKeyValueText();

        await createAPIKeyModal.clickCloseAPIModalBtn();
        await settingsAPIPage.fillBillingDetailsField(clipboardApiKeyValue);

        await expect(settingsAPIPage.billingDetailsTextField).toHaveText(clipboardApiKeyValue);
    });

    test('TC_12_48_01_02 | Verify User can copy API key created by the "Create API" button in Table.', async ({
                                                                                                                  createBusinessUserAndLogin,
                                                                                                                  signPage,
                                                                                                                  settingsCompanyPage,
                                                                                                                  settingsAPIPage,
                                                                                                                  createAPIKeyModal
                                                                                                              }) => {
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

    API_PLANS.forEach((apiPlan) => {
        test(`TC_12_49_01 | Purchase ${apiPlan} API plan`, async ({
                                                                      createBusinessUserAndLogin,
                                                                      signPage,
                                                                      settingsCompanyPage,
                                                                      settingsAPIPage,
                                                                      upgradeYourPlanAPIModal
                                                                  }) => {
            await description('Objective: Verify that the user can successfully purchase an API plan')
            await severity(Severity.CRITICAL);
            await link(
                'https://app.qase.io/case/SIGN-49',
                'Qase: SIGN-49'
            );
            await link(
                'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.mme3zetebvpb',
                'TC_12_49_01'
            );
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
                await expect(settingsAPIPage.apiPlansList.filter({hasText: apiPlan})).toContainText(currentPlan);
            });
        });
    });
});