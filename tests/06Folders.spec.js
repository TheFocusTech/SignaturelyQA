import { expect } from "@playwright/test"
import {test, createBusinessUserAndLogin, createNewFolder} from "../fixtures/base.js";
// import { TOAST_MESSAGE, FILL_RENAME_FOLDER_NAME } from "../testData.js";
import { createFolder, createSecondFolder } from "../helpers/preconditions.js";
import { FOLDER_NAME, FOLDER_NAME_SECOND, TOAST_MESSAGE } from "../testData.js";
import { description, tag, severity, Severity, link, epic, step } from "allure-js-commons";


test.describe ('Folders', () => {

    test.skip('TC_06_22_01 | Verify the business user can create folder', async ({ page , createBusinessUserAndLogin}) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
        await documentsPage.clickCreateFolderBtn();
        await documentsPage.locators.getNewFolderNameInputField().fill('New Folder')
        await documentsPage.clickCreateBtn();

        await expect(documentsPage.locators.getToast()).toHaveText(TOAST_MESSAGE.folderCreated);
    });

    test.skip('TC_06_24_01 | Verify the business user can delete folder', async ({ page, createBusinessUserAndLogin, createNewFolder }) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickDeleteBtn();
        await documentsPage.clickYesDeleteBtn();
        await documentsPage.locators.getToast().waitFor({ state: 'visible' });

        await expect(documentsPage.locators.getToast()).toHaveText(TOAST_MESSAGE.folderDeleted);
    });

    test.skip('TC_06_23_01 | Rename folder', async ({ page, createBusinessUserAndLogin, createNewFolder }) => {
        const signPage = new SignPage(page); 

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickRenameBtn();
        await documentsPage.fillRenameInputField(FILL_RENAME_FOLDER_NAME)
        await documentsPage.pressEnterRenameInputFielder();

        await expect(documentsPage.locators.getToast()).toHaveText(TOAST_MESSAGE.folderRename);
    });

    test('TC_06_25_01 | Move folder to folder', async ({ createBusinessUserAndLogin,
        signPage,
        documentsPage,
        // createFolder,
        // createSecondFolder,
        createFolderModal,
        moveToFolderModal  }) => {

            await description('To verify the user can move folder to folder');
            await severity(Severity.CRITICAL);
            await link('https://app.qase.io/case/SIGN-25', 'Qase: SIGN-25');
            await link('https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.2d0wcpkoa0jo', 'ATC_06_25_01');
            await epic('Folder');
            await tag('Move folder to folder');

            await createFolder(
                signPage,
                documentsPage,
                createFolderModal);
                
            await createSecondFolder(
                signPage,
                documentsPage,
                createFolderModal);
    
            await signPage.sideMenu.clickDocuments();
            await documentsPage.table.clickOptionsBtn(0);
            await documentsPage.table.clickMoveToBtn();
            await moveToFolderModal.selectFolder(FOLDER_NAME);
            await moveToFolderModal.clickMoveToFolderBtn();

            await step('Verify the toast message', async () => {
                await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderMovedToFolder);
            });
    });
})
