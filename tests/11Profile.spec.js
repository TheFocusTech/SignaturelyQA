import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { generateRandomPassword, generateNewUserEmail, retrieveUserEmailConfirmationLink } from '../helpers/utils.js';
import {
    EMAIL_SUBJECTS,
    TOAST_MESSAGE,
    URL_END_POINTS,
    QASE_LINK,
    GOOGLE_DOC_LINK,
    CHECK_BOXES_STATUS,
    UPLOAD_FILE_PATH,
    DATE_FORMAT,
} from '../testData.js';
import { description, tag, severity, Severity, link, epic, feature, step } from 'allure-js-commons';
import { uploadAvatar } from '../helpers/preconditions.js';

test.describe('Profile', () => {
    test('TC_11_45_01 | Verify user can change password.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        loginPage,
    }) => {
        await description('To verify Business user can change password and login with new password.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-45`, 'Qase: SIGN-45');
        await link(`${GOOGLE_DOC_LINK}ei34zdu9ql4d`, 'ATC_11_45_01');
        await epic('Settings');
        await feature('Profile');
        await tag('Password');

        const newPassword = generateRandomPassword(15);

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.fillNewPasswordInputField(newPassword);
        await settingsProfilePage.fillRepeatNewPasswordInputField(newPassword);
        await settingsProfilePage.clickSaveButton();

        await step(`Verify toast message with the text "${TOAST_MESSAGE.profileUpdated}" popped up.`, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
        });

        await settingsProfilePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.profileUpdated);
        await settingsProfilePage.sideMenu.clickSign();
        await loginPage.fillEmailAddressInput(process.env.NEW_USER_EMAIL);
        await loginPage.fillPasswordInput(newPassword);
        await loginPage.clickLogin();
        await step(
            `Verify user is logged in with new password and is on Home page ${URL_END_POINTS.signEndPoint}.`,
            async () => {
                await expect(signPage.page).toHaveURL(process.env.URL + URL_END_POINTS.signEndPoint);
            }
        );
    });

    test('TC_11_47_01 | Verify user can delete account.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        deleteMyAccountModal,
        loginPage,
    }) => {
        await description('To verify Business user can delete account.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-47`, 'Qase: SIGN-47');
        await link(`${GOOGLE_DOC_LINK}tcq6ypzibzp5`, 'ATC_11_47_01');
        await epic('Settings');
        await feature('Profile');
        await tag('Delete account');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.clickDeleteMyAccountBtn();
        await deleteMyAccountModal.clickDeleteMyAccountModalBtn();

        await step(`Verify account is deleted and user is on Login page ${URL_END_POINTS.loginEndPoint}.`, async () => {
            await expect(loginPage.page).toHaveURL(process.env.URL + URL_END_POINTS.loginEndPoint);
        });

        await step(`Verify toast message with the text "${TOAST_MESSAGE.deleteAccount}" popped up.`, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.deleteAccount);
        });
    });

    test('TC_11_44_01 | Verify user can change email.', async ({
        createBusinessUserAndLogin,
        request,
        page,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
    }) => {
        await description('To verify Business user can change email.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-44`, 'Qase: SIGN-44');
        await link(`${GOOGLE_DOC_LINK}781u9ev2p6y5`, 'ATC_11_44_01');
        await epic('Settings');
        await feature('Profile');
        await tag('Email');

        const newEmail = await generateNewUserEmail('_new');
        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await step('Verify email field is filled with correct user email.', async () => {
            await expect(settingsProfilePage.emailAddressInputField).toHaveValue(process.env.NEW_USER_EMAIL);
        });
        await settingsProfilePage.renewEmailAddressInputField(newEmail);
        await settingsProfilePage.clickUpdateBtn();
        await step(`Verify toast message with text "${TOAST_MESSAGE.checkYourEmail}" popped up.`, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.checkYourEmail);
        });

        const confirmationLink = await retrieveUserEmailConfirmationLink(
            request,
            newEmail,
            EMAIL_SUBJECTS.emailConfirmation
        );
        await step('Navigate to Confirmation link.', async () => {
            await page.goto(confirmationLink);
            await page.waitForURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`);
        });
        await step(`Verify toast message with text "${TOAST_MESSAGE.emailConfirmed}" popped up .`, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.emailConfirmed);
        });

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await step('Verify email field is filled with updated user email.', async () => {
            await expect(settingsProfilePage.emailAddressInputField).toHaveValue(newEmail);
        });
    });

    test('TC_11_46_03 | Verify user can enabling, disabling checkboxes.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
    }) => {
        await description('To verify Business user can enabling, disabling checkboxes.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-46`, 'Qase: SIGN-46');
        await link(`${GOOGLE_DOC_LINK}ggir7ap77gj1`, 'ATC_11_46_03');
        await epic('Settings');
        await feature('Profile');
        await tag('Update');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.toggleCheckboxes(false);
        await settingsProfilePage.clickSaveButton();

        await step(`Verify toast message with text "${TOAST_MESSAGE.profileUpdated}" popped up. `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
        });

        await step('Verify checkboxes are unchecked', async () => {
            const checkBoxes = await settingsProfilePage.checkBoxesFrameList;
            const checkBoxCount = await checkBoxes.count();

            for (let i = 0; i < checkBoxCount; i++) {
                await expect(checkBoxes.nth(i)).toHaveClass(CHECK_BOXES_STATUS.unChecked);
            }
        });

        await settingsProfilePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.profileUpdated);
        await settingsProfilePage.toggleCheckboxes(true);
        await settingsProfilePage.clickSaveButton();

        await step(`Verify toast message with text "${TOAST_MESSAGE.profileUpdated}" popped up. `, async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
        });

        await step('Verify checkboxes are checked.', async () => {
            const checkBoxes = await settingsProfilePage.checkBoxesFrameList;
            const checkBoxCount = await checkBoxes.count();

            for (let i = 0; i < checkBoxCount; i++) {
                await expect(checkBoxes.nth(i)).toHaveClass(CHECK_BOXES_STATUS.checked);
            }
        });
    });

    DATE_FORMAT.forEach((dateFormat) => {
        test(`TC_11_46_02 | Verify user can change date format to ${dateFormat}.`, async ({
            createBusinessUserAndLogin,
            signPage,
            settingsCompanyPage,
            settingsProfilePage,
            prepareForSignatureModal,
        }) => {
            await description(
                'To verify Business user can update the date format in their profile settings and the updated date format is applied when signing a document. \n Attention: The date format YYYY / DD / MM was not checked and included to test data because of the existed bug'
            );
            await severity(Severity.CRITICAL);
            await link(`${QASE_LINK}/SIGN-46`, 'Qase: SIGN-46');
            await link(`${GOOGLE_DOC_LINK}q3bufxo4ii41`, 'ATC_11_46_02');
            await epic('Settings');
            await feature('Profile');
            await tag('Date-format');

            test.slow();
            function generateCurrentDate(dateFormat) {
                let dt = new Date();
                const year4digits = dt.getFullYear().toString();
                const year2digits = dt.getFullYear().toString().slice(-2);
                const month = (dt.getMonth() + 1).toString().padStart(2, '0');
                const day = dt.getDate().toString().padStart(2, '0');

                if (dateFormat === 'DD / MM / YYYY') {
                    return `${day}/${month}/${year4digits}`;
                } else if (dateFormat === 'MM / DD / YY') {
                    return `${month}/${day}/${year2digits}`;
                } else if (dateFormat === 'DD / MM / YY') {
                    return `${day}/${month}/${year2digits}`;
                }
            }
            const CURRENT_DATE = generateCurrentDate(dateFormat);

            await signPage.sideMenu.clickSettings();
            await settingsCompanyPage.sideMenuSettings.clickProfile();
            await settingsProfilePage.clickDateFormatDropdown();
            await settingsProfilePage.chooseDateFormat(dateFormat);
            await settingsProfilePage.clickSaveButton();

            await step(`Verify toast message with text "${TOAST_MESSAGE.profileUpdated}" popped up.`, async () => {
                await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.profileUpdated);
            });

            await settingsProfilePage.sideMenu.clickSign();
            await signPage.uploadFileTab.fileUploader.uploadFile(UPLOAD_FILE_PATH.xlsxDocument);
            await signPage.uploadFileTab.clickPrepareDocumentBtn();
            await prepareForSignatureModal.clickSignDocumentRadioBtn();
            await prepareForSignatureModal.clickContinueBtn();
            await prepareForSignatureModal.clickGotItBtn();
            await prepareForSignatureModal.clickDateOnFieldsMenu();
            await prepareForSignatureModal.clickDocumentBody();
            await prepareForSignatureModal.clickDateOnLeftMenu();

            await step(`Verify date on document has correct format ${dateFormat}`, async () => {
                await expect(prepareForSignatureModal.dateStampedOnDocument).toHaveValue(CURRENT_DATE);
            });
        });
    });

    test('TC_11_46_01 | Verify user can upload an avatar image.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        uploadAvatarImageModal,
    }) => {
        await description('To verify Business user can upload an avatar image.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-46`, 'Qase: SIGN-46');
        await link(`${GOOGLE_DOC_LINK}suq7kpizwkjp`, 'ATC_11_46_01');
        await epic('Settings');
        await feature('Profile');
        await tag('Avatar');

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();

        const defaultAvatarLink = await settingsProfilePage.getProfileAvatarLink();

        await settingsProfilePage.uploadImage(UPLOAD_FILE_PATH.jpgDocument);
        await uploadAvatarImageModal.clickSaveButton();

        await step('Verify "New picture has been uploaded" toaster popped up.', async () => {
            await expect(settingsProfilePage.toast.toastBody).toHaveText(TOAST_MESSAGE.pictureUploaded);
        });

        await settingsProfilePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.pictureUploaded);

        const newtAvatarLink = await settingsProfilePage.getProfileAvatarLink();

        await step('Verify new avatar is defined and not empty.', async () => {
            expect(newtAvatarLink).toBeDefined();
            expect(newtAvatarLink).not.toBeNull();
        });

        await step('Verify new avatar image has been changed compared to default avatar image link.', async () => {
            expect(newtAvatarLink).not.toBe(defaultAvatarLink);
        });
    });

    test('TC_11_46_04 | Verify user can delete profile picture.', async ({
        createBusinessUserAndLogin,
        signPage,
        settingsCompanyPage,
        settingsProfilePage,
        uploadAvatarImageModal,
    }) => {
        await description('To verify Business user can delete an avatar image.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-46`, 'Qase: SIGN-46');
        await link(`${GOOGLE_DOC_LINK}q5uk912hrnbl`, 'ATC_11_46_04');
        await epic('Settings');
        await feature('Profile');
        await tag('Avatar');

        await uploadAvatar(signPage, settingsCompanyPage, settingsProfilePage, uploadAvatarImageModal);

        await signPage.sideMenu.clickSettings();
        await settingsCompanyPage.sideMenuSettings.clickProfile();
        await settingsProfilePage.clickDeleteButton();

        await step('Verify profile picture has been deleted.', async () => {
            await expect(settingsProfilePage.avatarImage).toBeHidden();
        });
    });
});
