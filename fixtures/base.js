import { expect } from '@playwright/test';
import { test as base } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
import { API_URL_END_POINTS } from "../apiData.js";
import { api_user_sign_up } from '../newUserUtils/apiUtilsForNewUser.js';
import { databaseConfirmNewUserEmail } from '../newUserUtils/dbUtilsForNewUser.js';
import { newFreeUserLogin, upgradeFreeUserToBusinessAndLogin } from '../newUserUtils/uiUtilsForNewUser.js';

const API_BASE_URL = process.env.API_URL;
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;

export const test = base.extend({

    cleanDocuments: [
        async ({ request }, use) => {

            try {
                const getSignInResponse = await request.post(API_BASE_URL + API_URL_END_POINTS.signInEndPoint, {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                    },
                    data: {
                        email: EMAIL,
                        password: PASSWORD
                    }
                });

                expect(getSignInResponse.ok()).toBeTruthy();

            } catch (err) {
                console.error(err);
            }

            const getDocumentsResponse = await request.get(API_BASE_URL + API_URL_END_POINTS.getDocumentsEndPoint);
            expect(getDocumentsResponse.ok()).toBeTruthy();

            const numberOfDocuments = (await getDocumentsResponse.json()).itemCount;

            if (numberOfDocuments != 0) {
                const documentDataArray = (await getDocumentsResponse.json()).items;

                const entityIdArray = [];
                documentDataArray.map(el => {
                    entityIdArray.push(el.entityId);
                });

                const deleteDocumentsResponse = await request.delete(API_BASE_URL + API_URL_END_POINTS.deleteDocumentsEndPoint, {
                    data: {
                        entityIds: entityIdArray,
                    }
                });
                expect(deleteDocumentsResponse.ok).toBeTruthy;

                const entityIdTrash = (await getDocumentsResponse.json()).data;
                expect(numberOfDocuments).not.toBeTruthy;

                await request.delete(API_BASE_URL + API_URL_END_POINTS.emptyTrash, {
                    data: {
                        entityIds: entityIdTrash,
                    }
                });
            }

            await use("");
        },
        { scope: "test" },
    ],

    loginBusinessUser: [
        async ({ page, cleanDocuments }, use) => {
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
});
