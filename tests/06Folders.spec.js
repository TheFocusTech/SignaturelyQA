import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { createFolder, createSecondFolder } from '../helpers/preconditions.js';
import { TOAST_MESSAGE, FILL_RENAME_FOLDER_NAME, QASE_LINK, GOOGLE_DOC_LINK, FOLDER_NAME} from '../testData.js';
import { description, tag, severity, Severity, link, epic, step } from "allure-js-commons";

test.describe('Folders', () => {
    test.skip('TC_06_22_01 | Verify the business user can create folder', async ({
        page,
        createBusinessUserAndLogin,
    }) => {
        const signPage = new SignPage(page);

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
        await documentsPage.clickCreateFolderBtn();
        await documentsPage.locators.getNewFolderNameInputField().fill('New Folder');
        await documentsPage.clickCreateBtn();

        await expect(documentsPage.locators.getToast()).toHaveText(TOAST_MESSAGE.folderCreated);
    });


    test.skip('TC_06_24_01 | Verify the business user can delete folder', async ({
        page,
        createBusinessUserAndLogin,
    }) => {
        const signPage = new SignPage(page);

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();

        await documentsPage.clickOptionsBtn();
        await documentsPage.clickDeleteBtn();
        await documentsPage.clickYesDeleteBtn();
        await documentsPage.locators.getToast().waitFor({ state: 'visible' });

        await expect(documentsPage.locators.getToast()).toHaveText(TOAST_MESSAGE.folderDeleted);
    });

    test('TC_06_23_01 | Rename folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
    }) => {
        test.setTimeout(150 * 1000);
        await description('Objective: Testing Folder Renaming Functionality.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-23`, "QASE: SIGN-23 ");
        await link(`${GOOGLE_DOC_LINK}i7nf7965pwpi`, "ATC_06_23_01");
        await tag('Rename Folder ');
        await epic('Folders');

        await createFolder(signPage, documentsPage, createFolderModal);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickRenameBtn();
        await documentsPage.table.fillInputNameField(FILL_RENAME_FOLDER_NAME);
        await documentsPage.table.pressEnterInputNameField();
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderRename);

        await step('Verify that the new value has been saved', async () => {
            expect(await documentsPage.table.getTitleFolder()).toBe(FILL_RENAME_FOLDER_NAME);
        });

    });

    test.only('TC_06_25_01 | Move folder to folder', async ({ createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        moveToFolderModal  }) => {

        await description('To verify the user can move folder to folder');
        await tag('Move folder to folder');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-25`, 'Qase: SIGN-25');
        await link(`${GOOGLE_DOC_LINK}2d0wcpkoa0jo`, 'ATC_06_25_01');
        await epic('Folder');   

        await createFolder(
            signPage,
            documentsPage,
            createFolderModal);            
        await createSecondFolder(
            signPage,
            documentsPage,
            createFolderModal);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickMoveToBtn();
        await moveToFolderModal.selectFolder(FOLDER_NAME);
        await moveToFolderModal.clickMoveToFolderBtn();

        await step('Verify the toast message', async () => {
            await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderMovedToFolder);
        });
    });
});