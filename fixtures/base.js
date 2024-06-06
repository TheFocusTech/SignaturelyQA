import { expect } from '@playwright/test';
import { test as base } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
import { API_URL_END_POINTS } from "../apiData.js";
import { EMPTY_TRASH_HEADER, URL_END_POINTS } from '../testData.js';
import { client } from '../dbClient.js';
import { getNumberFromDateAndTime } from '../helpers/utils.js';

const API_BASE_URL = process.env.API_URL;
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;

export const randomUserNumber = getNumberFromDateAndTime();

export const NEW_USER_CREDENTIALS = {
    email: `${process.env.EMAIL_PREFIX}${randomUserNumber}${process.env.EMAIL_DOMAIN}`,
    free: true,
    name: `TestUser${randomUserNumber}`,
    password: `QA_tester${randomUserNumber}`,
    workflowVersion: "a"
};
export const VISA_PAYMENT_METHOD_CARD_DATA = {
    'Full Name on Card': `TestUser${randomUserNumber}`,
    'Card Number': '4242424242424242',
    'Expiration Date': '12 / 27',
    'CVC': '111',
    'ZIP': '20500'
};

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
            const signPage = await loginPage.clickLoginAndGoSignPage();
            // await expect(page).toHaveURL(BASE_URL + URL_END_POINTS.signEndPoint);
            const documentsPage = await signPage.clickDocumentsSidebarLinkAndGoDocumentsPage();
            const documentsTrashPage = await documentsPage.clickTrashSidebarLinkAndGoDocumentsTrashPage();
            expect(page).toHaveURL(BASE_URL + URL_END_POINTS.documentTrashEndPoint)
            await documentsTrashPage.locators.getResultsNumber().waitFor();
            const numberItemsInTrash = await documentsTrashPage.locators.getResultsNumber().innerText();

            if (numberItemsInTrash > 0) {
                await documentsTrashPage.clickEmptyTrashBtn();
                await documentsTrashPage.clickConfirmEmptyTrashBtn();
            }
            await documentsTrashPage.locators.getEmptyTableHeader().waitFor();
            expect(await documentsTrashPage.locators.getEmptyTableHeader()).toHaveText(EMPTY_TRASH_HEADER);

            await documentsTrashPage.clickSignSidebarLinkAndGoSignPage();

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

    createFreeUser: [
        async ({ request }, use) => {
            const response = await request.post(`${process.env.API_URL}/auth/sign_up`, { data: NEW_USER_CREDENTIALS });

            if (!response.ok()) {
                throw new Error(`Failed to proceed User sign up: ${response.status()}`);
            }
            console.log("User has been successfully created");

            await client.connect();
            const query = `UPDATE public.users  
                            SET "isEmailConfirmed" = true
                            WHERE email = '${NEW_USER_CREDENTIALS.email}'`;

            try {
                await client.query(query);
                console.log("Email has been successfully confirmed");
            } catch (err) {
                console.error(err.message);
                throw err;
            } finally {
                await client.end();
            }
            await use("");
        },
        { scope: "test" },
    ],

    createBusinessUser: [
        async ({ page, request }, use) => {
            const response = await request.post(`${process.env.API_URL}/auth/sign_up`, { data: NEW_USER_CREDENTIALS });

            if (!response.ok()) {
                throw new Error(`Failed to proceed User sign up: ${response.status()}`);
            }
            console.log("User has been successfully created");

            await client.connect();
            const query = `UPDATE public.users  
                            SET "isEmailConfirmed" = true
                            WHERE email = '${NEW_USER_CREDENTIALS.email}'`;

            try {
                await client.query(query);
                console.log("Email has been successfully confirmed");
            } catch (err) {
                console.error(err.message);
                throw err;
            } finally {
                await client.end();
            }
            await page.goto("/");
            await page.getByPlaceholder('username@gmail.com').fill(NEW_USER_CREDENTIALS['email']);
            await page.getByPlaceholder('Your password').fill(NEW_USER_CREDENTIALS['password']);
            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL(`${process.env.URL}/sign`)

            await page.getByRole('link', { name: 'Settings' }).click();
            await page.getByLabel('Settings').getByRole('link', { name: 'Billing' }).click();
            await page.locator('.billing__table-column').filter({ hasText: 'Business' }).getByRole('button').click()
            await page.frameLocator('[title="Secure card number input frame"]')
                .getByLabel('Card Number').pressSequentially(VISA_PAYMENT_METHOD_CARD_DATA['Card Number']);
            await page.frameLocator('[title="Secure expiration date input frame"]')
                .getByLabel('Expiration').pressSequentially(VISA_PAYMENT_METHOD_CARD_DATA['Expiration Date']);
            await page.frameLocator('[title="Secure CVC input frame"]')
                .getByLabel('CVC').pressSequentially(VISA_PAYMENT_METHOD_CARD_DATA['CVC']);
            await page.getByPlaceholder('Your Name').pressSequentially(VISA_PAYMENT_METHOD_CARD_DATA['Full Name on Card']);
            await page.getByPlaceholder('00000').pressSequentially(VISA_PAYMENT_METHOD_CARD_DATA['ZIP']);
            await page.waitForTimeout(2 * 1000)
            await page.getByRole('button', { name: 'Subscribe' }).click();
            await page.locator('.billing__trial-header').filter({ hasText: 'Business Monthly' }).waitFor();
            const upsellModal = page.locator('.upsellModal__button-cancel');
            await upsellModal.waitFor({ state: 'visible' });
            await upsellModal.click()
            await upsellModal.waitFor({ state: 'hidden' });
            console.log("User has been successfully upgraded");

            await use("");
        },
        { scope: "test" },
    ],
});
