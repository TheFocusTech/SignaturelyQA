import { test as base } from '@playwright/test';
import LoginPage from '../page_objects/loginPage';

import { path }  from 'path';
import SignPage from '../page_objects/signPage';
import TemplatesActivePage from '../page_objects/templatesActivePage';
import TemplatesCreatePage from '../page_objects/templatesCreatePage';

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
    ],

    createTemplateForOne: [
        async ({ page }, use) => {
            const signPage = new SignPage(page);
            const templatesActivePage = new TemplatesActivePage(page);
            const templatesCreatePage = new TemplatesCreatePage(page);

            await signPage.clickTemplateDropdownAndGoTemplatesActivePage();  
            await templatesActivePage.clickCreateTemplateButton();
            
            await templatesCreatePage.fillTemplateNamePlaceholder();
            await templatesCreatePage.fillTemplateRolePlaceholder();

            await templatesCreatePage.clickUploadFileButton('../testDocuments/todoList.xlsx');

            await templatesCreatePage.clickFillTemplateButton();


            await templatesCreatePage.clickFieldBarSignLink();
            await templatesCreatePage.putSignPlace();
            await templatesCreatePage.clickCreateButton();
            await templatesCreatePage.clickBackToTemplatesButton();
            await templatesActivePage.clickSignSidebarLinkAndGoSignPage(); 

            await use("");
        },
        { scope: "test" },
    ]
});