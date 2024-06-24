import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { DOCUMENT_STATUS, SIGNERS_DATA } from '../testData.js';

test.describe('Sign Document', () => {

    test('TC_04_11_02 | Verify custom signing order', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal }) => {

        await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
    
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
    
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName2, 1);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail2, 1);
    
        await prepareForSignatureModal.clickCustomSigningOrderCheckbox();
    
        await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toBeVisible();
        await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toHaveText("1.");
    
        await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toBeVisible();
        await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toHaveText("2.");
      })

    test('TC_04_14_01 | Verify adding users who can view the document', async ({ 
        createBusinessUserAndLogin, 
        signPage, 
        prepareForSignatureModal,
        finalStepPage, 
        documentsPage,
        successModal     
    }) => {

        await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName1, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);
        await prepareForSignatureModal.clickAddRecipientsBtn();
        await prepareForSignatureModal.fillRecipientEmailField(SIGNERS_DATA.viewerEmail1);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickSaveBtn();

        await expect(await prepareForSignatureModal.toast.toastBody).toBeVisible();
        
        await finalStepPage.clickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();

        await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);        
    })
})
