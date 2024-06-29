import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import {
	DOCUMENT_TITLE,
	DOCUMENT_STATUS,
	MESSAGE,
	SIGNERS_DATA,
	SIGNER_ME,
	UPLOAD_FILE_PATH
} from "../testData.js";
import { createSignature } from "../helpers/preconditions.js";
import {description, tag, severity, Severity, link, epic, step} from "allure-js-commons";


test.describe("CreateDocument", () => {
	test("TC_03_07_01 | Sign a document - verify that user can sign a document themselves", async ({
		createBusinessUserAndLogin,
		signPage,
		prepareForSignatureModal,
		createSignatureOrInitialModal,
		finalStepPage,
		successModal,
		documentsPage,
	}) => {
		test.setTimeout(220 * 1000);

		await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignDocumentRadioBtn();
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
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

		await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.completed);
	});

	test("TC_03_07_06 | Verify user can create, sign, and send a document to another signer", async ({
		createBusinessUserAndLogin,
		signPage,
		prepareForSignatureModal,
		createSignatureOrInitialModal,
		finalStepPage,
		successModal,
		documentsPage,
		}) => {
		test.setTimeout(120 * 1000);
		await description('Objective: To verify the process of creating, signing, and sending a document to another signer.');
		await severity(Severity.CRITICAL);
		await link(
            "https://app.qase.io/case/SIGN-7",
            "Qase: SIGN-7"
            );
		await link(
				"Documentation",
				"https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.2np2zmox71j",
				"ATC_03_07_06"
		);
		await epic('Create Document');
		await tag('Document');

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0)
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
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

    test('TC_03_07_03 | Verify that user can create document and send for signature', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, finalStepPage, successModal, documentsPage }) => {
        test.setTimeout(220 * 1000);
        await signPage.uploadFile.fileUploader.uploadFile('testDocuments/openHouse.pdf');
        await signPage.uploadFile.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1, 0);
        await prepareForSignatureModal.fillSignerEmailField(process.env.PREFIX_EMAIL + '01' + process.env.EMAIL_DOMAIN, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickSaveBtn();
        await prepareForSignatureModal.toast.waitForToastVisible();
        await prepareForSignatureModal.toast.waitForToastHidden();
        await finalStepPage.clickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);

    })

	test("TC_03_07_02 | Verify that the user who uploaded the document and Other Signer can sign it", async ({
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

		await createSignature(
			signPage,
			settingsCompanyPage,
			settingsEditSignaturePage,
			createOrEditSignatureOnSettingModal
		);

		await signPage.uploadFileTab.fileUploader.uploadFile("testDocuments/todoList.xlsx");
		await signPage.uploadFileTab.clickPrepareDocumentBtn();
		await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
		await prepareForSignatureModal.clickAddSignerBtn();
		await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
		await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
		await prepareForSignatureModal.clickContinueBtn();
		await prepareForSignatureModal.clickGotItBtn();
		await prepareForSignatureModal.clickSignFieldsItem();
		await prepareForSignatureModal.clickDocumentBody();
		await prepareForSignatureModal.clickAssignedToDropDown();
		await prepareForSignatureModal.clickItemDropDown(SIGNER_ME);
		await chooseSignatureOrInitialModal.clickSignatureTyped();
		await chooseSignatureOrInitialModal.clickSignNowBtn();
		await prepareForSignatureModal.clickSignFieldsItem();
		await prepareForSignatureModal.clickDocumentBody();
		await prepareForSignatureModal.clickSaveBtn();
		await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
		await finalStepPage.clickSignDocumentAndSendForSignatureBtn();
		await successModal.clickBackToDocumentsBtn();

		await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
	});

	test("TC_03_07_05 | Verify that user can sign a document themselves with Initial", async ({
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

		await createSignature(
			signPage, 
			settingsCompanyPage, 
			settingsEditSignaturePage, 
			createOrEditSignatureOnSettingModal
		);

		await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignDocumentRadioBtn();
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickInitialFieldsItem();
        await prepareForSignatureModal.clickDocumentBody();
		await chooseSignatureOrInitialModal.clickSignatureTyped();
		await chooseSignatureOrInitialModal.clickSignNowBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
        await finalStepPage.fillDocumentOptionalMessageField(MESSAGE);
        await finalStepPage.clickSignDocumentBtn();
        await successModal.clickBackToDocumentsBtn();

		await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.completed);
	});
});