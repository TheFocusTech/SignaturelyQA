import { expect } from "@playwright/test"
import {test, loginBusinessUser, createNewFolder} from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";

test.describe('Folders', () => {

    test('TC_06_24_01 | Verify the business user can delete folder', async ({ page, loginBusinessUser, createNewFolder }) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsDropdownAndGoDocumentsPage();

        await documentsPage.locators.getToaster().waitFor({ state: 'visible' });
        await documentsPage.locators.getToaster().waitFor({ state: 'hidden' });

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickDeleteBtn();
        await documentsPage.clickYesDeleteBtn();
        await documentsPage.locators.getToaster().waitFor({ state: 'visible' });

        await expect(documentsPage.locators.getToaster()).toHaveText('Folder deleted successfully.');

        await documentsPage.clickSignaturelyLogoAndGoSignPage();
    })
})
