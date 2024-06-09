import { expect } from '@playwright/test';
import { test as base } from "@playwright/test";
import LoginPage from "../page_objects/loginPage";
import SignPage from "../page_objects/signPage";

import TemplatesActivePage from "../page_objects/templatesActivePage";
import TemplatesCreatePage from "../page_objects/templatesCreatePage";
import { API_URL_END_POINTS } from '../apiData.js';
import { EMPTY_TRASH_HEADER, URL_END_POINTS } from '../testData.js';
import { API_URL_END_POINTS } from "../apiData.js";
import { VISA_CARD_DATA, TOASTER_MESSAGE } from '../testData.js';
import { client } from '../dbClient.js';
import { generateNumberForNewUser } from '../helpers/utils.js';


const API_BASE_URL = process.env.API_URL;
const BASE_URL = process.env.URL;

// import { API_URL_END_POINTS } from "../apiData.js";
// const API_BASE_URL = process.env.API_URL;


// import { API_URL_END_POINTS } from "../apiData.js";

// const API_BASE_URL = process.env.API_URL;


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



    createFreeUserAndLogin: [
        async ({ request, page }, use) => {
            let response;
            let attempt = 0;
            let maxRetries = 3;

            while (attempt < maxRetries) {
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

    createBusinessUserAndLogin: [
        async ({ page, request, createFreeUserAndLogin }, use) => {

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
            const settingsBillingPlanPage = await specialOfferUpsellModal.cancelSpecialOfferAndGoToSettingsBillingPlanPage();
            expect(await settingsBillingPlanPage.locators.getToastBody().isVisible()).toBe(true);
            await expect(settingsBillingPlanPage.locators.getToastBody()).toHaveText(TOASTER_MESSAGE.planSuccessChange);
            await settingsBillingPlanPage.waitForToasterHidden();
            expect(await settingsBillingPlanPage.locators.getToastBody().isHidden()).toBe(true);
            settingsBillingPlanPage.clickSignSidebarLinkAndGoSignPage();

            await use("");
        },
        { scope: "test" },
    ],
});

