import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, UPLOAD_FILE_PATH, UPLOAD_FILE_NAME, FOLDER_NAME, TOAST_MESSAGE } from "../testData.js";

test.describe('DocumentsType', () => {

  test('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, successModal, finalStepPage, documentsPage }) => {

    test.setTimeout(250 * 1000);

    await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFileTab.clickPrepareDocumentBtn();

    await prepareForSignatureModal.clickSendForSignatureRadioBtn();
    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
    await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
    await prepareForSignatureModal.clickContinueBtn();
    await prepareForSignatureModal.clickGotItBtn();

    await prepareForSignatureModal.clickSignFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();
    await prepareForSignatureModal.clickSaveBtn();

    await finalStepPage.waitAndClickSendForSignatureBtn();
    await successModal.clickBackToDocumentsBtn();
    await documentsPage.table.clickOptionsBtn();
    await documentsPage.table.clickEditAndResendBtn();

    await expect(documentsPage.table.titleEditAndResendDocument).toBeVisible();
    expect(await documentsPage.table.getTitleText()).toBe("Edit & Resend document");

    });

    test('TC_05_18_01 | Verify Move document to folder', async ({ createBusinessUserAndLogin, signPage, documentsPage }) => {
        test.slow();

        await signPage.sideMenu.clickDocuments();
        await documentsPage.clickCreateFolderBtn();
        await documentsPage.createFolderModal.fillNewFolderName(FOLDER_NAME);
        await documentsPage.createFolderModal.clickCreateBtn();
        await documentsPage.sideMenu.clickSign();
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderCreated);
        
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.waitForDocumentTitleVisible(UPLOAD_FILE_NAME);
        await documentsPage.table.waitForDocumentTitleVisible(FOLDER_NAME);
        await documentsPage.table.clickNthOptionsBtn(1);
        await documentsPage.table.clickMoveToBtn();
        await documentsPage.moveToFolderModal.selectFolder(FOLDER_NAME);
        await documentsPage.moveToFolderModal.clickMoveToFolderBtn();

        await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.fileMovedToFolder);

        await documentsPage.table.openFolder(FOLDER_NAME);
        await expect(documentsPage.table.documentTitle).toHaveText(UPLOAD_FILE_NAME);
    })

})