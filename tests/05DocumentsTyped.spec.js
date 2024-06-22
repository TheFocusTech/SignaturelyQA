
import { expect } from "@playwright/test";
import { test } from "../fixtures/base.js";
import { prepareForSignature } from "../helpers/preconditions.js";

test.describe('DocumentsType', () => {

    test('TC_05_21_01 | Verify that button "Edit&Resend" is active', async ({ createBusinessUserAndLogin, signPage, prepareForSignatureModal, successModal, finalStepPage, documentsPage }) => {

        test.setTimeout(250 * 1000);

        await prepareForSignature(signPage, prepareForSignatureModal);
        await finalStepPage.waitAndClickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.table.clickOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();

        await expect(documentsPage.table.titleEditAndResendDocument).toBeVisible();
        expect(await documentsPage.table.getTitleText()).toBe("Edit & Resend document");

    })

    test('TC_05_21_02 | Verify that button "Edit&Resend" is active', async ({ page, createBusinessUserAndLogin, signPage, prepareForSignatureModal, successModal, finalStepPage, documentsPage }) => {

        test.setTimeout(250 * 1000);

        await prepareForSignature(signPage, prepareForSignatureModal);
        await finalStepPage.waitAndClickSendForSignatureBtn();
        await successModal.clickBackToDocumentsBtn();
        await documentsPage.table.clickOptionsBtn();
        await documentsPage.table.clickEditAndResendBtn();
        await documentsPage.table.clickRevertToDraftBtn();

        await expect(page).toHaveURL(/documents.*edit$/);
        expect(await prepareForSignatureModal.getPrepareForSigningTitleText() ).toBe("Prepare for Signing");


    })
})

