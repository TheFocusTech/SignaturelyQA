import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import {
    DOCUMENT_TITLE,
    DOCUMENT_STATUS,
    MESSAGE,
    SIGNERS_DATA,
    SIGNER_ME,
    UPLOAD_FILE_PATH,
    QASE_LINK,
    GOOGLE_DOC_LINK,
	TOAST_MESSAGE,
    BULK_DOCUMENTS,
    CREATE_TEMPLATE,
} from '../testData.js';
import { createSignature, createTemplate } from '../helpers/preconditions.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('CreateDocument', () => {
    test('TC_03_07_01 | Sign a document - verify that user can sign a document themselves', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createSignatureOrInitialModal,
        finalStepPage,
        successModal,
        documentsPage,
    }) => {
        test.setTimeout(220 * 1000);

        await description('Objective: To verify the process of creating and signing a document');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-7`, 'Qase: SIGN-7');
        await link(`${GOOGLE_DOC_LINK}yaxaf6jrhsdw`, 'TC_03_07_01');
        await epic('Create Document');
        await tag('Sign a document: me');

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignDocumentRadioBtn();
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await createSignatureOrInitialModal.fillInputSignature(SIGNERS_DATA.signerName1);
        await createSignatureOrInitialModal.clickCheckboxAgree();
        await createSignatureOrInitialModal.clickSignNowBtn();
        await prepareForSignatureModal.toast.clickToastFirstCloseBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
        await finalStepPage.fillDocumentOptionalMessageField(MESSAGE);
        await finalStepPage.clickSignDocumentBtn();
        await successModal.clickBackToDocumentsBtn();

        await step('Verify the created document is in the table with the label "COMPLETED".', async () => {
        await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.completed);
        });
    });

    test('TC_03_07_06 | Verify user can create, sign, and send a document to another signer', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        createSignatureOrInitialModal,
        finalStepPage,
        successModal,
        documentsPage,
    }) => {
        test.setTimeout(120 * 1000);
        await description(
            'Objective: To verify the process of creating, signing, and sending a document to another signer.'
        );
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-7`, 'Qase: SIGN-7');
        await link(`${GOOGLE_DOC_LINK}2np2zmox71j`, 'ATC_03_07_06');
        await epic('Create Document');
        await tag('Document');

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickDocumentBody();
        await prepareForSignatureModal.clickAssignedToDropDown();
        await prepareForSignatureModal.clickItemDropDown(SIGNER_ME);
        await createSignatureOrInitialModal.clickCheckboxAgree();
        await createSignatureOrInitialModal.clickSignNowBtn();
        await prepareForSignatureModal.toast.clickToastFirstCloseBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
        await finalStepPage.clickSignDocumentAndSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();

        await step('Verify the created document is in the table with the label "AWAITING".', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
        });
    });
	
    test('TC_03_07_03 | Verify user can create document and send it for signature', async ({ 
		createBusinessUserAndLogin, 
		signPage, 
		prepareForSignatureModal, 
		finalStepPage, 
		successModal, 
		documentsPage
	}) => {
        test.setTimeout(220 * 1000);

		await description('Objective: To verify the process of creating and sending a document for signature.');
		await severity(Severity.CRITICAL);
		await link(
            `${QASE_LINK}/SIGN-7`,
            "Qase: SIGN-7"
            );
		await link(
			"Documentation",
			`${GOOGLE_DOC_LINK}hvbgto58wwgb`,
			"ATC_03_07_03"
		);
		await epic('Create Document');
		await tag('Send Document');
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
        await finalStepPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.success);
        await finalStepPage.clickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await step('Verify the created document is in the table with the label "AWAITING".', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
        });
    })

    test('TC_03_07_02 | Verify that the user who uploaded the document and Other Signer can sign it', async ({
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
        test.setTimeout(160 * 1000);

        await description(
            'Objective: To verify the process of creating, signing, and sending a document to another signer.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-7`, 'Qase: SIGN-7');
        await link(`${GOOGLE_DOC_LINK}rfos5y3gy8ag`, 'ATC_03_07_02');
        await epic('Create Document');
        await tag('me&others');

        await createSignature(
            signPage,
            settingsCompanyPage,
            settingsEditSignaturePage,
            createOrEditSignatureOnSettingModal
        );

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
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

        await step('Verify the created document is in the table with the label "AWAITING".', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
        });
    });

    test('TC_03_07_05 | Verify that user can sign a document themselves with Initial', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        settingsCompanyPage,
        settingsEditSignaturePage,
        createOrEditSignatureOnSettingModal,
        chooseSignatureOrInitialModal,
        finalStepPage,
        successModal,
        documentsPage,
    }) => {
        test.setTimeout(220 * 1000);

        await description('Objective: Verify that user can sign a document themselves with Initial');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-7`, 'Qase: SIGN-7');
        await link(`${GOOGLE_DOC_LINK}cd9kwkury3z7`, 'ATC_03_07_05');
        await epic('Create Document');
        await tag('Sign a document: me');

        await createSignature(
            signPage,
            settingsCompanyPage,
            settingsEditSignaturePage,
            createOrEditSignatureOnSettingModal
        );

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignDocumentRadioBtn();
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickInitialOnFieldsMenu();
        await prepareForSignatureModal.clickDocumentBody();
        await chooseSignatureOrInitialModal.clickSignatureTyped();
        await chooseSignatureOrInitialModal.clickSignNowBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
        await finalStepPage.fillDocumentOptionalMessageField(MESSAGE);
        await finalStepPage.clickSignDocumentBtn();
        await successModal.clickBackToDocumentsBtn();

        await step('Verify the created document is in the table with the label "COMPLETED".', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.completed);
        });
    });

    test.only("TC_03_09_01 | Create Documents via Bulk Send", async ({
         createBusinessUserAndLogin,
         signPage,
         documentsPage,
         templatesPage,
         createNewTemplatePage,
         prepareForSignatureModal,
         selectNameAndEmailColumnsModal
    }) => {
        test.setTimeout(160 * 1000);

        await description('Objective: Enable document distribution via Bulk Send.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-9`, 'Qase: SIGN-9');
        await link(`${GOOGLE_DOC_LINK}887tkak398is`, 'ATC_03_09_01');
        await epic('Create Document');
        await tag('Bulk Send');

        await createTemplate(
            signPage,
            prepareForSignatureModal,
            templatesPage,
            createNewTemplatePage
        );

        await signPage.clickBulkSendTab();

        await signPage.bulkSendTab.selectTemplate();
        await signPage.bulkSendTab.fileUploader.uploadCsvFile(UPLOAD_FILE_PATH.csvDocument);
        await signPage.bulkSendTab.clickSelectColumnsBtn();

        await selectNameAndEmailColumnsModal.selectColumnName();
        await selectNameAndEmailColumnsModal.selectColumnEmail();
        await selectNameAndEmailColumnsModal.clickRequestSignaturesBtn();

        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.documentsSuccess);
        await documentsPage.waitForDocumentsUpload();

        await step(`Verify that the total number of created documents is ${BULK_DOCUMENTS.number}.`, async () => {
            await expect(documentsPage.numberOfDocuments).toHaveText(BULK_DOCUMENTS.number);
        });

        await documentsPage.getRandomIndexForShownDocuments();
        const randomIndex1 = await documentsPage.randomIndex1;
        const randomIndex2 = await documentsPage.randomIndex2;

        await step(`Verify that on page 1 the random document (nth-${randomIndex1}) has the title "${CREATE_TEMPLATE.nameField}".`, async () => {
            await expect(documentsPage.table.objectTitle.nth(randomIndex1)).toHaveText(CREATE_TEMPLATE.nameField);
        });

        await documentsPage.clickPage2Btn();

        await step(`Verify that on page 2 the random document (nth-${randomIndex2}) has the title "${CREATE_TEMPLATE.nameField}".`, async () => {
            await expect(documentsPage.table.objectTitle.nth(randomIndex2)).toHaveText(CREATE_TEMPLATE.nameField);
        });
    });
});