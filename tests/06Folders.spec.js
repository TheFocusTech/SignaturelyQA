import { expect } from "@playwright/test"
import {test, createBusinessUserAndLogin, createNewFolder} from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import { TOASTER_MESSAGE, FILL_RENAME_FOLDER_NAME } from "../testData.js";


test.describe ('Folders', () => {

    test('TC_06_22_01 | Verify the business user can create folder', async ({ page , createBusinessUserAndLogin}) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
        await documentsPage.clickCreateFolderBtn();
        await documentsPage.locators.getNewFolderNameInputField().fill('New Folder')
        await documentsPage.clickCreateBtn();

        await expect(documentsPage.locators.getToast()).toHaveText(TOASTER_MESSAGE.folderCreated);
    });

    test('TC_06_24_01 | Verify the business user can delete folder', async ({ page, createBusinessUserAndLogin, createNewFolder }) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickDeleteBtn();
        await documentsPage.clickYesDeleteBtn();
        await documentsPage.locators.getToast().waitFor({ state: 'visible' });

        await expect(documentsPage.locators.getToast()).toHaveText(TOASTER_MESSAGE.folderDeleted);
    });

    test('TC_06_23_01 | Rename folder', async ({ page, createBusinessUserAndLogin, createNewFolder }) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickRenameBtn();
        await documentsPage.fillRenameInputField(FILL_RENAME_FOLDER_NAME)
        await documentsPage.pressEnterRenameInputFielder();

        await expect(documentsPage.locators.getToast()).toHaveText(TOASTER_MESSAGE.folderRename);
    });
})
