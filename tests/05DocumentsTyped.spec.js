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
    EMPTY_TABLE_HEADER,
    DELETED_DOCUMENTS_STATUS,
    EMAIL_SUBJECTS,
    SELECTORS,
} from '../testData.js';
import {
    createFolder,
    createDocumentAwaiting,
    createDocumentCompleted,
    uploadDraftDocument,
    createThreeDocuments,
} from '../helpers/preconditions.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';
import { signInRequest, documentIdRequest } from '../helpers/apiCalls.js';
import { retrieveEmailMessage } from '../helpers/utils';

test.describe('DocumentsType', () => {
    test('TC_05_21_01 | Verify the option "Edit&Ressend" is active', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        editAndResendDocumentModal,
        successModal,
        finalStepPage,
        documentsPage,
    }) => {
        test.setTimeout(200 * 1000);

        await description('To verify document can be returned for editing.');
        await description(
            'To verify that the "Edit&Resend" functionality correctly allows users to edit and resend a prepared document'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-21`, 'QASE: SIGN-21 ');
        await link(`${GOOGLE_DOC_LINK}a5x7xbzct5pl`, 'ATC_05_21_01');
        await epic('Documents (typed)');
        await tag('Edit & Resend');

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();

        await step('Verify the modal window "Edit & Resend" document has opened', async () => {
            await expect(editAndResendDocumentModal.editAndResendTitle).toBeVisible();
        });
        await step('Verify title of the modal window is "Edit & Resend document"', async () => {
            expect(await editAndResendDocumentModal.getTitleText()).toBe('Edit & Resend document');
        });
    });

    test('TC_05_21_02 | Verify the button "Revert to Draft" is active', async ({
        createBusinessUserAndLogin,
        page,
        signPage,
        prepareForSignatureModal,
        successModal,
        editAndResendDocumentModal,
        finalStepPage,
        documentsPage,
    }) => {
        test.setTimeout(200 * 1000);

        await description('To verify the document can be returned for editing.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-21`, 'QASE: SIGN-21 ');
        await link(`${GOOGLE_DOC_LINK}r25l83kzqn09`, 'ATC_05_21_02');
        await epic('Documents (typed)');
        await tag('Edit & Resend');

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();
        await editAndResendDocumentModal.clickRevertToDraftBtn();

        await step('Verify the "Prepare For Signing" modal window is open', async () => {
            await expect(page).toHaveURL(/documents.*edit$/);
        });

        await step('Verify title of the modal window is "Prepare for Signing"', async () => {
            expect(await prepareForSignatureModal.getPrepareForSigningTitleText()).toBe('Prepare for Signing');
        });
    });

    test('TC_05_18_01 | Verify user can move a document to a folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        moveToFolderModal,
        createFolderModal,
    }) => {
        test.slow();

        await description('To verify the business user can move a document to a folder');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-18`, 'Qase: SIGN-18');
        await link(`${GOOGLE_DOC_LINK}ylpnl5bdm86k`, 'ATC_05_18_01');
        await epic('Documents (typed)');
        await tag('Move to folder');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.jpgDocument);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickSecondOptionsBtn();
        await documentsPage.table.clickMoveToBtn();
        await moveToFolderModal.selectFolder(FOLDER_NAME);
        await moveToFolderModal.clickMoveToFolderBtn();

        await step(`Verify toast notification with the 'Files successfully moved!' text appears`, async () => {
            await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.fileMovedToFolder);
        });

        await documentsPage.table.openFolder(FOLDER_NAME);
        await step('Verify document is inside the folder.', async () => {
            await expect(await documentsPage.table.objectTitle).toHaveText(UPLOAD_FILE_NAME.jpgDocument);
        });
    });

    test('TC_05_16_01 | Verify user can send a reminder to sign the document', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        finalStepPage,
        successModal,
        documentsPage,
        documentsAwaitingPage,
        sendReminderDocumentModal,
    }) => {
        await description('To verify business user can send a reminder to sign the document.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-16`, 'Qase: SIGN-16');
        await link(`${GOOGLE_DOC_LINK}w17qlbkxlnc6`, 'ATC_05_16_01');
        await epic('Documents (typed)');
        await tag('Send reminder');

        test.setTimeout(200 * 1000);
        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.sideMenuDocuments.clickAwaitingSignature();
        await documentsAwaitingPage.table.clickFirstOptionsBtn();
        await documentsAwaitingPage.table.clickSendReminderBtn();

        await sendReminderDocumentModal.clickSignerCheckbox();
        await sendReminderDocumentModal.clickSendReminderBtn();

        await step(`Verify toast notification with the 'Reminder(s) has been sent' text appears`, async () => {
            await expect(await documentsAwaitingPage.toast.toastBody).toHaveText(TOAST_MESSAGE.sendReminder);
        });
    });

    test('TC_05_21_03 | Verify user can revert a document with "Awaiting" status to "Draft" status', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        successModal,
        editAndResendDocumentModal,
        finalStepPage,
        documentsPage,
    }) => {
        test.setTimeout(200 * 1000);

        await description('To verify business user can revert a document with "Awaiting" status to "Draft" status');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-21`, 'QASE: SIGN-21 ');
        await link(`${GOOGLE_DOC_LINK}cl44yvv352v8`, 'TC_05_21_03');
        await epic('Documents (typed)');
        await tag('Revert document');

        await createDocumentAwaiting(signPage, prepareForSignatureModal, documentsPage, successModal, finalStepPage);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();
        await editAndResendDocumentModal.clickRevertToDraftBtn();
        await prepareForSignatureModal.clickCancelBtn();
        await signPage.sideMenu.clickDocuments();

        await step('Verify document has status "Draft".', async () => {
            expect(await documentsPage.table.getDocumentStatusText()).toBe(DOCUMENT_STATUS.draft);
        });
    });

    test('TC_05_17_01 | Verify user can share a document with a status "Completed"', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createSignatureOrInitialModal,
        finalStepPage,
        successModal,
        documentsPage,
        shareThisDocumentModal,
        request,
    }) => {
        await description('To verify business user can share a document with a status "Completed" via email');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-17`, 'Qase: SIGN-17');
        await link(`${GOOGLE_DOC_LINK}sp7vb8tsrias`, 'TC_05_17_01');
        await epic('Documents (typed)');
        await tag('Share document');

        test.slow();
        const signerEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}001${process.env.EMAIL_DOMAIN}`;
        await createDocumentCompleted(
            signPage,
            prepareForSignatureModal,
            createSignatureOrInitialModal,
            finalStepPage,
            successModal,
            documentsPage
        );

        await signPage.sideMenu.clickDocuments();
        await documentsPage.sideMenuDocuments.clickCompleted();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickShareBtn();

        await shareThisDocumentModal.clickInputEmailField(signerEmail);
        await shareThisDocumentModal.clickShareDocumentBtn();

        await step(
            `Verify the toast notification with the 'Document successfully sended to specified email(s)' text appears`,
            async () => {
                await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.documentSended);
            }
        );
        const documentName = UPLOAD_FILE_PATH.jpgDocument.split('/').pop();
        const emailMessage = await retrieveEmailMessage(
            request,
            process.env.NEW_USER_NAME,
            signerEmail,
            EMAIL_SUBJECTS.sharedDocument,
            SELECTORS.message
        );
        await step('Verify user receive an email to view the document." ', async () => {
            await expect(emailMessage).toEqual(
                `${process.env.NEW_USER_NAME} (${process.env.NEW_USER_EMAIL}) added you as a viewer on ${documentName}`
            );
        });
    });

    test('TC_05_19_01 | Verify user can move a document to the trash using "Actions" options dropdown menu and delete it permanently from the trash', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        deleteModal,
        documentsTrashPage,
    }) => {
        test.setTimeout(250 * 1000);

        await description(
            'To verify business user can move a document to the trash using "Actions" options dropdown menu and delete it permanently from the trash'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-19`, 'Qase: SIGN-19');
        await link(`${GOOGLE_DOC_LINK}bpzeytlzlbz`, 'ATC_05_19_01');
        await epic('Documents (typed)');
        await tag('Delete documents');

        await uploadDraftDocument(signPage);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickOptionsDeleteBtn();
        await deleteModal.clickYesDeleteBtn();
        await documentsPage.toast.waitForToastCompleted();

        await step('Verify the table is empty', async () => {
            await expect(documentsPage.table.emptyTableHeader).toHaveText(EMPTY_TABLE_HEADER.documents);
        });

        await documentsPage.sideMenuDocuments.clickTrash();

        await step('Verify the document has a "Deleted" status', async () => {
            expect(await documentsPage.table.getDocumentStatusText()).toBe(DOCUMENT_STATUS.deleted);
        });

        await documentsTrashPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickOptionsDeleteBtn();
        await deleteModal.clickYesDeleteBtn();
        await documentsTrashPage.toast.waitForToastCompleted();

        await step('Verify the trash is empty', async () => {
            await expect(documentsTrashPage.table.emptyTableHeader).toHaveText(EMPTY_TABLE_HEADER.trash);
        });
    });

    test('TC_05_19_02 | Verify user can move documents to the trash using checkboxes and "Select_options" dropdown menu and delete them permanently from the trash', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        deleteModal,
        confirmTrashEmptyingModal,
        documentsTrashPage,
    }) => {
        test.setTimeout(250 * 1000);

        await description(
            'To verify business user can move documents to the trash using checkboxes and "Select_options" dropdown menu and delete them permanently from the trash'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-19`, 'Qase: SIGN-19');
        await link(`${GOOGLE_DOC_LINK}ba4cs1qxues0`, 'ATC_05_19_02');
        await epic('Documents (typed)');
        await tag('Delete documents');

        await createThreeDocuments(signPage);

        await signPage.sideMenu.clickDocuments();
        const { documentsToDelete, documentToSave } = await documentsPage.table.checkRandomDocuments();

        await documentsPage.clickSelectOptionsBtn();
        await documentsPage.clickSelectOptionsDeleteBtn();
        await deleteModal.clickYesDeleteBtn();
        await documentsPage.toast.waitForToastCompleted();
        await documentsPage.sideMenuDocuments.clickTrash();

        await step(`Verify the documents in the trash have the correct titles "${documentsToDelete}"`, async () => {
            await expect(documentsTrashPage.table.objectTitle).toHaveText(documentsToDelete);
        });

        await step(
            `Verify the documents in the trash have a "Deleted" status: "${DELETED_DOCUMENTS_STATUS}"`,
            async () => {
                await expect(documentsTrashPage.table.documentsStatuses).toHaveText(DELETED_DOCUMENTS_STATUS);
            }
        );

        await documentsTrashPage.clickEmptyTrashBtn();
        await confirmTrashEmptyingModal.clickEmptyTrashBtn();
        await documentsTrashPage.toast.waitForToastCompleted();

        await step('Verify the trash is empty', async () => {
            await documentsTrashPage.table.emptyTableHeader.waitFor({ state: 'visible' });
            await expect(documentsTrashPage.table.emptyTableHeader).toHaveText(EMPTY_TABLE_HEADER.trash);
        });

        await documentsTrashPage.sideMenu.clickDocuments();

        await step(
            `Verify there is only one undeleted document with the correct title "${documentToSave}" in the table`,
            async () => {
                await documentsPage.table.objectTitle.first().waitFor({ state: 'visible' });
                await expect(documentsPage.table.objectTitle).toHaveCount(1);
                await expect(documentsPage.table.objectTitle).toHaveText(documentToSave);
            }
        );
    });

    test('TC_05_20_01 | Verify user can download a document with a status "Completed" (API)', async ({
        page,
        request,
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createSignatureOrInitialModal,
        finalStepPage,
        successModal,
        documentsPage,
    }) => {
        await description('To verify business user can download a document with a status "Completed" (API)');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-20`, 'Qase: SIGN-20');
        await link(`${GOOGLE_DOC_LINK}8wxawmz1dvq1`, 'TC_05_20_01');
        await epic('Documents (typed)');
        await tag('Download document');

        test.setTimeout(120000);
        await createDocumentCompleted(
            signPage,
            prepareForSignatureModal,
            createSignatureOrInitialModal,
            finalStepPage,
            successModal,
            documentsPage
        );

        const documentName = UPLOAD_FILE_NAME.jpgDocument;
        await signPage.sideMenu.clickDocuments();
        await documentsPage.sideMenuDocuments.clickCompleted();
        await documentsPage.table.clickOptionsButtonByDocumentTitle(documentName);

        await signInRequest(request);
        const documentId = await documentIdRequest(request, documentName);
        const responsePromise = page.waitForResponse(response => response.url().includes(documentId));
        await documentsPage.table.clickDownloadBtn();
        const response = await responsePromise;

        await step('Verify the response code after clicking "Download" option is successfull', async () => {
            expect(response.status()).toBe(200);
        });
    });
});
