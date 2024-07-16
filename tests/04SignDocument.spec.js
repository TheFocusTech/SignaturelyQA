import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';
import {
    DOCUMENT_STATUS,
    SIGNERS_DATA,
    TOAST_MESSAGE,
    UPLOAD_FILE_PATH,
    EMAIL_SUBJECTS,
    SELECTORS,
    SUCCESS_TITLE,
    SERVICE_NAME,
    EMAIL_MESSAGE,
    DOCUMENT_TITLE,
    SIGNER_ME,
    QASE_LINK,
    GOOGLE_DOC_LINK,
    ENDPOINT_FOR_DECLINE,
} from '../testData.js';
import { retrieveUserEmailConfirmationLink, retrieveEmailMessage, editDocumentStatus } from '../helpers/utils.js';
import { createSignature, uploadDraftDocument } from '../helpers/preconditions.js';

test.describe('Sign Document', () => {
    test('TC_04_11_01 | Verify user can choose a custom signing order.', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
    }) => {
        await description('To verify user can choose a custom signing order.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-11`, 'Qase: SIGN-11');
        await link(`${GOOGLE_DOC_LINK}7y8njhymxgmj`, 'ATC_04_11_01');
        await epic('Sign document');
        await tag('Signing order');

        test.setTimeout(250 * 1000);

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();

        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);

        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName2, 1);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail2, 1);

        await prepareForSignatureModal.clickCustomSigningOrderCheckbox();

        await step('Verify custom signing order position number 1 is displayed', async () => {
            await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toBeVisible();
            await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toHaveText('1.');
        });

        await step('Verify custom signing order position number 2 is displayed', async () => {
            await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toBeVisible();
            await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toHaveText('2.');
        });
    });

    test('TC_04_14_01 | Verify user can add viewers to view the document.', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        finalStepPage,
        documentsPage,
        successModal,
        createSignatureOrInitialModal,
        notRegisterSignerSignPage,
        signerAlmostDoneModal,
        documentSubmitProccessModal,
        page,
        request,
    }) => {
        test.setTimeout(270 * 1000);

        await description(
            'To verify user can add viewers to view the document. \n Attention: Page can be reloaded if application state not synchronized.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-14`, 'Qase: SIGN-14');
        await link(`${GOOGLE_DOC_LINK}ojom1b8sk9ht`, 'ATC_04_14_01');
        await epic('Sign document');
        await tag('Viewers');

        const signerName = `${process.env.NEW_USER_NAME}${'001'}`;
        const signerEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'001'}${
            process.env.EMAIL_DOMAIN
        }`;
        const reviewerEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'003'}${
            process.env.EMAIL_DOMAIN
        }`;

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(signerName, 0);
        await prepareForSignatureModal.fillSignerEmailField(signerEmail, 0);
        await prepareForSignatureModal.clickAddRecipientsBtn();
        await prepareForSignatureModal.fillRecipientEmailField(reviewerEmail);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSaveBtn();

        await finalStepPage.waitAndClickSendForSignatureBtn(TOAST_MESSAGE.success);
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.table.waitForDocumentStatus(page, DOCUMENT_STATUS.awaiting);

        const signerLink = await retrieveUserEmailConfirmationLink(
            request,
            signerEmail,
            EMAIL_SUBJECTS.signatureRequest
        );
        await step('Navigate to Signing document link', async () => {
            await page.goto(signerLink);
        });

        await notRegisterSignerSignPage.clickSignInput();
        await createSignatureOrInitialModal.clickCheckboxAgree();
        await createSignatureOrInitialModal.clickSignNowBtn();
        await notRegisterSignerSignPage.clickSubmitBtn();
        await signerAlmostDoneModal.clickIAgreeBtn();
        await notRegisterSignerSignPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.documentSubmited);
        await documentSubmitProccessModal.waitForSubmitTitleByText(SUCCESS_TITLE.submit);

        const message = await retrieveEmailMessage(
            request,
            SERVICE_NAME,
            reviewerEmail,
            EMAIL_SUBJECTS.sentToView,
            SELECTORS.message
        );

        await step('Verify viewer has received an email to view the document.', async () => {
            expect(message).toEqual(`${process.env.NEW_USER_NAME} (${process.env.NEW_USER_EMAIL})${EMAIL_MESSAGE}`);
        });
    });

    test('TC_04_10_01 | Verify user can sign a document.', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        finalStepPage,
        documentsPage,
        successModal,
        createSignatureOrInitialModal,
    }) => {
        test.setTimeout(250 * 1000);

        await description('To verify user can sign document as themselves.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-10`, 'Qase: SIGN-10');
        await link(`${GOOGLE_DOC_LINK}jl55qbudbe8i`, 'ATC_04_10_01');
        await epic('Sign document');
        await tag('me');

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignDocumentRadioBtn();
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await createSignatureOrInitialModal.clickCheckboxAgree();
        await createSignatureOrInitialModal.clickSignNowBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.clickSignDocumentBtn();
        await successModal.clickBackToDocumentsBtn();

        await step('Verify document has a "Completed" status', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.completed);
        });
    });

    test('TC_04_10_02 | Verify user and other signer can sign  document.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsEditSignaturePage,
        createOrEditSignatureOnSettingModal,
        prepareForSignatureModal,
        chooseSignatureOrInitialModal,
        finalStepPage,
        successModal,
        documentsPage,
    }) => {
        test.setTimeout(270 * 1000);

        await description('To verify user and other signer can sign document.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-10`, 'Qase: SIGN-10');
        await link(`${GOOGLE_DOC_LINK}s5pa7fnboi83`, 'TC_04_10_02');
        await epic('Sign document');
        await tag('me&others');

        await createSignature(
            signPage,
            settingsCompanyPage,
            settingsEditSignaturePage,
            createOrEditSignatureOnSettingModal
        );

        await uploadDraftDocument(signPage, prepareForSignatureModal);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.sideMenuDocuments.clickDraft();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName2, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail2, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickAssignedToDropDown();
        await prepareForSignatureModal.clickItemDropDown(SIGNER_ME);
        await chooseSignatureOrInitialModal.clickSignatureTyped();
        await chooseSignatureOrInitialModal.clickSignNowBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
        await finalStepPage.clickSignDocumentAndSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();

        await step('Verify document has "Awaiting" status', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
        });
    });

    test('TC_04_13_01 | Verify document expiration.', async ({
        createBusinessUserAndLogin,
        page,
        request,
        signPage,
        prepareForSignatureModal,
        finalStepPage,
        documentsPage,
        successModal,
    }) => {
        await description(
            'To verify updating document status to "Expired" in the database reflects correctly on the front-end display. \n Attention: Refresh the page twice: \n - if application state not synchronized \n - after changing the status in the database.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-13`, 'Qase: SIGN-13');
        await link(`${GOOGLE_DOC_LINK}fm3jt5v1qq97`, 'ATC_04_13_01');
        await epic('Sign document');
        await tag('Expired status');

        test.setTimeout(250 * 1000);
        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSaveBtn();

        await finalStepPage.expirationDateCalendar.clickSelectDate();
        await finalStepPage.expirationDateCalendar.pickExpirationDateInCalendar();
        await finalStepPage.expirationDateCalendar.clickSelectBtn();
        await finalStepPage.clickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.table.waitForDocumentStatus(page, DOCUMENT_STATUS.awaiting);

        const documentName = UPLOAD_FILE_PATH.xlsxDocument.split('/').pop();
        await editDocumentStatus(request, documentName, DOCUMENT_STATUS.expired);
        await step('Refresh page.', async () => {
            await page.reload();
        });

        await step('Verify document has "Expired" status.', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.expired);
        });
    });

    test('TC_04_11_02 | Verify user can set custom signing order between others signers.', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
    }) => {
        test.setTimeout(250 * 1000);

        await description('To verify user can set custom signing order between others signers.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-11`, 'Qase: SIGN-11');
        await link(`${GOOGLE_DOC_LINK}jc3cfedpihif`, 'ATC_04_11_02');
        await epic('Sign document');
        await tag('Signing order');

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSendForSignatureRadioBtn();

        for (let i = 0; i < 3; i++) {
            const signerName = `${process.env.NEW_USER_NAME}${'00'}${i}`;
            const signerEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'00'}${i}${
                process.env.EMAIL_DOMAIN
            }`;

            await prepareForSignatureModal.clickAddSignerBtn();
            await prepareForSignatureModal.fillSignerNameField(signerName, i);
            await prepareForSignatureModal.fillSignerEmailField(signerEmail, i);
        }
        await prepareForSignatureModal.clickCustomSigningOrderCheckbox();

        await step('Verify customers orders number visibility.', async () => {
            await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toBeVisible();
        });

        await step('Verify customers orders has been positioned.', async () => {
            await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toHaveText('1.');
        });

        await prepareForSignatureModal.customSigningOrderPositionNumberOne.dragTo(
            prepareForSignatureModal.customSigningOrderPositionNumberTwo
        );

        await step("Verify customers' orders have been changed.", async () => {
            expect(prepareForSignatureModal.signerNameField.nth(1)).toHaveValue(
                `${process.env.NEW_USER_NAME}${'00'}${1}`
            );
        });
    });

    test('TC_04_12_01 | Verify signer can decline to sign the document.', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        finalStepPage,
        documentsPage,
        successModal,
        declineModal,
        notRegisterSignerSignPage,
        page,
        request,
    }) => {
        test.setTimeout(250 * 1000);

        await description(
            'To verify signer can decline to sign the document. \n Attention: \n - Script contains commented code due to delayed reminder. \n - Page can be reloaded if application state not synchronized.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-12`, 'Qase: SIGN-12');
        await link(`${GOOGLE_DOC_LINK}hlvzt2b5ake7`, 'ATC_04_12_01');
        await epic('Sign document');
        await tag('Decline signature');

        const signerName = `${process.env.NEW_USER_NAME}${'001'}`;
        const signerEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'001'}${
            process.env.EMAIL_DOMAIN
        }`;

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(signerName, 0);
        await prepareForSignatureModal.fillSignerEmailField(signerEmail, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSaveBtn();
        await prepareForSignatureModal.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.success);
        await finalStepPage.clickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.table.waitForDocumentStatus(page, DOCUMENT_STATUS.awaiting);

        // TODO permanently pass step with Send Reminder
        // await documentsPage.table.clickOptionsBtn(0);
        // await documentsPage.table.clickSendReminderBtn();
        // await sendReminderDocumentModal.clickSignerCheckbox();
        // await sendReminderDocumentModal.clickSendReminderBtn();
        // await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.sendReminder);

        const signerLink = await retrieveUserEmailConfirmationLink(
            request,
            signerEmail,
            EMAIL_SUBJECTS.signatureRequest
        );

        await step('Navigate to Signing document link to decline document.', async () => {
            await page.goto(signerLink + ENDPOINT_FOR_DECLINE);
        });

        declineModal.clickDeclineBtn();
        await notRegisterSignerSignPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.declineDocument);

        await step('Verify Success Modal has "Document Declined" title.', async () => {
            await expect(await successModal.title).toHaveText(SUCCESS_TITLE.declined);
        });

        successModal.clickReturnToDocumentsBtn();
        documentsPage.sideMenuDocuments.clickVoided();

        await step('Verify document has "Declined" status.', async () => {
            await documentsPage.table.documentStatus.waitFor();
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.declined);
        });
    });

    test('TC_04_10_03 | Verify user can send document to the signer.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsEditSignaturePage,
        createOrEditSignatureOnSettingModal,
        prepareForSignatureModal,
        chooseSignatureOrInitialModal,
        finalStepPage,
        successModal,
        documentsPage,
    }) => {
        test.setTimeout(270 * 1000);

        await description('To verify user can send document to the signer.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-10`, 'Qase: SIGN-10');
        await link(`${GOOGLE_DOC_LINK}o1a44zgp2uji`, 'TC_04_10_03');
        await epic('Sign document');
        await tag('others');

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName2, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail2, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.clickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();

        await step('Verify the document has "Awaiting" status.', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
        });
    });
});
