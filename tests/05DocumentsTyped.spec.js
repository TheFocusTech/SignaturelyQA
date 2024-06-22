import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { prepareForSignature } from "../helpers/preconditions.js";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

test.describe('DocumentsType', () => {

    test('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, editAndResendDocumentModal,successModal, finalStepPage, documentsPage }) => {
       
        test.setTimeout(250 * 1000);

        await allure.description('Objective: To verify that the document can be returned for editing.');
        await allure.tags('Edit & Resend, Documents');
        await allure.severity(Severity.CRITICAL);
        await allure.link(
            "Documentation",
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.334tqcftqjdb",
            "TC_05_21_01"),

        await allure.epic('Documents');
        
        

        await prepareForSignature(signPage, prepareForSignatureModal);
        await finalStepPage.waitAndClickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.table.clickOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();

        await expect(documentsPage.table.titleEditAndResendDocument).toBeVisible();
        expect(await editAndResendDocumentModal.getTitleText()).toBe("Edit & Resend document");

    })

    test('TC_05_21_02 | Verify that button "Revert to Draft" is active', async ({ page, createBusinessUserAndLogin, signPage, prepareForSignatureModal, successModal, editAndResendDocumentModal, finalStepPage, documentsPage }) => {

        test.setTimeout(250 * 1000);

        await allure.description('Objective: To verify that the document can be returned for editing.');
        await allure.tags('Edit & Resend, Documents');
        await allure.severity(Severity.CRITICAL);
        await allure.link(
            "Documentation",
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.334tqcftqjdb",
            "TC_05_21_02"),
            
        await allure.epic('Documents');

        await prepareForSignature(signPage, prepareForSignatureModal);
        await finalStepPage.waitAndClickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.table.clickOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();
        await editAndResendDocumentModal.clickRevertToDraftBtn();

        await expect(page).toHaveURL(/documents.*edit$/);
        expect(await prepareForSignatureModal.getPrepareForSigningTitleText()).toBe("Prepare for Signing");


    })
})

