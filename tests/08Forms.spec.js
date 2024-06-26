import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { SIGNERS_DATA, TOAST_MESSAGE, DOCUMENT_STATUS } from "../testData.js";
import { createForm } from "../helpers/preconditions.js";
import {description, tag, severity, Severity, link, epic, feature} from "allure-js-commons";

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

        await prepareForSignatureModal.clickDateFieldItem();
        await prepareForSignatureModal.doCanvasClicks();

        await prepareForSignatureModal.clickCreateBtn();

        await expect(prepareForSignatureModal.toast.toastBody).toHaveText(TOAST_MESSAGE.success);

        await successModal.clickBackToFormsBtn();

        await expect(await formsPage.table.documentStatus).toHaveText(DOCUMENT_STATUS.live);
  });

  test('TC_08_35_01 | Verify that user can duplicate form', async ({ 
        createBusinessUserAndLogin, 
        signPage,  
        prepareForSignatureModal, 
        createFormPage, 
        formsPage, 
        successModal 
        }) => {
        await description('Verify that user can duplicate form');
        await tag('Duplicate Form');
        await severity(Severity.CRITICAL);
        await link(
          "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.c5mhxwvn5pxt",
          "TC_08_35_01"
      );
        await epic("Forms");
        await feature("Sign Document");

        test.setTimeout(120 * 1000);
        await createForm(signPage, prepareForSignatureModal, createFormPage, formsPage, successModal);

        await signPage.sideMenu.clickForms();
        await formsPage.table.clickOptionsBtn(0);
        await formsPage.table.clickDuplicateBtn();
        await successModal.clickOkBtn();

        await expect(await formsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.duplicated);

        await expect(await formsPage.table.formsList).toHaveCount(2);
    });
}) 
