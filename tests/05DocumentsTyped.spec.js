
import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage, prepareForSignatureModal, finalStepModal, documentsPage } from "../fixtures/base.js";
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';

test.describe('DocumentsType', () => {

  test('TC_05_21_01 | Verify that button "Edit&Ressend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, finalStepModal, documentsPage }) => {

    test.setTimeout(250 * 1000);
    await signPage.uploadFile.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.uploadFile.clickPrepareDocumentBtn();

    await signPage.prepareForSign.clickSendForSignatureRadioBtn();
    await signPage.prepareForSign.clickAddSignerBtn();
    await signPage.prepareForSign.fillSignerNameField(CHOOSE_SIGNERS_FIELDS.name1);
    await signPage.prepareForSign.fillSignerEmailField(CHOOSE_SIGNERS_FIELDS.email1)
    await signPage.prepareForSign.clickContinueBtn();
    await signPage.prepareForSign.clickGotItBtn();

    await signPage.prepareForSign.clickSignFieldsItem();
    await signPage.prepareForSign.clickSignPlaceCanvas();
    await signPage.prepareForSign.clickSignFieldsItem();
    await signPage.prepareForSign.clickSaveBtn();

    await signPage.finalStep.waitForToastDocumentSavedVisible();
    await signPage.finalStep.waitForToastDocumentSavedHidden();
    await signPage.finalStep.clickSendForSignatureBtn();
    await signPage.finalStep.waitForSuccessSendModalVisible();
    await signPage.finalStep.clickBackToDocumentBtn();
    
    await documentsPage.clickOptionsBtn();
    await documentsPage.clickEditAndResendBtn();
    await expect(documentsPage.editAndResendTitle).toBeVisible();


  })
})







// test.describe('DocumentsTyped', () => {
//     test.beforeEach('Create account', async ({ page, createBusinessUserAndLogin, signPage }) => {
//         test.setTimeout(250 * 1000);
        
//         await signPage.clickUploadFileBtn('testDocuments/CSV.csv');
//         await signPage.locators.getProgressBar().waitFor({ state: 'hidden' });

//         await signPage.locators.getPrepareDocumentBtn().waitFor({ state: 'visible' });
//         await signPage.clickPrepareDocumentBtn();
//     })

//     test('TC_05_21_01 | Verify that button "Edit&Ressend" is active', async ({ page}) => {
//         test.setTimeout(150 * 1000);
//         const signPage = new SignPage(page);
       
//         await signPage.clickSendForSignatureRadioBtn();
//         await signPage.clickAddSignerBtn();

//         await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
//         await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

//         await signPage.clickContinueBtn();
//         await signPage.clickGotItButton();
//         await signPage.clickSignModal();
//         await signPage.clickSignPlace();
//         await signPage.clickSignModal();
//         await signPage.clickSaveBtn();

//         await new Promise(resolve => setTimeout(resolve, 1000));

//         await signPage.clickSendForSignatureButton();
//         const documentsPage = await signPage.clickBackToDocumentsBtn();
//         await documentsPage.clickOptionsDropdown();
//         await documentsPage.clickEditAndResendButton();

//         await expect(documentsPage.locators.getTitleEditAndRessendDocument()).toBeVisible();
//     })

// })