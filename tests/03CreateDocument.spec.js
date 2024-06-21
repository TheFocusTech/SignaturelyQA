import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { DOCUMENT_TITLE, DOCUMENT_STATUS, CHOOSE_SIGNERS_FIELDS, MESSAGE } from "../testData.js";
import PrepareForSignatureModal from "../new_pom/modalWindows/prepareForSignatureModal.js";

test.describe('CreateDocument', () => {

    test('TC_03_07_01 | Sign a document - verify that user can sign a document themselves', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, createSignatureModal, finalStepPage, successModal, documentsPage }) => {
        test.setTimeout(220 * 1000);

        await signPage.uploadFile.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.uploadFile.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignDocumentRadioBtn();
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await createSignatureModal.fillInputSignature(CHOOSE_SIGNERS_FIELDS.name1);
        await createSignatureModal.clickCheckboxAgree();
        await createSignatureModal.clickSignNowBtn();
        await prepareForSignatureModal.toast.clickToastFirstCloseBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
        await finalStepPage.fillDocumentOptionalMessageField(MESSAGE);
        await finalStepPage.clickSignDocumentBtn();
        await successModal.clickBackToDocumentsBtn();

        await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.completed);
    });

    test('TC_03_07_06 | Verify that the user who uploaded the document and created a signature and Other Signer can sign it', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, createSignatureModal, finalStepPage, successModal, documentsPage }) => {
        test.setTimeout(120 * 1000);

        await signPage.uploadFile.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await signPage.uploadFile.clickPrepareDocumentBtn();
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1, 0)
        await prepareForSignatureModal.fillSignerEmailField(process.env.PREFIX_EMAIL + '01' + process.env.EMAIL_DOMAIN, 0);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickAssignedToDropDown();
        await prepareForSignatureModal.clickMeNowDropDownItem();
        await createSignatureModal.clickCheckboxAgree();
        await createSignatureModal.clickSignNowBtn();
        await prepareForSignatureModal.toast.clickToastFirstCloseBtn();
        await prepareForSignatureModal.clickSaveBtn();
        await finalStepPage.fillDocumentTitleField(DOCUMENT_TITLE);
        await finalStepPage.clickSignDocumentAndSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();

        await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
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

})