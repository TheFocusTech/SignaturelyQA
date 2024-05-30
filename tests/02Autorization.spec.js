import { test, expect } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import { URL_END_POINTS, ACTIVE_COLOR } from "../testData";
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;

test.describe('Autorization', () => {

    test('TC_02_05_01 | Verify successful login and the user directed to the sign page', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');
        await loginPage.fillEmailAddressInputField(EMAIL);
        await loginPage.fillPasswordInputField(PASSWORD);
        const signPage = await loginPage.clickLoginAndGoSignPage();

        await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.sign_end_point);
        await expect(signPage.locators.getSignSidebarLink()).toHaveCSS('color', ACTIVE_COLOR);   
    })
})