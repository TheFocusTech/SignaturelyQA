import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { createFolder, createSecondFolder } from '../helpers/preconditions.js';
import { TOAST_MESSAGE, FILL_RENAME_FOLDER_NAME, QASE_LINK, GOOGLE_DOC_LINK, FOLDER_NAME, FOLDER_NAME_SECOND } from '../testData.js';
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

    test('TC_06_24_01 | Verify the business user can delete folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        confirmDeleteFolderModal
    }) => {

        await description('Objective: To verify the user can delete the folder')
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-24`, "QASE: SIGN-24");
        await link(`${GOOGLE_DOC_LINK}h4z5uzr4m1hq`, "ATC_06_24_01");
        await tag('Delete a folder');
        await epic('Folders');

        await createFolder(
            signPage,
            documentsPage,
            createFolderModal,
            FOLDER_NAME
        );

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickDeleteBtn();
        await confirmDeleteFolderModal.clickYesDeleteBtn();

        await step('Verify the toaster notification with the "Folder deleted successfully" text appears after deleting a folder', async () => {
            await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderDeleted)
        });
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

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);
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

    test('TC_06_25_01 | Move folder to folder', async ({ createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        moveToFolderModal }) => {
            
        test.setTimeout(250 * 1000);

        await description('To verify the user can move folder to folder');
        await tag('Move folder to folder');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-25`, 'Qase: SIGN-25');
        await link(`${GOOGLE_DOC_LINK}2d0wcpkoa0jo`, 'ATC_06_25_01');
        await epic('Folder');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);
        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME_SECOND);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickMoveToBtn();
        await moveToFolderModal.selectFolder(FOLDER_NAME);
        await moveToFolderModal.clickMoveToFolderBtn();

        await step('Verify the toast message', async () => {
            await documentsPage.toast.toastBody.waitFor({ state: 'visible' });
            await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderMovedToFolder);
        });
    });
});