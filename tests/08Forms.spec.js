import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, TOAST_MESSAGE, DOCUMENT_STATUS, FORMS } from "../testData.js";
import EditFormPage from "../new_pom/pages/forms/editFormPage.js";

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
        prepareForSignatureModal, createFormPage, formsPage, successModal, editFormPage }) => {
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
        
        await formsPage.table.clickOptionsDropdown()
        await formsPage.table.clickEditDropDown()
        await editFormPage.fillFormNameField(FORMS.form_name_edit)   
        await editFormPage.fillOptionalMessageField(FORMS.optional_message_text_edit)      
        await editFormPage.clickCancelBtn() 
        await editFormPage.fileUploader.uploadFile('testDocuments/todoList.xlsx');
        await editFormPage.clickFillTemplateBtn()   
        await prepareForSignatureModal
        // await formRequestsEditPage.clickSignTab();
        // await formRequestsEditPage.clickUploadedDocument();
    
        // await formRequestsEditPage.clickSaveBtnAndGoFormRequestsPage();
    
        // await expect(formRequestsPage.locators.getFormSavedToasterMessage()).toBeVisible();
        // await expect(formRequestsPage.locators.getDocSavedToasterMessage()).toHaveText(TOASTER_MESSAGE.docSaved);
        // await expect(formRequestsPage.locators.getFormSavedToasterMessage()).toHaveText(TOASTER_MESSAGE.formSaved);
        // await expect(formRequestsPage.locators.getFirstFormTitle()).toHaveText(FORM_NAME_EDIT);
     
    })
})
