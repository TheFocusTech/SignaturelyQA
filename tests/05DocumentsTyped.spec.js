import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { UPLOAD_FILE_PATH, UPLOAD_FILE_NAME, FOLDER_NAME, TOAST_MESSAGE } from "../testData.js";
import { createFolder, createDocumentAwaiting } from "../helpers/preconditions.js";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

test.describe('DocumentsType', () => {

    test('TC_05_21_01 | Verify that button Edit&Resend is active', async ({ createBusinessUserAndLogin,
        signPage, prepareForSignatureModal,
        editAndResendDocumentModal, successModal,
        finalStepPage, documentsPage }) => {

        test.setTimeout(250 * 1000);

        await allure.description('Objective: To verify that the document can be returned for editing.');
        await allure.tags('Edit & Resend, Documents');
        await allure.severity(Severity.CRITICAL);
        await allure.link(
            "Documentation",
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.a5x7xbzct5pl",
            "TC_05_21_01"),
            await allure.epic('Documents');

        await createDocumentAwaiting(
            signPage, prepareForSignatureModal,
            documentsPage, successModal, finalStepPage);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickOptionsButton();
        await documentsPage.table.clickEditAndResendBtn();

        await test.step('Verify that modal window Edit & Resend document has opened', async () => {
            await expect(editAndResendDocumentModal.editAndResendTitle).toBeVisible();
        });
        await test.step('Verify that the title matches "Edit & Resend document"', async () => {
            expect(await editAndResendDocumentModal.getTitleText()).toBe("Edit & Resend document");
        });

    });

    test('TC_05_21_02 | Verify that button "Revert to Draft" is active', async ({ createBusinessUserAndLogin, page, signPage, prepareForSignatureModal, successModal, editAndResendDocumentModal, finalStepPage, documentsPage }) => {

        test.setTimeout(250 * 1000);

        await allure.description('Objective: To verify that the document can be returned for editing.');
        await allure.tags('Edit & Resend, Documents');
        await allure.severity(Severity.CRITICAL);
        await allure.link(
            "Documentation",
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.r25l83kzqn09",
            "TC_05_21_02"),

            await allure.epic('Documents');

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickOptionsButton();
        await documentsPage.table.clickEditAndResendBtn();
        await editAndResendDocumentModal.clickRevertToDraftBtn();

        await test.step('Verify that the editing window is open', async () => {
            await expect(page).toHaveURL(/documents.*edit$/);
        });

        await test.step('Verify that the title matches "Prepare for Signing"', async () => {
            expect(await prepareForSignatureModal.getPrepareForSigningTitleText()).toBe("Prepare for Signing");

        });
    })

    test('TC_05_18_01 | Verify moving a document to a folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        moveToFolderModal,
        createFolderModal }) => {
        test.slow();

        await allure.description('To verify the process of moving a document into a folder.');
        await allure.tags('Move_to_folder');
        await allure.severity(Severity.CRITICAL);
        await allure.link(
            "Documentation",
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ylpnl5bdm86k",
            "TC_05_18_01"
        );
        await allure.epic('Documents (typed)');

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

        await test.step('Verify the toast message', async () => {
            await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.fileMovedToFolder);
        });

        await documentsPage.table.openFolder(FOLDER_NAME);
        await test.step('Verify the document is inside the folder', async () => {
            await expect(await documentsPage.table.documentTitle).toHaveText(UPLOAD_FILE_NAME.jpgDocument);
        });
    })


})
