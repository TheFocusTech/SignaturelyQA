import { expect } from '@playwright/test';
import { test as base } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
import { API_URL_END_POINTS } from '../apiData.js';
import { EMPTY_TRASH_HEADER } from '../testData.js';

const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;
const API_BASE_URL = process.env.API_URL;

export const test = base.extend({

    cleanDocuments: [
        async ({ request }, use) => {
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
            expect(getSignInResponse.status()).toEqual(201);

            const getDocumentRresponse = await request.get(API_BASE_URL + API_URL_END_POINTS.getDocumentsEndPoint);
            const numberOfDocuments = (await getDocumentRresponse.json()).itemCount;

            if (numberOfDocuments != 0) {
                const documentDataArray = (await getDocumentRresponse.json()).items;
                const entityIdArray = [];
                documentDataArray.map(el => {
                    entityIdArray.push(el.entityId);
                });

                await request.delete(API_BASE_URL + API_URL_END_POINTS.deleteDocumentsEndPoint, {
                    data: {
                        entityIds: entityIdArray,
                    }
                });
                expect(numberOfDocuments).not.toBeTruthy;

                await request.delete(API_BASE_URL + API_URL_END_POINTS.emptyTrash, {
                    data: {
                        entityIds: entityIdArray,
                    }
                });
            }

            await use("");
        },
        { scope: "test", auto: true },
    ],

    loginBusinessUser: [
        async ({ page, cleanDocuments }, use) => {
            const loginPage = new LoginPage(page);

            await page.goto("/");
            await loginPage.fillEmailAddressInputField(EMAIL);
            await loginPage.fillPasswordInputField(PASSWORD);
            const signPage = await loginPage.clickLoginAndGoSignPage();
            const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
            const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();
            const numberItemsInTrash = await documentsTrashPage.locators.getResultsNumber().innerText();

            if (numberItemsInTrash != 0) {
                await documentsTrashPage.clickEmptyTrashBtn();
                await documentsTrashPage.clickConfirmEmptyTrashBtn();
            }

            expect(await documentsTrashPage.locators.getEmptyTableHeader()).toHaveText(EMPTY_TRASH_HEADER);

            await documentsTrashPage.clickSignSidebarLinkAndGoSignPage();

            await use("");
        },
        { scope: "test", auto: true },
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
});
