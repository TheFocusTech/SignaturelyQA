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

	test("TC_03_07_06 | Verify that the user who uploaded the document and created a signature and Other Signer can sign it", async ({
		createBusinessUserAndLogin,
		signPage,
		prepareForSignatureModal,
		createSignatureOrInitialModal,
		finalStepPage,
		successModal,
		documentsPage,
	}) => {
		test.setTimeout(120 * 1000);

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

		await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
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
});