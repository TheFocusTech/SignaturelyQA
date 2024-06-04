import { expect } from "@playwright/test"
import { test, loginBusinessUser, createNewFolder } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage.js";
import { UPLOAD_FILE_PATH, UPLOAD_FILE_NAME, FILL_FOLDER_NAME, TOASTER_MESSAGE } from "../testData.js";

test.describe('Documents (Types)', () => {

    test('TC_05_18_01 | Verify Move document to folder', async ({ page, loginBusinessUser, createNewFolder }) => {
        test.slow();
        const signPage = new SignPage(page); 

        await signPage.clickUploadFileBtn(UPLOAD_FILE_PATH);
        await signPage.waitForPrepareDocumentBtnIsActive();

        const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
        await documentsPage.waitForFDocumentNameToBeVisible(UPLOAD_FILE_NAME);
        await documentsPage.waitForFDocumentNameToBeVisible(FILL_FOLDER_NAME);
        const NUMBER = await documentsPage.getNumberOfDocument(UPLOAD_FILE_NAME);
        await documentsPage.clickOptionsButton(NUMBER);
        await documentsPage.clickMoveToFolderOption();
        await documentsPage.selectFolderToMoveTo(FILL_FOLDER_NAME);
        await documentsPage.clickMoveToFolderButton();

        await expect(await documentsPage.locators.getToaster()).toHaveText(TOASTER_MESSAGE.fileMovedToFolder);
        
        await documentsPage.openFolder(FILL_FOLDER_NAME);
        const ALL_DOC_NAMES_OF_TABLE_CONTROLS_PATH = await documentsPage.locators.getTableControlsPath();
        const ALL_DOC_NAMES_OF_TABLE_CONTROLS_PATH_SPLITTED = ALL_DOC_NAMES_OF_TABLE_CONTROLS_PATH.join("\n").split("\n").join(" ");

        await expect(ALL_DOC_NAMES_OF_TABLE_CONTROLS_PATH_SPLITTED).toContain(FILL_FOLDER_NAME);
        await expect(await documentsPage.locators.getDocumentTitle(UPLOAD_FILE_NAME)).toBeVisible();

        await documentsPage.goToRootPathItem();
        await documentsPage.waitForFDocumentNameToBeVisible(FILL_FOLDER_NAME);
        await documentsPage.clickOptionsBtn();
        await documentsPage.clickDeleteBtn();
        await documentsPage.clickYesDeleteBtn();
        const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();
        await documentsTrashPage.clickEmptyTrashBtn();
        await documentsTrashPage.clickConfirmEmptyTrashBtn();
        await documentsTrashPage.clickSignSidebarLinkAndGoSignPage();
    })
})