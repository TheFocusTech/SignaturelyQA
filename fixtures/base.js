import { test as base } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
import TemplatesActivePage from "../page_objects/templatesActivePage";
import TemplatesCreatePage from "../page_objects/templatesCreatePage";

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

            const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
            await documentsPage.clickCreateFolderBtn();
            await documentsPage.fillNewFolderNameInputField();
            await documentsPage.clickCreateBtn();
            await documentsPage.clickSignSidebarLinkAndGoSignPage();
            await documentsPage.locators.getToast().waitFor({ state: "visible" });
            await documentsPage.locators.getToast().waitFor({ state: "hidden" });

            await use("");
        },
        { scope: "test" },
    ],


    createTemplate: [
        async ({ page }, use) => {
            const signPage = new SignPage(page);

            const templatesActivePage = await signPage.clickTemplatesSidebarLink();
            const templatesCreatePage = await templatesActivePage.clickCreateTemplateLink();

            await templatesCreatePage.fillTemplateNameField();
            await templatesCreatePage.fillOptionalMessageField();
            await templatesCreatePage.fillCreateTemplateRolesField();

            templatesCreatePage.clickUploadFileBtn('testDocuments/CSV.csv');

            await templatesCreatePage.locators.getFillTemplateBtn().waitFor({ state: 'visible' });

            await templatesCreatePage.clickFillTemplateBtn();

            await templatesCreatePage.locators.getSignBtn().waitFor({ state: 'visible' });

            await templatesCreatePage.clickSignBtn();

            const signatureElement = page.locator('.documentPage .react-pdf__Page__canvas').last()
            await signatureElement.waitFor({ state: 'visible' });

            const documentTargetArea = page.locator('.documentPage .react-pdf__Page__canvas');
            const box = await documentTargetArea.boundingBox();

            if (box) {
                const startX = await signatureElement.evaluate(el => el.getBoundingClientRect().x);
                const startY = await signatureElement.evaluate(el => el.getBoundingClientRect().y);

                const endX = 600;
                const endY = 400;

                await page.mouse.move(startX, startY);
                await page.mouse.down();
                await page.mouse.move(endX, endY);
                await page.mouse.up();

                await page.mouse.click(endX, endY);
            }

            await templatesCreatePage.clickCreateBtn();
            await templatesCreatePage.clickBackToTemplatesBtn();

            await use("");

        },
        { scope: "test" },
    ],

    deleteSignature: [
        async ({ page }, use) =>{

            const signPage = new SignPage(page);
            await signPage.clickDropDownUser();

            const editSignature = await signPage.clickEditSignatureAndGoEditSignaturePage();
            await editSignature.clickBurgerMenuSignature();
            await editSignature.clickDeleteDropItem();
            await editSignature.clickButtonDelete();
            await editSignature.clickSignSidebarLinkAndGoSignPage();

            await use("");

        },
        { scope: "test" },
    ],
 })

