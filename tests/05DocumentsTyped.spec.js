import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, UPLOAD_FILE_PATH, UPLOAD_FILE_NAME, FOLDER_NAME, TOAST_MESSAGE } from "../testData.js";
import { createCompletedField } from '../helpers/preconditions.js';
import { createFolder } from "../helpers/preconditions.js";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

test.describe('DocumentsType', () => {

  test('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, successModal, finalStepPage, documentsPage }) => {

    test.setTimeout(250 * 1000);

    await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFileTab.clickPrepareDocumentBtn();

    await prepareForSignatureModal.clickSendForSignatureRadioBtn();
    await prepareForSignatureModal.clickAddSignerBtn();
    await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
    await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
    await prepareForSignatureModal.clickContinueBtn();
    await prepareForSignatureModal.clickGotItBtn();

    await prepareForSignatureModal.clickSignFieldsItem();
    await prepareForSignatureModal.doCanvasClicks();
    await prepareForSignatureModal.clickSaveBtn();

    await finalStepPage.waitAndClickSendForSignatureBtn();
    await successModal.clickBackToDocumentsBtn();
    await documentsPage.table.clickOptionsBtn(0);
    await documentsPage.table.clickEditAndResendBtn();

    await expect(documentsPage.table.titleEditAndResendDocument).toBeVisible();
    expect(await documentsPage.table.getTitleText()).toBe("Edit & Resend document");

    });

    
    test('TC_05_17_01 | Share document', async ({createBusinessUserAndLogin, signPage, prepareForSignatureModal, chooseSignatureOrInitialModal, finalStepPage, successModal, documentsPage, shareThisDocumentModal}) => {   
        test.slow();   
        await createCompletedField(signPage, prepareForSignatureModal, chooseSignatureOrInitialModal, finalStepPage, successModal);
            
        await documentsPage.sideMenuDocuments.clickCompletedLink();
        await documentsPage.table.clickOptionsBtn(0);
        await documentsPage.table.clickOptionsShareDropdown();
    
        await shareThisDocumentModal.clickTextField();
        await shareThisDocumentModal.clickInputEmailField(SIGNERS_DATA.signerEmail1, 0);
        await shareThisDocumentModal.clickShareDocumentBtn();
    
        await expect(documentsPage.toast.documentToast).toHaveClass('Toastify__toast-body');           
      })
});