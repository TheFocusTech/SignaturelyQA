import { expect } from "@playwright/test";
import { Severity, description, epic, link, severity, step, tag } from "allure-js-commons";
import { test } from "../fixtures/base.js";
import { generateNewUserEmail, generateRandomPassword, retrieveUserEmailConfirmationLink } from "../helpers/utils.js";
import { EMAIL_SUBJECTS, TOAST_MESSAGE, URL_END_POINTS, CHECK_BOXES_STATUS } from "../testData.js";

test.describe('Profile', () => {

    test('TC_11_45_01 | Verify that User can change password', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        loginPage
    }) => {
        await description('Objective: To verify that the User can change a password and login with a new password');
        await severity(Severity.CRITICAL);
        await link("https://app.qase.io/case/SIGN-45",
            "Qase: SIGN-45");
        await link("https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ei34zdu9ql4d",
            "ATC_11_45_01");
        await epic('Profile');
        await tag('Password');

        const newPassword = generateRandomPassword(15);

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.fillNewPasswordInputField(newPassword);
        await settingsProfilePage.fillRepeatNewPasswordInputField(newPassword);
        await settingsProfilePage.clickSaveButton();

        await step(`Verify that a toast message with the text "${TOAST_MESSAGE.profileUpdated}" popped up `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
        });

        await settingsProfilePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.profileUpdated);
        await settingsProfilePage.sideMenu.clickSign();
        await loginPage.fillEmailAddressInput(process.env.NEW_USER_EMAIL);
        await loginPage.fillPasswordInput(newPassword);
        await loginPage.clickLogin();

        await step(`Verify that the User is logged in with a new password and is on the homepage ${URL_END_POINTS.signEndPoint} `, async () => {
            await expect(signPage.page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
        });
    })

    test('TC_11_44_01 | Verify User can change email', async ({ createBusinessUserAndLogin, request, page, signPage, settingsCompanyPage, settingsProfilePage }) => {
        await description('Objective: To verify that the User can change a email.');
        await severity(Severity.CRITICAL);
        await link(
            "https://app.qase.io/case/SIGN-44",
            "Qase: SIGN-44"
        );
        await link(
            "https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.781u9ev2p6y5",
            "ATC_11_44_01"
        );
        await epic('Profile');
        await tag('Email');

        const newEmail = await generateNewUserEmail("_new");
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await step("Verify that the email field is filled with the correct user email", async () => {
            await expect(settingsProfilePage.emailAddressInputField).toHaveValue(process.env.NEW_USER_EMAIL);
        });
        await settingsProfilePage.deleteCurrentEmailFromEmailAddressInputField();
        await settingsProfilePage.fillNewEmailIntoEmailAddressInputField(newEmail);
        await settingsProfilePage.clickUpdateBtn();
        await step(`Verify that a toast message with the text "${TOAST_MESSAGE.checkYourEmail}" popped up `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.checkYourEmail);
        });

        const confirmationLink = await retrieveUserEmailConfirmationLink(request, newEmail, EMAIL_SUBJECTS.emailConfirmation);
        await step("Navigate to the confirmation link", async () => {
            await page.goto(confirmationLink);
            await page.waitForURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);
        });
        await step(`Verify that a toast message with the text "${TOAST_MESSAGE.emailConfirmed}" popped up `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.emailConfirmed);
        });

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await step("Verify that the email field is filled with the updated user email", async () => {
            await expect(settingsProfilePage.emailAddressInputField).toHaveValue(newEmail);
        });
    })

    test('TC_11_46_03 | Verify user can enabling, disabling checkboxes', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        loginPage
    }) => {
        await description('Objective: To verify that the User can enabling, disabling checkboxes');
        await severity(Severity.CRITICAL);
        await link("https://app.qase.io/case/SIGN-46",
            "Qase: SIGN-46");
        await link("https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.ei34zdu9ql4d",
            "ATC_11_46_03");
        await epic('Profile');
        await tag('Update');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.toggleCheckboxes(false)
        await settingsProfilePage.clickSaveButton();

        await step(`Verify that a toast message with the text "${TOAST_MESSAGE.profileUpdated}" popped up `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
        })

        await step('Verify that checkboxes are unchecked', async () => {
            const checkBoxes = await settingsProfilePage.checkBoxesFrameList;
            const checkBoxCount = await checkBoxes.count();

            for (let i = 0; i < checkBoxCount; i++) {
                await expect(checkBoxes.nth(i)).toHaveClass(CHECK_BOXES_STATUS.unChecked);
            }
        });

        await settingsProfilePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.profileUpdated);
        await settingsProfilePage.toggleCheckboxes(true)
        await settingsProfilePage.clickSaveButton();

        await step(`Verify that a toast message with the text "${TOAST_MESSAGE.profileUpdated}" popped up `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
        })

        await step('Verify that checkboxes are checked', async () => {
            const checkBoxes = await settingsProfilePage.checkBoxesFrameList;
            const checkBoxCount = await checkBoxes.count();

            for (let i = 0; i < checkBoxCount; i++) {
                await expect(checkBoxes.nth(i)).toHaveClass(CHECK_BOXES_STATUS.checked);
            }
        });
    })
})
