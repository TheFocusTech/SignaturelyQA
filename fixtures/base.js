import { expect } from '@playwright/test';
import { test as base } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";
import { API_URL_END_POINTS } from "../apiData.js";
import { EMPTY_TRASH_HEADER, URL_END_POINTS, VISA_CARD_DATA } from '../testData.js';
import { client } from '../dbClient.js';
import { generateNumberForNewUser } from '../helpers/utils.js';

const API_BASE_URL = process.env.API_URL;
const EMAIL = process.env.USER_EMAIL;
const PASSWORD = process.env.USER_PASSWORD;

export const newUserNumber = generateNumberForNewUser();

export const NEW_USER_CREDENTIALS = {
    email: `${process.env.EMAIL_PREFIX}${newUserNumber}${process.env.EMAIL_DOMAIN}`,
    free: true,
    name: `TestUser${newUserNumber}`,
    password: `QA_tester${newUserNumber}`,
    workflowVersion: "a"
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
        async ({ request, page }, use) => {
            let response;
            let attempt = 0;

            while (attempt < 3) {
                attempt++;
                response = await request.post(`${process.env.API_URL}/auth/sign_up`, { data: NEW_USER_CREDENTIALS });

                if (response.ok()) {
                    console.log(`User has been successfully created: #${newUserNumber}`);
                    break;
                }

                if (attempt === maxRetries) {
                    throw new Error(`Failed to proceed User sign up after ${maxRetries} attempts: ${response.status()}`);
                }
                console.log(`Attempt ${attempt} failed: ${response.status()}. Retrying...`);
            }

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
            const loginPage = new LoginPage(page);

            await page.goto("/");
            await loginPage.fillEmailAddressInputField(NEW_USER_CREDENTIALS.email);
            await loginPage.fillPasswordInputField(NEW_USER_CREDENTIALS.password);
            await loginPage.clickLoginAndGoSignPage();
            await use("");
        },
        { scope: "test" },
    ],

    createBusinessUser: [
        async ({ page, request, createFreeUser }, use) => {

            await expect(page).toHaveURL(`${process.env.URL}/sign`)
            const signPage = new SignPage(page);
            const settingsCompanyPage = await signPage.clickSettingsSidebarLinkAndGoSettingsCompanyPage();
            let settingsBillingPage = await settingsCompanyPage.clickSettingsBillingSidebarLinkAngGoSettingsBillingPage();
            const upgradeYourPlanModal = await settingsBillingPage.clickBusinessUpgradeAndGoToUpgradeYourPlanModal();
            await upgradeYourPlanModal.fillCreditCardData(
                VISA_CARD_DATA.cardNumber,
                VISA_CARD_DATA.expirationDate,
                VISA_CARD_DATA.cvc,
                VISA_CARD_DATA.fullNameOnCard,
                VISA_CARD_DATA.zip);
            const specialOfferUpsellModal = await upgradeYourPlanModal.clickSubscribeButtonAnGoToSpecialOfferUpsellModal();
            settingsBillingPage = await specialOfferUpsellModal.cancelSpecialOfferAndGoToSettingsBillingPlanPage();
            settingsBillingPage.clickSignSidebarLinkAndGoSignPage();

            await use("");
        },
        { scope: "test" },
    ],
});
