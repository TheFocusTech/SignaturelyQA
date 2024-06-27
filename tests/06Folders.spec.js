import { expect } from "@playwright/test"
import { test } from "../fixtures/base.js";
import { TOAST_MESSAGE } from "../testData.js";
import { description, tags, severity, Severity, link, epic, step } from "allure-js-commons";
import { createFolder } from "../helpers/preconditions.js"


test.describe('Folders', () => {

    test.skip('TC_06_22_01 | Verify the business user can create folder', async ({ page, createBusinessUserAndLogin }) => {
        const signPage = new SignPage(page);

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
        await documentsPage.clickCreateFolderBtn();
        await documentsPage.locators.getNewFolderNameInputField().fill('New Folder')
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
        await link(
            'https://app.qase.io/case/SIGN-24',
            'Qase: SIGN-24'
        );
        await link(
            'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.h4z5uzr4m1hq',
            'ATC_06_24_01'
        );
        await epic('Folders');
        await tags('Delete a folder');

        await createFolder(
            signPage,
            documentsPage,
            createFolderModal,
        );

        await signPage.sideMenu.clickDocuments();
        await documentsPage.clickOptionsDropdown();
        await documentsPage.clickDeleteBtn();
        await confirmDeleteFolderModal.clickYesDeleteBtn();

        await step('Verify the toaster notification with the "Folder deleted successfully" text appears after deleting a folder', async () => {
            await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderDeleted)
        });
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
})
