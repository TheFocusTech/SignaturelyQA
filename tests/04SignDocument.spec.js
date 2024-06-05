import { expect } from "@playwright/test";
import {test,loginBusinessUser} from "../fixtures/base.js";
import SignPage from "../page_objects/signPage";
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const BASE_URL = process.env.URL;
import {CHOOSE_SIGNERS_FIELDS} from '../testData.js';


test.describe('SignDocument', () => {

    test('TC_04_11_02 | Verify custom signing order', async ({page,loginBusinessUser}) => {
        const signPage = new SignPage(page);
        await signPage.clickUploadFileBtn('testDocuments/picture.jpg');

        await signPage.locators.getPrepareDocumentBtn().waitFor({state: 'visible'});
        await signPage.clickPrepareDocumentBtn();

        await signPage.clickSendForSignatureRadioBtn();
        await signPage.clickAddSignerBtn();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name1);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email1);

        await signPage.clickAddSignerBtn();

        await signPage.fillChooseSignersNameField(CHOOSE_SIGNERS_FIELDS.name2);
        await signPage.fillChooseSignersEmailField(CHOOSE_SIGNERS_FIELDS.email2);

        await signPage.clickCustomSigningOrderCheckbox();

        await expect(signPage.locators.getCustomSigningOrderPositionNumberOne()).toBeVisible();
        await expect(signPage.locators.getCustomSigningOrderPositionNumberTwo()).toBeVisible();

        await signPage.clickCancelBtnAndDeleteDocument();
    })
})