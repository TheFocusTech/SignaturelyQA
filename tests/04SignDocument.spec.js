import { expect } from '@playwright/test';
import { test } from "../fixtures/base.js";
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';
import { DOCUMENT_STATUS, SIGNERS_DATA, TOAST_MESSAGE, UPLOAD_FILE_PATH, EMAIL_SUBJECTS, SELECTORS } from '../testData.js';
import { retrieveUserEmailConfirmationLink, retrieveEmailMessage } from '../helpers/utils.js';

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
        createSignatureOrInitialModal,
        notRegisterSignerSignPage,
        signerAlmostDoneModal,
        documentSubmitProccessModal,
        page,
        request    
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

        const signerName = `${process.env.NEW_USER_NAME}${'001'}`;        
        const signerEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'001'}${process.env.EMAIL_DOMAIN}`;
        const reviewerEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'003'}${process.env.EMAIL_DOMAIN}`;

        await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
        await signPage.uploadFileTab.clickPrepareDocumentBtn();

        await prepareForSignatureModal.clickSendForSignatureRadioBtn();
        await prepareForSignatureModal.clickAddSignerBtn();
        await prepareForSignatureModal.fillSignerNameField(signerName, 0);
        await prepareForSignatureModal.fillSignerEmailField(signerEmail, 0);
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

        await successModal.clickBackToDocumentsBtn();
        await documentsPage.table.waitForDocumentStatusVisible(DOCUMENT_STATUS.awaiting);
        
        const signerLink = await retrieveUserEmailConfirmationLink(request, signerEmail, EMAIL_SUBJECTS.signatureRequest);

        await step("Navigate to the sign link", async () => {
            await page.goto(signerLink);            
        });
   
        await notRegisterSignerSignPage.clickSignInput();

        await createSignatureOrInitialModal.clickCheckboxAgree();
        await createSignatureOrInitialModal.clickSignNowBtn();

        await notRegisterSignerSignPage.clickSubmitBtn();
        await signerAlmostDoneModal.clickIAgreeBtn();
        await notRegisterSignerSignPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.documentSubmited);
        await documentSubmitProccessModal.waitForSubmitTitleByText('Thanks for Submitting your Document');
        
        const message = await retrieveEmailMessage(request, 'Signaturely', reviewerEmail, EMAIL_SUBJECTS.sentToView, SELECTORS.message);
        console.log(message);
        await step('Verify that Viewer has got email for viewing docoment', async () => {            
            expect(message).toEqual(`${process.env.NEW_USER_NAME} (${process.env.NEW_USER_EMAIL}) sent you the following document to view`);
        });

    });
});
