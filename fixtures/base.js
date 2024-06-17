import { test as base } from "@playwright/test";
import SignPage from "../page_objects/signPage";
import { api_user_sign_up } from '../newUserUtils/apiUtilsForNewUser.js';
import { databaseConfirmNewUserEmail } from '../newUserUtils/dbUtilsForNewUser.js';
import { newFreeUserLogin, upgradeFreeUserToBusinessAndLogin } from '../newUserUtils/uiUtilsForNewUser.js';
import NewSignPage from '../new_pom/pages/sign/signPage.js';
import NewDocumentsPage from '../new_pom/pages/documents/documentsPage.js';
import NewDocumentsTrashPage from '../new_pom/pages/documents/documentsTrashPage.js';
import PrepareForSignatureModal from '../new_pom/modalWindows/prepareForSignatureModal.js';
import NewLoginPage from '../new_pom/pages/loginPage.js';
import FinalStepModal from '../new_pom/modalWindows/finalStepModal.js';


export const test = base.extend({    

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

    createFreeUserAndLogin: [
        async ({ request, page }, use) => {
            await api_user_sign_up(request);
            await databaseConfirmNewUserEmail();
            await newFreeUserLogin(page);

            await use("");
        },
        { scope: "test" },
    ],

    createBusinessUserAndLogin: [
        async ({ page, createFreeUserAndLogin }, use) => {

            await upgradeFreeUserToBusinessAndLogin(page);

            await use("");
        },
        { scope: "test" },
    ],

    signPage: async ({ page }, use) => {
        await use(new NewSignPage(page));
    },

    prepareForSignatureModal: async ({ page }, use) => {
        await use(new PrepareForSignatureModal(page));
    },

    documentsPage: async ({ page }, use) => {
        await use(new NewDocumentsPage(page));
    },

    documentsTrashPage: async ({ page }, use) => {
        await use(new NewDocumentsTrashPage(page));
    },

    finalStepModal: async ({ page }, use) => {
        await use(new FinalStepModal(page));
    },

    
});
