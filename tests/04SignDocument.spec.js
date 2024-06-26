import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';
import { DOCUMENT_STATUS, SIGNERS_DATA, TOAST_MESSAGE, UPLOAD_FILE_PATH } from '../testData.js';
import { getRecipientFromResponse } from '../helpers/utils.js';

test.describe('Sign Document', () => {
    test('TC_04_11_02 | Verify custom signing order', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal }) => {
        let signerEmail = SIGNERS_DATA.signerName1;

        await signPage.uploadFileTab.fileUploader.uploadFile('testDocuments/picture.jpg');
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSignAndSendForSignatureRadioBtn();

        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(signerEmail, 0);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail1, 0);

        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(SIGNERS_DATA.signerName2, 1);
        await prepareForSignatureModal.fillSignerEmailField(SIGNERS_DATA.signerEmail2, 1);

        await prepareForSignatureModal.clickCustomSigningOrderCheckbox();

        await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toBeVisible();
        await expect(prepareForSignatureModal.customSigningOrderPositionNumberOne).toHaveText('1.');

        await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toBeVisible();
        await expect(prepareForSignatureModal.customSigningOrderPositionNumberTwo).toHaveText('2.');
    });

    test('TC_04_14_01 | Verify adding users who can view the document', async ({
        createBusinessUserAndLogin,
        signPage,
        prepareForSignatureModal,
        finalStepPage,
        documentsPage,
        successModal,
        page      
    }) => {
        test.setTimeout(250 * 1000);

        await description('To verify the adding viewers / adding users who can view the document.');
        await severity(Severity.CRITICAL);
        await link(
            'https://app.qase.io/case/SIGN-14',
            'Qase: SIGN-14'
        );
        await link('https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ojom1b8sk9ht',
            'ATC_04_11_02');
        await epic('Sign document');
        await tag('Viewers');

        const reviewerEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'003'}${process.env.EMAIL_DOMAIN}`;

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(`${process.env.NEW_USER_NAME}${'001'}`, 0);
        await prepareForSignatureModal.fillSignerEmailField(`${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'001'}${process.env.EMAIL_DOMAIN}`, 0);
        await prepareForSignatureModal.clickAddRecipientsBtn();
        await prepareForSignatureModal.fillRecipientEmailField(reviewerEmail);
        await prepareForSignatureModal.clickContinueBtn();
        await prepareForSignatureModal.clickGotItBtn();
        await prepareForSignatureModal.clickSignFieldsItem();
        await prepareForSignatureModal.doCanvasClicks();
        await prepareForSignatureModal.clickSaveBtn();
        
        await step('Verify that Success Toast Notification is shown', async () => {            
            await expect(await prepareForSignatureModal.toast.toastBody).toHaveText(TOAST_MESSAGE.success);
        });
        
        await finalStepPage.clickSendForSignatureBtn();

        await step('Verify that viewer email in API response', async () => { 
            page.on('response', async response => {
                const recipientEmail = await getRecipientFromResponse(response);                

                if (recipientEmail) {
                    expect(recipientEmail).toEqual(reviewerEmail.slice(-28));
                } 
            });
        });

        await successModal.clickBackToDocumentsBtn();

        await step('Verify that  the created document exists in the table with the "AWAITING" status.', async () => {
            await expect(await documentsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.awaiting);
        });
        
        
    });
});
