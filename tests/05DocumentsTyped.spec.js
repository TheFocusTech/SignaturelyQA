import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { createDocumentAwaiting, createFolder } from "../helpers/preconditions.js";
import { UPLOAD_FILE_PATH, UPLOAD_FILE_NAME, FOLDER_NAME, TOAST_MESSAGE } from "../testData.js";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";


test.describe('DocumentsType', () => {

    test('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, editAndResendDocumentModal, successModal, finalStepPage, documentsPage }) => {

        test.setTimeout(250 * 1000);

        await allure.description('Objective: To verify that the document can be returned for editing.');
        await allure.tags('Edit & Resend, Documents');
        await allure.severity(Severity.CRITICAL);
        await allure.link(
            "Documentation",
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.a5x7xbzct5pl",
            "TC_05_21_01"),
            await allure.epic('Documents');

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage,);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickOptionsButton();
        await documentsPage.table.clickEditAndResendBtn();

        await expect(editAndResendDocumentModal.editAndResendTitle).toBeVisible();
        expect(await editAndResendDocumentModal.getTitleText()).toBe("Edit & Resend document");

    })

    test('TC_05_21_02 | Verify that button "Revert to Draft" is active', async ({ page, createBusinessUserAndLogin, signPage, prepareForSignatureModal, successModal, editAndResendDocumentModal, finalStepPage, documentsPage }) => {

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

        await expect(page).toHaveURL(/documents.*edit$/);
        expect(await prepareForSignatureModal.getPrepareForSigningTitleText()).toBe("Prepare for Signing");

    })

    test('TC_05_18_01 | Verify Move document to folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        moveToFolderModal,
        createFolderModal }) => {
        test.slow();

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

        await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.fileMovedToFolder);

        await documentsPage.table.openFolder(FOLDER_NAME);
        await expect(await documentsPage.table.documentTitle).toHaveText(UPLOAD_FILE_NAME.jpgDocument);
    })

})
