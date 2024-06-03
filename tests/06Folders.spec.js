import { expect } from "@playwright/test"
import {test, loginBusinessUser, createNewFolder} from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import { TOASTER_MESSAGE } from "../testData.js";


test.describe('Folders', () => {

    test('TC_06_24_01 | Verify the business user can delete folder', async ({ page, loginBusinessUser, createNewFolder }) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsDropdownAndGoDocumentsPage();

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickDeleteBtn();
        await documentsPage.clickYesDeleteBtn();
        await documentsPage.locators.getToaster().waitFor({ state: 'visible' });

        await expect(documentsPage.locators.getToaster()).toHaveText(TOASTER_MESSAGE.folderDeleted);

        const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();

        await documentsTrashPage.clickEmptyTrashBtn();
        await documentsTrashPage.clickConfirmEmptyTrashBtn();
        await documentsTrashPage.clickSignSidebarLinkAndGoSignPage();
    })
    test('TC_06_23_01 | Rename folder', async ({ page, loginBusinessUser, createNewFolder }) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsDropdownAndGoDocumentsPage();

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickRenameBtn();
        await page.waitForTimeout(3000);
        await documentsPage.fillRenameInputField();
        await documentsPage.pressEnterRenameInputFielder();

        await expect(documentsPage.locators.getToaster()).toHaveText(TOASTER_MESSAGE.folderRename);

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickDeleteBtn();
        await documentsPage.clickYesDeleteBtn();

        const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();
        await documentsTrashPage.clickEmptyTrashBtn();
        await documentsTrashPage.clickConfirmEmptyTrashBtn();
        await documentsTrashPage.clickSignSidebarLinkAndGoSignPage();



    })
})
