import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { createFolder, addTeamMember } from '../helpers/preconditions.js';
import {
    TOAST_MESSAGE,
    FILL_RENAME_FOLDER_NAME,
    QASE_LINK,
    GOOGLE_DOC_LINK,
    FOLDER_NAME,
    FOLDER_NAME_SECOND,
    TEAM_MEMBER_ROLES,
    CHECK_BOXES_STATUS,
} from '../testData.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Folders', () => {
    test('TC_06_22_01 | Verify the business user can create folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
    }) => {
        test.setTimeout(120 * 1000);
        await description('Objective: To verify the user can create the folder');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-22`, 'QASE: SIGN-22');
        await link(`${GOOGLE_DOC_LINK}sl5v8067tqvz`, 'ATC_06_22_01');
        await tag('Create a folder');
        await epic('Folders');

        await signPage.sideMenu.clickDocuments();
        await documentsPage.clickCreateFolderBtn();
        await createFolderModal.fillNewFolderName(FOLDER_NAME);
        await createFolderModal.clickCreateBtn();
        await step(
            'Verify the toaster notification with the "Folder created successfully" text appears after creating a folder',
            async () => {
                await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderCreated);
            }
        );

        await step('Verify that the new folder has been saved', async () => {
            await expect(await documentsPage.table.objectTitle).toHaveText(FOLDER_NAME);
        });
    });

    test('TC_06_24_01 | Verify the business user can delete folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        confirmDeletionModal,
    }) => {
        await description('Objective: To verify the user can delete the folder');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-24`, 'QASE: SIGN-24');
        await link(`${GOOGLE_DOC_LINK}h4z5uzr4m1hq`, 'ATC_06_24_01');
        await tag('Delete a folder');
        await epic('Folders');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickOptionsDeleteBtn();
        await confirmDeletionModal.clickYesDelete();

        await step(
            'Verify the toaster notification with the "Folder deleted successfully" text appears after deleting a folder',
            async () => {
                await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderDeleted);
            }
        );
    });

    test('TC_06_23_01 | Rename folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
    }) => {
        test.setTimeout(150 * 1000);
        await description('Objective: Testing Folder Renaming Functionality.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-23`, 'QASE: SIGN-23 ');
        await link(`${GOOGLE_DOC_LINK}i7nf7965pwpi`, 'ATC_06_23_01');
        await tag('Rename Folder ');
        await epic('Folders');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickRenameBtn();
        await documentsPage.table.fillInputNameField(FILL_RENAME_FOLDER_NAME);
        await documentsPage.table.pressEnterInputNameField();
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.folderRename);

        await step('Verify that the new value has been saved', async () => {
            expect(await documentsPage.table.getTitleFolder()).toBe(FILL_RENAME_FOLDER_NAME);
        });
    });

    test('TC_06_25_01 | Move folder to folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        moveToFolderModal,
    }) => {
        test.setTimeout(250 * 1000);

        await description('To verify the user can move folder to folder');
        await tag('Move folder to folder');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-25`, 'Qase: SIGN-25');
        await link(`${GOOGLE_DOC_LINK}2d0wcpkoa0jo`, 'ATC_06_25_01');
        await epic('Folder');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);
        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME_SECOND);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickMoveToBtn();
        await moveToFolderModal.selectFolder(FOLDER_NAME);
        await moveToFolderModal.clickMoveToFolderBtn();

        await step('Verify the toast message', async () => {
            await documentsPage.toast.toastBody.waitFor({ state: 'visible' });
            await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderMovedToFolder);
        });
    });

    test('TC_06_26_02 | Verify that the user can assign folder permissions to multiple team members.', async ({
        page,
        request,
        createBusinessUserAndLogin,
        signPage,
        teamPage,
        addTeamMemberModal,
        teamsAcceptInvitePage,
        documentsPage,
        createFolderModal,
        folderPermissionsModal,
    }) => {
        await description('Objective: To verify the user can assign folder permissions to multiple team members.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-26`, 'QASE: SIGN-26');
        await link(`${GOOGLE_DOC_LINK}u9qq452yxk4d`, 'ATC_06_26_02');
        await epic('Folders');
        await tag('Assign folder permissions');

        test.setTimeout(300 * 1000);

        const teamMembers = [
            {
                role: TEAM_MEMBER_ROLES.user,
                email: `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}_user${process.env.EMAIL_DOMAIN}`,
                name: `${process.env.NEW_USER_NAME}_user`,
            },
            {
                role: TEAM_MEMBER_ROLES.admin,
                email: `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}_admin${process.env.EMAIL_DOMAIN}`,
                name: `${process.env.NEW_USER_NAME}_admin`,
            },
        ];

        for (const member of teamMembers) {
            await addTeamMember(
                member.role,
                member.email,
                member.name,
                page,
                request,
                signPage,
                teamPage,
                addTeamMemberModal,
                teamsAcceptInvitePage
            );
        }

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickChangePermissionsBtn();
        await folderPermissionsModal.checkCheckboxes();
        await folderPermissionsModal.clickUpdatePermissionsBtn();
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.changePermissions);

        await documentsPage.reloadPage();

        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickChangePermissionsBtn();

        await step('Verify that checkboxes are checked', async () => {
            const checkBoxes = await folderPermissionsModal.checkBoxesList;
            const checkBoxCount = await checkBoxes.count();

            for (let i = 1; i < checkBoxCount; i++) {
                await expect(checkBoxes.nth(i)).toHaveClass(CHECK_BOXES_STATUS.checked);
            }
        });
    });
});
