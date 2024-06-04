import { test as base } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";

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
        async ({ page }, use) =>{
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
});
