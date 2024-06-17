import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import NewLoginPage from "../new_pom/pages/loginPage";
import { URL_END_POINTS, ACTIVE_COLOR } from "../testData";
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;

test.describe('Authorization', () => {

    test('TC_02_05_01 | Verify successful login and the user directed to the sign page', async ({ page, signPage }) => {
        const loginPage = new NewLoginPage(page);

        await page.goto("/");
        await loginPage.fillEmailAddressInput(EMAIL);
        await loginPage.fillPasswordInput(PASSWORD);
        await loginPage.clickLogin();

        await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);
        await expect(signPage.sideMenu.sign).toHaveCSS('color', ACTIVE_COLOR);    
    })
})