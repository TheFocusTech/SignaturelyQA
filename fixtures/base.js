import { test as base } from '@playwright/test';
import LoginPage from '../page_objects/loginPage';
import SignPage from '../page_objects/signPage';
import TemplatesActivePage from '../page_objects/templatesActivePage';

const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;

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
    ],

    createNewFolder: [
        async ({ page }, use) => {
            const templatesActivePage = new TemplatesActivePage(page);
            const signPage = new SignPage(page);
            
            await signPage.clickTemplateDropdownAndGoTemplatesActivePage();  
            await templatesActivePage.clickCreateFolderBtn();
            await templatesActivePage.fillNewFolderNameInputField();
            await templatesActivePage.clickCreateBtn();

            await use("");
        },
        { scope: "test" },
    ]
});