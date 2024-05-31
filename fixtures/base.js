import { test as base } from '@playwright/test';
import LoginPage from '../page_objects/loginPage';
import SignPage from '../page_objects/signPage';
import { URL_END_POINTS } from "../testData";

const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;

export const test = base.extend({

    loginBusinessUser: [
        async ({ page }, use) => {
            const loginPage = new LoginPage(page);

            await page.goto('/');
            await loginPage.fillEmailAddressInputField(EMAIL);
            await loginPage.fillPasswordInputField(PASSWORD);
            await loginPage.clickLoginAndGoSignPage();                   

            await use("");
        }, 
        { scope: "test" },
    ]
});