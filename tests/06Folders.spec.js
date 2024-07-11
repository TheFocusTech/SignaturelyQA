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
    test('TC_06_22_01 | Verify Business user can create folder.', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
    }) => {
        test.setTimeout(120 * 1000);
        await description('To verify Business user can create folder.');
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
            'Verify toast notification with "Folder created successfully" text appears after creating a folder.',
            async () => {
                await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderCreated);
            }
        );

        await step('Verify new folder has been saved.', async () => {
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
        await description('To verify Business user can delete the folder.');
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
            'Verify toast notification with "Folder deleted successfully" text appears after deleting folder.',
            async () => {
                await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderDeleted);
            }
        );
    });

    test('TC_06_23_01 | Verify user can rename the folder.', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
    }) => {
        test.setTimeout(150 * 1000);
        await description('To verify Business user can rename folder.');
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

        await step('Verify new value has been saved.', async () => {
            expect(await documentsPage.table.getTitleFolder()).toBe(FILL_RENAME_FOLDER_NAME);
        });
    });

    test('TC_06_25_01 | Verify user can move folder to folder.', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        moveToFolderModal,
    }) => {
        test.setTimeout(250 * 1000);

        await description('To verify Business user can move folder to folder.');
        await tag('Move folder to folder');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-25`, 'Qase: SIGN-25');
        await link(`${GOOGLE_DOC_LINK}2d0wcpkoa0jo`, 'ATC_06_25_01');
        await epic('Folders');

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);
        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME_SECOND);
        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickMoveToBtn();
        await moveToFolderModal.selectFolder(FOLDER_NAME);
        await moveToFolderModal.clickMoveToFolderBtn();

        await step('Verify toast notification about successful folder to folder move is displayed.', async () => {
            await documentsPage.toast.toastBody.waitFor({ state: 'visible' });
            await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderMovedToFolder);
        });
    });

    const teamMemberRoles = Object.values(TEAM_MEMBER_ROLES);
    teamMemberRoles.forEach(role => {
        test(`TC_06_26_01 | Verify user can assign folder permissions to team member ${role}.`, async ({
            createBusinessUserAndLogin,
            signPage,
            documentsPage,
            createFolderModal,
            page,
            request,
            teamPage,
            addTeamMemberModal,
            teamsAcceptInvitePage,
            folderPermissionsModal,
        }) => {
            await description(
                `To verify Business user can assign folder permissions to team member with role ${role}. \n
                Attention: Page can be reloaded if application state not synchronized.`
            );
            await severity(Severity.CRITICAL);
            await link(`${QASE_LINK}/SIGN-26`, 'Qase: SIGN-26');
            await link(`${GOOGLE_DOC_LINK}civcn01vf5q7`, 'ATC_06_26_01');

            await epic('Folders');
            await tag('Assign folder permissions');

            test.setTimeout(250 * 1000);

            await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);

            const teamMemberEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${
                process.env.EMAIL_DOMAIN
            }`;
            const teamMemberName = `${process.env.NEW_USER_NAME}${'_teammember'}`;

            await addTeamMember(
                role,
                teamMemberEmail,
                teamMemberName,
                page,
                request,
                signPage,
                teamPage,
                addTeamMemberModal,
                teamsAcceptInvitePage
            );

            await signPage.sideMenu.clickDocuments();
            await documentsPage.table.clickFirstOptionsBtn();
            await documentsPage.table.clickOptionsChangePermissionsBtn();

            await step('Verify modal window "Folder permissions" is opened.', async () => {
                await expect(folderPermissionsModal.folderPermissionsWindow).toBeVisible();
            });

            await folderPermissionsModal.clickTeamMemberCheckboxLast();
            await folderPermissionsModal.clickUpdatePermissionsBtn();
            await documentsPage.toast.waitForToastText();

            await step(
                'Verify toast notification about successful change of access rights is displayed.',
                async () => {
                    await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.permissionsChanged);
                }
            );

            await step('Reload page.', async () => {
                await page.reload();
            });

            await documentsPage.table.clickFirstOptionsBtn();
            await documentsPage.table.clickOptionsChangePermissionsBtn();

            await step('Verify Checkbox of selected team member is checked.', async () => {
                await expect(folderPermissionsModal.teamMemberCheckbox.last()).toHaveClass(CHECK_BOXES_STATUS.checked);
            });
        });
    });

    test('TC_06_26_02 | Verify user can assign folder permissions to multiple team members.', async ({
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
        await description('To verify Business user can assign folder permissions to multiple team members.');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-26`, 'QASE: SIGN-26');
        await link(`${GOOGLE_DOC_LINK}u9qq452yxk4d`, 'ATC_06_26_02');
        await epic('Folders');
        await tag('Assign folder permissions');

        test.slow();

        await createFolder(signPage, documentsPage, createFolderModal, FOLDER_NAME);

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

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickOptionsChangePermissionsBtn();

        for (const member of teamMembers) {
            await folderPermissionsModal.waitForMemberName(member.name);
        }

        await folderPermissionsModal.checkCheckboxes();
        await folderPermissionsModal.clickUpdatePermissionsBtn();
        await documentsPage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.permissionsChanged);

        await documentsPage.reloadPage();

        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickOptionsChangePermissionsBtn();

        await step('Verify checkboxes are checked.', async () => {
            for (const member of teamMembers) {
                await folderPermissionsModal.waitForMemberName(member.name);
            }

            const checkBoxes = await folderPermissionsModal.teamMemberCheckbox;
            const checkBoxCount = await checkBoxes.count();

            for (let i = 1; i < checkBoxCount; i++) {
                await expect(checkBoxes.nth(i)).toHaveClass(CHECK_BOXES_STATUS.checked);
            }
        });
    });
});
