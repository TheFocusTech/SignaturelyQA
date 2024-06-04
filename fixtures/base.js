import { test as base } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
import FormRequestsPage from "../page_objects/formRequestsPage.js";
import { FORM_NAME, OPTIONAL_MESSAGE_TEXT } from '../testData.js'


const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;

export const test = base.extend({
    loginBusinessUser: [
        async ({ page }, use) => {
            const loginPage = new LoginPage(page);

            await page.goto("/");
            await loginPage.fillEmailAddressInputField(EMAIL);
            await loginPage.fillPasswordInputField(PASSWORD);
            await loginPage.clickLoginAndGoSignPage();

            await use("");
        },
        { scope: "test" },
    ],

    createNewFolder: [
        async ({ page }, use) => {
            const signPage = new SignPage(page);

            const documentsPage = await signPage.clickDocumentsDropdownAndGoDocumentsPage();
            await documentsPage.clickCreateFolderBtn();
            await documentsPage.fillNewFolderNameInputField();
            await documentsPage.clickCreateBtn();
            await documentsPage.clickSignaturelyLogoAndGoSignPage();
            await documentsPage.locators.getToaster().waitFor({ state: "visible" });
            await documentsPage.locators.getToaster().waitFor({ state: "hidden" });

            await use("");
        },
        { scope: "test" },
    ],

    deleteSignature: [
        async ({ page }, use) => {
            await use("");

            const signPage = new SignPage(page);
            await signPage.clickDropDownUser();

            const editSignature = await signPage.clickEditSignatureAndGoEditSignaturePage();
            await editSignature.clickBurgerMenuSignature();
            await editSignature.clickDeleteDropItem();
            await editSignature.clickButtonDelete();
            await editSignature.clickSignSidebarLinkAndGoSignPage();
        },
        { scope: "test" },
    ],
    createForm: [
        async ({ page }, use) => {
            const formRequestsPage = new FormRequestsPage(page);
            await formRequestsPage.clickFormsLink();

            const formRequestsCreatePage = await formRequestsPage.clickCreatFormBtnAndGoReguestsCreatePage();
            await formRequestsCreatePage.fillFormNameInputField(FORM_NAME);
            await formRequestsCreatePage.fillOptionalMessageInputField(OPTIONAL_MESSAGE_TEXT);
            await formRequestsCreatePage.ToUploadFileSelector('testDocuments/platinum_plan.png');
            await formRequestsCreatePage.locators.getProgressBar().waitFor({ state: 'hidden' });

            await formRequestsCreatePage.clickFillTemplateBtn();

            await formRequestsCreatePage.clickSignTab();
            await formRequestsCreatePage.clickUploadedDocument();

            await formRequestsCreatePage.clickInitialTab();
            await formRequestsCreatePage.clickUploadedDocument();

            await formRequestsCreatePage.clickDateTab();
            await formRequestsCreatePage.clickUploadedDocument();

            await formRequestsCreatePage.clickCreateBtn();
            await formRequestsCreatePage.clickBacktoFormsBtnAndGoFormRequestsPage();

            await use("");
        },
        { scope: "test" },
    ],
});
