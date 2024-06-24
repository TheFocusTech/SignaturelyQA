import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, TOAST_MESSAGE, DOCUMENT_STATUS } from "../testData.js";

test.describe('Sign Document', () => {

    test('TC_08_32_01 | Verify that user can create form', async ({ createBusinessUserAndLogin, signPage,
        prepareForSignatureModal, createFormPage, formsPage, successModal }) => {
        test.setTimeout(120 * 1000);

        await signPage.sideMenu.clickForms();

        await formsPage.clickCreateFormBtn();
        await createFormPage.fillFormNameField(SIGNERS_DATA.signerName1);
        await createFormPage.fillOptionalMessageField(SIGNERS_DATA.viewerEmail1);
        await createFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await createFormPage.clickFillTemplateBtn();

        await prepareForSignatureModal.clickNameFieldItem();
        await prepareForSignatureModal.doCanvasClicks();
    
        await prepareForSignatureModal.clickSignFieldItem();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickCreateBtn();

        await expect(prepareForSignatureModal.toast.toastBody).toHaveText(TOAST_MESSAGE.success);

        await successModal.clickBackToFormsBtn();

        await expect(await formsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.live);
    })
    test('TC_08_33_01 | Verify that user can edit form', async ({ createBusinessUserAndLogin, signPage,
        prepareForSignatureModal, createFormPage, formsPage, successModal }) => {
            await allure.description('Verify that user can edit form');
            await allure.tags('Edit Form');
            await allure.severity(Severity.CRITICAL);
            await allure.link(
                  "Forms",
                  "https://docs.google.com/spreadsheets/d/1v5LuJ23jSg5qcWZPqiSlBuEJnvvdsJ2HrVxC6Ag2vpA/edit?gid=331265622#gid=331265622",
                  "TC_08_33_01"
              );
            await allure.epic('Forms');
            test.setTimeout(40000);
        
            await createForm(signPage, prepareForSignatureModal, createFormPage, formsPage, successModal);

        
    })
})
