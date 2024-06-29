import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import {
    UPLOAD_FILE_PATH,
    UPLOAD_FILE_NAME,
    FOLDER_NAME,
    TOAST_MESSAGE,
    DOCUMENT_STATUS,
    QASE_LINK,
    GOOGLE_DOC_LINK,
} from '../testData.js';
import { createFolder, createDocumentAwaiting } from '../helpers/preconditions.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('DocumentsType', () => {
    test('TC_05_21_01 | Verify that button Edit&Resend is active', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        editAndResendDocumentModal,
        successModal,
        finalStepPage,
        documentsPage,
    }) => {
        test.setTimeout(250 * 1000);

        await description('Objective: To verify that the document can be returned for editing.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-21`, 'QASE: SIGN-21 ');
        await link(`${GOOGLE_DOC_LINK}a5x7xbzct5pl`, 'ATC_05_21_01');
        await tag('Edit & Resend, Documents');
        await epic('Documents (typed)');

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();

        await step('Verify that modal window Edit & Resend document has opened', async () => {
            await expect(editAndResendDocumentModal.editAndResendTitle).toBeVisible();
        });
        await step('Verify that the title matches "Edit & Resend document"', async () => {
            expect(await editAndResendDocumentModal.getTitleText()).toBe('Edit & Resend document');
        });
    });

    test('TC_05_21_02 | Verify that button "Revert to Draft" is active', async ({
        createBusinessUserAndLogin,
        page,
        signPage,
        prepareForSignatureModal,
        successModal,
        editAndResendDocumentModal,
        finalStepPage,
        documentsPage,
    }) => {
        test.setTimeout(250 * 1000);

        await description('Objective: To verify that the document can be returned for editing.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-21`, 'QASE: SIGN-21 ');

        await link(`${GOOGLE_DOC_LINK}r25l83kzqn09`, 'ATC_05_21_02');
        await tag('Edit & Resend, Documents');
        await epic('Documents (typed)');

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();
        await editAndResendDocumentModal.clickRevertToDraftBtn();

        await step('Verify that the editing window is open', async () => {
            await expect(page).toHaveURL(/documents.*edit$/);
        });

        await step('Verify that the title matches "Prepare for Signing"', async () => {
            expect(await prepareForSignatureModal.getPrepareForSigningTitleText()).toBe('Prepare for Signing');
        });
    });

    test('TC_05_18_01 | Verify moving a document to a folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        moveToFolderModal,
        createFolderModal,
    }) => {
        test.slow();

        await description('To verify the process of moving a document into a folder.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-18`, 'Qase: SIGN-18');
        await link(`${GOOGLE_DOC_LINK}ylpnl5bdm86k`, 'ATC_05_18_01');
        await epic('Documents (typed)');
        await tag('Move_to_folder');

        await createFolder(signPage, documentsPage, createFolderModal);
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickSecondOptionsBtn();
        await documentsPage.table.clickMoveToBtn();
        await moveToFolderModal.selectFolder(FOLDER_NAME);
        await moveToFolderModal.clickMoveToFolderBtn();

        await step('Verify the toast message', async () => {
            await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.fileMovedToFolder);
        });

        await documentsPage.table.openFolder(FOLDER_NAME);
        await step('Verify the document is inside the folder', async () => {
            await expect(await documentsPage.table.objectTitle).toHaveText(UPLOAD_FILE_NAME.jpgDocument);
        });
    });

    test('TC_05_16_01 | Verify that the user receives an email reminder to sign the document', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        finalStepPage,
        successModal,
        documentsPage,
        documentsAwaitingPage,
        sendReminderDocumentModal,
    }) => {
        test.setTimeout(250 * 1000);

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.sideMenuDocuments.clickAwaitingSignature();
        await documentsAwaitingPage.table.clickFirstOptionsBtn();
        await documentsAwaitingPage.table.clickSendReminderBtn();

        await sendReminderDocumentModal.clickSignerCheckbox();
        await sendReminderDocumentModal.clickSendReminderBtn();

        await expect(await documentsAwaitingPage.toast.toastBody).toHaveText(TOAST_MESSAGE.sendReminder);
    });

    test('TC_05_21_03 | Verify that document_status is  Draft', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        successModal,
        editAndResendDocumentModal,
        finalStepPage,
        documentsPage,
    }) => {
        test.setTimeout(250 * 1000);

        await description('Objective: To verify that the document can be returned for editing.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-21`, 'QASE: SIGN-21 ');
        await link(`${GOOGLE_DOC_LINK}cl44yvv352v8`, 'TC_05_21_03');

        await tag('Revert document');
        await epic('Documents (typed)');

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();
        await editAndResendDocumentModal.clickRevertToDraftBtn();
        await prepareForSignatureModal.clickCancelBtn();
        await signPage.sideMenu.clickDocuments();

        await step('Verify the document has status "Draft" ', async () => {
            expect(await documentsPage.table.getDocumentStatusText()).toBe(DOCUMENT_STATUS.draft);
        });
    });
});
