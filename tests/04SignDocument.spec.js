import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS, DOCUMENT_STATUS, TOAST_MESSAGE } from '../testData.js';

test.describe('Sign Document', () => {

    test('TC_04_11_02 | Verify custom signing order', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal }) => {

        await signPage.uploadFile.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.uploadFile.clickPrepareDocumentBtn();
    
        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();
        
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1, 0);
        await prepareForSignatureModal.fillSignerEmailField(process.env.EMAIL_PREFIX + '01' + process.env.EMAIL_DOMAIN, 0);
    
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name2, 1);
        await prepareForSignatureModal.fillSignerEmailField(process.env.EMAIL_PREFIX + '02' + process.env.EMAIL_DOMAIN, 1);
    
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
        await signPage.uploadFile.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await signPage.uploadFile.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1, 0);
        await prepareForSignatureModal.fillSignerEmailField(process.env.EMAIL_PREFIX + '001' + process.env.EMAIL_DOMAIN, 0);
        await prepareForSignatureModal.clickAddRecipientsBtn();
        await prepareForSignatureModal.fillRecipientEmailField(process.env.EMAIL_PREFIX + '002' + process.env.EMAIL_DOMAIN);
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
