import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import {
	DOCUMENT_TITLE,
	DOCUMENT_STATUS,
	MESSAGE,
	SIGNERS_DATA,
	SIGNER_ME
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
        await prepareForSignatureModal.doCanvasClicks();
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
		createFreeUserAndLogin,
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
				"Documentation",
				"https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.2np2zmox71j",
				"TC_03_07_06"
		);
		await epic('Create Document');
		await tag('Create Document');

        await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0)
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickAssignedToDropDown();
        await prepareForSignatureModal.clickItemDropDown(SIGNER_ME);
        await createSignatureOrInitialModal.clickCheckboxAgree();
        await createSignatureOrInitialModal.clickSignNowBtn();
        await prepareForSignatureModal.toast.clickToastFirstCloseBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
        await finalStepPage.clickSignDocumentAndSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();

		await test.step('Verify the created document is in the table with the label "AWAITING".', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
        });
	});

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
		await prepareForSignatureModal.doCanvasClicks();
		await prepareForSignatureModal.clickAssignedToDropDown();
		await prepareForSignatureModal.clickItemDropDown(SIGNER_ME);
		await chooseSignatureOrInitialModal.clickSignatureTyped();
		await chooseSignatureOrInitialModal.clickSignNowBtn();
		await prepareForSignatureModal.clickSignFieldsItem();
		await prepareForSignatureModal.doCanvasClicks();
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
        await prepareForSignatureModal.doCanvasClicks();
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