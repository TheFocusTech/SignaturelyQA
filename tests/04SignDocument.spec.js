import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { DOCUMENT_STATUS } from '../testData.js';
import { generateSignerName, generateSignerOrViewerEmail } from "../helpers/utils";

test.describe('Sign Document', () => {

    test('TC_04_11_02 | Verify custom signing order', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal }) => {

        const signerName1 = generateSignerName('001');
        const signerName2 = generateSignerName('002');
        const signerEmail1 = generateSignerOrViewerEmail('001');
        const signerEmail2 = generateSignerOrViewerEmail('002');        

        await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();
    
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(signerName1, 0);
        await prepareForSignatureModal.fillSignerEmailField(signerEmail1, 0);
    
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(signerName2, 1);
        await prepareForSignatureModal.fillSignerEmailField(signerEmail2, 1);
    
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

        const signerName = generateSignerName('001');       
        const signerEmail = generateSignerOrViewerEmail('001');
        const viewerEmail = generateSignerOrViewerEmail('002');       

        await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(signerName, 0);
        await prepareForSignatureModal.fillSignerEmailField(signerEmail, 0);
        await prepareForSignatureModal.clickAddRecipientsBtn();
        await prepareForSignatureModal.fillRecipientEmailField(viewerEmail);
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
