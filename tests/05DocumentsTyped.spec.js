import { expect } from "@playwright/test";
import { test, createBusinessUserAndLogin } from "../fixtures/base.js";
import SignPage from "../page_objects/signPage.js"
import SettingEditSignature from "../page_objects/settingEditSignature.js";
import { CHOOSE_SIGNERS_FIELDS } from '../testData.js';

test.describe('DocumentsTyped', () => {
    test.beforeEach('Create account', async ({ page, createBusinessUserAndLogin }) => {
        test.setTimeout(250 * 1000);
        const signPage = new SignPage(page);
        await signPage.clickUploadFileBtn('testDocuments/CSV.csv');
        await signPage.locators.getProgressBar().waitFor({ state: 'hidden' });

        await signPage.locators.getPrepareDocumentBtn().waitFor({ state: 'visible' });
        await signPage.clickPrepareDocumentBtn();
    })

    test('TC_05_21_01 | Verify that button "Edit&Ressend" is active', async ({ page}) => {
        test.setTimeout(150 * 1000);
        const signPage = new SignPage(page);
       
        await signPage.clickSendForSignatureRadioBtn();
        await signPage.clickAddSignerBtn();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

        await signPage.clickContinueBtn();
        await signPage.clickGotItButton();
        await signPage.clickSignModal();
        await signPage.clickSignPlace();
        await signPage.clickSignModal();
        await signPage.clickSaveBtn();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await signPage.clickSendForSignatureButton();
        const documentsPage = await signPage.clickBackToDocumentsBtn();
        await documentsPage.clickOptionsDropdown();
        await documentsPage.clickEditAndResendButton();

        await expect(documentsPage.locators.getTitleEditAndRessendDocument()).toBeVisible();
    })

})