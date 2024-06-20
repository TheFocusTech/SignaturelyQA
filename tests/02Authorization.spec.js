import {expect} from "@playwright/test";
import {test} from "../fixtures/base";
import {URL_END_POINTS, ACTIVE_COLOR} from "../testData";
import {allure} from "allure-playwright";
import {Severity} from "allure-js-commons";

test.describe('Authorization', () => {

    test('TC_02_05_01 | Verify successful login and the user directed to the sign page', async ({
                                                                                                    page,
                                                                                                    loginPage,
                                                                                                    signPage
                                                                                                }) => {
        await allure.description('Objective: To verify the process of logging a user into their account.');
        await allure.tags('Login');
        await allure.severity(Severity.CRITICAL);
        await allure.link(
            "Documentation",
            "https://docs.google.com/document/d/1RLC1wMQsmneQg6KNq2Ym8vR3dKk8lbP8E5ayiinTPTk/edit#heading=h.by32e2y2do4w",
            "TC_02_05_01"
        );
        await allure.epic('Authorization');

        await test.step('Navigate to the Login page', async () => {
            await page.goto("/");
        });
        await loginPage.fillEmailAddressInput(process.env.USER_EMAIL);
        await loginPage.fillPasswordInput(process.env.USER_PASSWORD);
        await loginPage.clickLogin();

        await test.step('Verify that the user is on the Sign page', async () => {
            await expect(signPage.page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
        });
        await test.step('Verify that Sign link on side menu has the active color', async () => {
            await expect(signPage.sideMenu.sign).toHaveCSS('color', ACTIVE_COLOR);
        });
        await signPage.header.verifyUserNameForOldUserLogin();
    })
})