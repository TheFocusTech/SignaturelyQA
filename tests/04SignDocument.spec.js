import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin, signPage, prepareForSignature } from "../fixtures/base.js";
import { name1, email1 } from "../testData.js";

test.describe('CreateDocument', () => {

  test('TC_04_11_02 | Verify custom signing order', async ({ createBusinessUserAndLogin, signPage, prepareForSignature }) => {

    await signPage.UploadFileOnSignPage.fileUploader.uploadFile('testDocuments/picture.jpg');
    await signPage.UploadFileOnSignPage.fileUploader.waitForVisibleProgressBar();
    await signPage.UploadFileOnSignPage.fileUploader.waitForHiddenProgressBar();
    await signPage.UploadFileOnSignPage.clickPrepareDocumentBtn();

    await prepareForSignature.clickSignAndSendForSignatureRadioBtn();
    await prepareForSignature.clickAddOtherSignersBtn();

    // await prepareForSignature.fillkAddOtherSignersNameField(name1);
    // await prepareForSignature.fillAddOtherSignersEmailField(email1);
  })
})


// test.describe('SignDocument', () => {

//     test('TC_04_11_02 | Verify custom signing order', async ({page,createBusinessUserAndLogin}) => {
//         const signPage = new SignPage(page);
//         await signPage.clickUploadFileBtn('testDocuments/picture.jpg');

//         await signPage.locators.getPrepareDocumentBtn().waitFor({state: 'visible'});
//         await signPage.clickPrepareDocumentBtn();

//         await signPage.clickSendForSignatureRadioBtn();
//         await signPage.clickAddSignerBtn();

//         await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
//         await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

//         await signPage.clickAddSignerBtn();

//         await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name2);
//         await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email2);

//         await signPage.clickCustomSigningOrderCheckbox();

//         await expect(signPage.locators.getCustomSigningOrderPositionNumberOne()).toBeVisible();
//         await expect(signPage.locators.getCustomSigningOrderPositionNumberTwo()).toBeVisible();
//     })
// })