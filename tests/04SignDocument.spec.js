import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage, prepareForSignatureModal, finalStepPage, documentsPage } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
import { CHOOSE_SIGNERS_FIELDS, DOCUMENT_STATUS, TOAST_MESSAGE } from '../testData.js';

test.describe('SignDocument', () => {

    test('TC_04_11_02 | Verify custom signing order', async ({page,createBusinessUserAndLogin}) => {
        const signPage = new SignPage(page);
        await signPage.clickUploadFileBtn('testDocuments/picture.jpg');

        await signPage.locators.getPrepareDocumentBtn().waitFor({state: 'visible'});
        await signPage.clickPrepareDocumentBtn();

        await signPage.clickSendForSignatureRadioBtn();
        await signPage.clickAddSignerBtn();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

        await signPage.clickAddSignerBtn();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name2);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email2);

        await signPage.clickCustomSigningOrderCheckbox();

        await expect(signPage.locators.getCustomSigningOrderPositionNumberOne()).toBeVisible();
        await expect(signPage.locators.getCustomSigningOrderPositionNumberTwo()).toBeVisible();
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
        await prepareForSignatureModal.fillSignerNameField("Any Name");
        await prepareForSignatureModal.fillSignerEmailField(process.env.PREFIX_EMAIL + '01' + process.env.EMAIL_DOMAIN);
        await prepareForSignatureModal.clickAddRecipientsBtn();
        await prepareForSignatureModal.fillRecipientEmailField(process.env.PREFIX_EMAIL + '02' + process.env.EMAIL_DOMAIN);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.clickSignPlaceCanvas();
        await prepareForSignatureModal.clickSaveBtn();

        await expect(await prepareForSignatureModal.toast).toBeVisible();
        
        await finalStepPage.clickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();

        await expect(await documentsPage.documentStatus).toHaveText(DOCUMENT_STATUS.processing);
        
    })

})