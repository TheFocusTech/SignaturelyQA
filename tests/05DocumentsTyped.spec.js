import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, UPLOAD_FILE_PATH, UPLOAD_FILE_NAME, FOLDER_NAME, TOAST_MESSAGE } from "../testData.js";
import { createFolder } from "../helpers/preconditions.js";
import { step } from "allure-js-commons";
import { description, tag, severity, Severity, link, epic } from "allure-js-commons";

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
    await documentsPage.table.clickOptionsBtn(0);
    await documentsPage.table.clickEditAndResendBtn();

    await expect(documentsPage.table.titleEditAndResendDocument).toBeVisible();
    expect(await documentsPage.table.getTitleText()).toBe("Edit & Resend document");

    });

    test('TC_05_18_01 | Verify moving a document to a folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        moveToFolderModal,
        createFolderModal }) => {
        test.slow();

        await description('To verify the process of moving a document into a folder.');
        await severity(Severity.CRITICAL);
        await link('https://app.qase.io/case/SIGN-18',
            'Qase: SIGN-18')
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ylpnl5bdm86k",
            "ATC_05_18_01"
        );
        await epic('Documents (typed)');
        await tag('Move_to_folder');

        await createFolder(
            signPage,
            documentsPage,
            createFolderModal);
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);
        
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickOptionsBtn(1);
        await documentsPage.table.clickMoveToBtn();
        await moveToFolderModal.selectFolder(FOLDER_NAME);
        await moveToFolderModal.clickMoveToFolderBtn();
        
        await step('Verify the toast message', async () => {
            await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.fileMovedToFolder);
        });

        await documentsPage.table.openFolder(FOLDER_NAME);
        await step('Verify the document is inside the folder', async () => {
            await expect(await documentsPage.table.documentTitle).toHaveText(UPLOAD_FILE_NAME.jpgDocument);
        });
    })

})