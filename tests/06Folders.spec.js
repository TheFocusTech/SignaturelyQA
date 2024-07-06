import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { createFolder, addTeamMember } from '../helpers/preconditions.js';
import { TOAST_MESSAGE, FILL_RENAME_FOLDER_NAME, QASE_LINK, GOOGLE_DOC_LINK, FOLDER_NAME, FOLDER_NAME_SECOND, TEAM_MEMBER_ROLES, CHECK_BOXES_STATUS } from '../testData.js';
import { description, tag, severity, Severity, link, epic, step } from "allure-js-commons";

test.describe('Folders', () => {
    test('TC_06_22_01 | Verify the business user can create folder', async ({
        createBusinessUserAndLogin,
        signPage, 
        documentsPage, 
        createFolderModal, 
    }) => {
        test.setTimeout(120 * 1000);
        await description('Objective: To verify the user can create the folder')
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-22`, "QASE: SIGN-22");
        await link(`${GOOGLE_DOC_LINK}sl5v8067tqvz`, "ATC_06_22_01");
        await tag('Create a folder');
        await epic('Folders');

        await signPage.sideMenu.clickDocuments();
        await documentsPage.clickCreateFolderBtn();
        await createFolderModal.fillNewFolderName(FOLDER_NAME);
        await createFolderModal.clickCreateBtn();
        await step('Verify the toaster notification with the "Folder created successfully" text appears after creating a folder', async () => {
            await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderCreated);
        });

        await step('Verify that the new folder has been saved', async () => {
            await expect(await documentsPage.table.objectTitle).toHaveText(FOLDER_NAME);
        });
    });


    test('TC_06_24_01 | Verify the business user can delete folder', async ({
        createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        confirmDeletionModal
    }) => {

        await description('Objective: To verify the user can delete the folder')
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-24`, "QASE: SIGN-24");
        await link(`${GOOGLE_DOC_LINK}h4z5uzr4m1hq`, "ATC_06_24_01");
        await tag('Delete a folder');
        await epic('Folders');

        await createFolder(
            signPage,
            documentsPage,
            createFolderModal,
            FOLDER_NAME
        );

        await signPage.sideMenu.clickDocuments();
        await documentsPage.table.clickFirstOptionsBtn();
        await documentsPage.table.clickOptionsDeleteBtn();
        await confirmDeletionModal.clickYesDelete();

        await step('Verify the toaster notification with the "Folder deleted successfully" text appears after deleting a folder', async () => {
            await expect(await documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.folderDeleted)
        });
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
        await link(`${QASE_LINK}/SIGN-23`, "QASE: SIGN-23 ");
        await link(`${GOOGLE_DOC_LINK}i7nf7965pwpi`, "ATC_06_23_01");
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

    test('TC_06_25_01 | Move folder to folder', async ({ createBusinessUserAndLogin,
        signPage,
        documentsPage,
        createFolderModal,
        moveToFolderModal }) => {
            
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

    const teamMemberRoles = Object.values(TEAM_MEMBER_ROLES);
    teamMemberRoles.forEach(role => { 
        test(`TC_06_26_01 | Verify that the user can assign folder permissions to the team member ${role}`, async ({
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

            await description(`Objective: Verify that the user can assign folder permissions to the team member with role ${role}`);
            await severity(Severity.CRITICAL);
            await link(`${QASE_LINK}/SIGN-26`, 'Qase: SIGN-26');
            await link(`${GOOGLE_DOC_LINK}civcn01vf5q7`, 'ATC_06_26_01');

            await epic('Folders');
            await tag('Assign folder permissions');
    
            test.setTimeout(250 * 1000);
    
            await createFolder(
                signPage,
                documentsPage,
                createFolderModal,
                FOLDER_NAME
            );
            
            const teamMemberEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${process.env.EMAIL_DOMAIN}`;
            const teamMemberName = `${process.env.NEW_USER_NAME}${'_teammember'}`
    
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
            
            await step('Verify the modal window "Folder permissions" is opened', async () => {
                await expect(folderPermissionsModal.folderPermissionsWindow).toBeVisible();    
            });
            
            await folderPermissionsModal.clickTeamMemberCheckbox();
            await folderPermissionsModal.clickUpdatePermissionsBtn();
            await documentsPage.toast.waitForToastText();

            await step('Verify the toast notification about the successful change of access rights is displayed', 
            async () => {
                await expect(documentsPage.toast.toastBody).toHaveText(TOAST_MESSAGE.permissionsChanged);       
            });
            
            await step('Reload page', async () => {
                await page.reload();       
            });
            
            await documentsPage.table.clickFirstOptionsBtn();
            await documentsPage.table.clickOptionsChangePermissionsBtn();
            
            await step('Verify Checkbox of the selected team member is checked', 
            async () => {
                await expect(folderPermissionsModal.teamMemberCheckbox).toHaveClass(CHECK_BOXES_STATUS.checked);     
            });
        });
    });
});