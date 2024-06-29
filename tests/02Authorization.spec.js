import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { URL_END_POINTS, ACTIVE_COLOR } from "../testData";
import { description, tag, severity, Severity, link, epic, step } from "allure-js-commons";

test.describe('Authorization', () => {

    test.only('TC_02_05_01 | Verify successful login and the user directed to the sign page', async ({
                                                                                                    page,
                                                                                                    loginPage,
                                                                                                    signPage
                                                                                                }) => {
        await description('Objective: To verify the process of logging a user into their account.');
        await severity(Severity.BLOCKER);
        await link(
            'https://app.qase.io/case/SIGN-5',
            'Qase: SIGN-5'
        );
        await link(
            'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.by32e2y2do4w',
            'ATC_02_05_01'
        );
        await epic('Authorization');
        await tag('Login');

        await step('Navigate to the Login page', async () => {
            await page.goto("/");
        });
        await loginPage.fillEmailAddressInput(process.env.USER_EMAIL);
        await loginPage.fillPasswordInput(process.env.USER_PASSWORD);
        await loginPage.clickLogin();

        await step('Verify that the user is on the Sign page', async () => {
            await expect(signPage.page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
        });
        await step('Verify that Sign link on side menu has the active color', async () => {
            await expect(signPage.sideMenu.sign).toHaveCSS('color', ACTIVE_COLOR);
        });
        await signPage.header.verifyUserNameForOldUserLogin();
    })
})