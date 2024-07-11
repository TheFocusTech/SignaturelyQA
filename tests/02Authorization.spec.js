import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { URL_END_POINTS, ACTIVE_COLOR, QASE_LINK, GOOGLE_DOC_LINK } from '../testData';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Authorization', () => {
    test('TC_02_05_01 | Verify user can login into their account', async ({
        page,
        loginPage,
        signPage,
    }) => {
        await description('To verify user can login into their account.');
        await severity(Severity.BLOCKER);
        await link(`${QASE_LINK}/SIGN-5`, 'Qase: SIGN-5');
        await link(`${GOOGLE_DOC_LINK}by32e2y2do4w`, 'ATC_02_05_01');
        await epic('Authorization');
        await tag('Login');

        await step('Navigate to the Login page', async () => {
            await page.goto('/');
        });
        await loginPage.fillEmailAddressInput(process.env.USER_EMAIL);
        await loginPage.fillPasswordInput(process.env.USER_PASSWORD);
        await loginPage.clickLogin();

        await step('Verify user is on the Sign page', async () => {
            await expect(signPage.page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
        });
        await step('Verify Sign link on side menu has the active color', async () => {
            await expect(signPage.sideMenu.sign).toHaveCSS('color', ACTIVE_COLOR);
        });
        await signPage.header.verifyUserNameForOldUserLogin();
    });
});