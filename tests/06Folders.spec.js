import { expect } from "@playwright/test"
import {test, loginBusinessUser, createNewFolder} from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import TemplatesActivePage from "../page_objects/templatesActivePage.js";
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;

test.describe('Folders', () => {

    test('TC_06_24_01 | Verify the business user can delete folder', async ({ page, loginBusinessUser, createNewFolder }) => {
        const signPage = new SignPage(page); 
        const templatesActivePage = new TemplatesActivePage(page);

        await templatesActivePage.locators.getToaster().waitFor({ state: 'visible' });
        await templatesActivePage.locators.getToaster().waitFor({ state: 'hidden' });

        await templatesActivePage.clickOptionsBtn();
        await templatesActivePage.clickDeleteBtn();
        await templatesActivePage.clickYesDeleteBtn();
        await templatesActivePage.locators.getToaster().waitFor({ state: 'visible' });

        await expect(templatesActivePage.locators.getToaster()).toHaveText('Folder deleted successfully.');
    })
})