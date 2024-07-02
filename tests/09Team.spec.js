import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import {
    TEAM_MEMBER_ROLES,
    EMAIL_SUBJECTS,
    TOAST_MESSAGE,
    QASE_LINK,
    GOOGLE_DOC_LINK,
} from '../testData.js';
import { retrieveUserEmailConfirmationLink } from '../helpers/utils.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';

test.describe('Team', () => {
    test('TC_09_38_01 | Verify that Business User can add team member', async ({
        page,
        request,
        createBusinessUserAndLogin,
        signPage,
        teamPage,
        addTeamMemberModal,
        teamsAcceptInvitePage,
    }) => {
        await description('Objective: To verify that Business User can add the teammate');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-38`, 'Qase: SIGN-38');
        await link(`${GOOGLE_DOC_LINK}5trza9yu39er`, 'ATC_09_38_01');

        await epic('Team');
        await tag('Team Member');

        test.setTimeout(90000);

        const teamMemberEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${
            process.env.EMAIL_DOMAIN
        }`;
        const teamMemberName = `${process.env.NEW_USER_NAME}${'_teammember'}`;

        await signPage.sideMenu.clickTeam();
        await teamPage.clickAddTeamMemberButton();
        await addTeamMemberModal.fillTeamMemberEmailInputField(teamMemberEmail);
        await addTeamMemberModal.fillTeamMemberNameInputField(teamMemberName); 
        (await addTeamMemberModal.isTeamMemberRoleSet(TEAM_MEMBER_ROLES.user))
            ? null
            : await addTeamMemberModal.changeTeamMemberRole(TEAM_MEMBER_ROLES.user);       
        await addTeamMemberModal.clickSendInvitesButton();

        await step('Verify that a toast message ‘Invites sent successfully’ popped up', async () => {
            await expect(teamPage.toast.toastBody).toHaveText(TOAST_MESSAGE.invitesSent);
        });

        const emailSubject = `${process.env.NEW_USER_NAME}${EMAIL_SUBJECTS.inviteToJoin}`;
        const inviteLink = await retrieveUserEmailConfirmationLink(request, teamMemberEmail, emailSubject);
        await step('Navigate to the invite link', async () => {
            await page.goto(inviteLink);
        });
        await teamsAcceptInvitePage.clickBackToMainPageButton();
        await teamsAcceptInvitePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.inviteAccepted);
        await signPage.sideMenu.clickTeam();

        await step("Verify that a team member is displayed in the Team table", async () => {
            await expect(await teamPage.teamMemberRoleForExactTeamMemeber(teamMemberEmail)).toBeVisible();              
        });

        await step("Verify that a team member has role 'User' set in the Team table", async () => {
            await expect(await teamPage.teamMemberRoleForExactTeamMemeber(teamMemberEmail)).toHaveText(
                TEAM_MEMBER_ROLES.user
            );
        });        
    });

    test('TC_09_38_02 | Verify that Business User can add "Admin" team member', async ({
        page,
        request,
        createBusinessUserAndLogin,
        signPage,
        teamPage,
        addTeamMemberModal,
        teamsAcceptInvitePage,
    }) => {
        await description('Objective: To verify that Business User can add "Admin" team member');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-38`, 'Qase: SIGN-38');
        await link(`${GOOGLE_DOC_LINK}70blkaheuq3a`, 'ATC_09_38_02');

        await epic('Team');
        await tag('Add team member');

        test.setTimeout(90000);

        const teamMemberEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${
            process.env.EMAIL_DOMAIN
        }`;
        const teamMemberName = `${process.env.NEW_USER_NAME}${'_teammember'}`;

        await signPage.sideMenu.clickTeam();
        await teamPage.clickAddTeamMemberButton();
        await addTeamMemberModal.fillTeamMemberEmailInputField(teamMemberEmail);
        await addTeamMemberModal.fillTeamMemberNameInputField(teamMemberName);
        (await addTeamMemberModal.isTeamMemberRoleSet(TEAM_MEMBER_ROLES.admin))
            ? null
            : await addTeamMemberModal.changeTeamMemberRole(TEAM_MEMBER_ROLES.admin);
        await addTeamMemberModal.clickSendInvitesButton();

        await step('Verify that a toast message ‘Invites sent successfully’ popped up', async () => {
            await expect(teamPage.toast.toastBody).toHaveText(TOAST_MESSAGE.invitesSent);
        });

        const emailSubject = `${process.env.NEW_USER_NAME}${EMAIL_SUBJECTS.inviteToJoin}`;
        const inviteLink = await retrieveUserEmailConfirmationLink(request, teamMemberEmail, emailSubject);
        await step('Navigate to the invite link', async () => {
            await page.goto(inviteLink);
        });
        await teamsAcceptInvitePage.clickBackToMainPageButton();
        await teamsAcceptInvitePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.inviteAccepted);
        await signPage.sideMenu.clickTeam();

        await step("Verify that a team member has role 'Admin' set in the Team table", async () => {
            await expect(await teamPage.teamMemberRoleForExactTeamMemeber(teamMemberEmail)).toHaveText(
                TEAM_MEMBER_ROLES.admin
            );
        });
    });

    test('TC_09_39_01 | Verify that Business User can upgrade a "User" team member to "Admin"', async ({
        page,
        request,
        createBusinessUserAndLogin,
        signPage,
        teamPage,
        addTeamMemberModal,
        teamsAcceptInvitePage,
    }) => {
        await description('Objective: To verify that Business User can upgrade a "User" team member to "Admin"');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-39`, 'Qase: SIGN-39');
        await link(`${GOOGLE_DOC_LINK}oymxytq1zw7`, 'ATC_09_39_01');
        await epic('Team');
        await tag('Team Member Roles');

        test.setTimeout(90000);

        const teamMemberEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${
            process.env.EMAIL_DOMAIN
        }`;
        const teamMemberName = `${process.env.NEW_USER_NAME}${'_teammember'}`;

        await signPage.sideMenu.clickTeam();
        await teamPage.clickAddTeamMemberButton();
        await addTeamMemberModal.fillTeamMemberEmailInputField(teamMemberEmail);
        await addTeamMemberModal.fillTeamMemberNameInputField(teamMemberName);
        (await addTeamMemberModal.isTeamMemberRoleSet(TEAM_MEMBER_ROLES.user))
            ? null
            : await addTeamMemberModal.changeTeamMemberRole(TEAM_MEMBER_ROLES.user);
        await addTeamMemberModal.clickSendInvitesButton();

        await step('Verify that a toast message ‘Invites sent successfully’ popped up', async () => {
            await expect(teamPage.toast.toastBody).toHaveText(TOAST_MESSAGE.invitesSent);
        });

        const emailSubject = `${process.env.NEW_USER_NAME}${EMAIL_SUBJECTS.inviteToJoin}`;
        const inviteLink = await retrieveUserEmailConfirmationLink(request, teamMemberEmail, emailSubject);
        await step('Navigate to the invite link', async () => {
            await page.goto(inviteLink);
        });
        await teamsAcceptInvitePage.clickBackToMainPageButton();
        await teamsAcceptInvitePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.inviteAccepted);
        await signPage.sideMenu.clickTeam();

        await step("Verify that a team member has role 'User' set in the Team table", async () => {
            await expect(await teamPage.teamMemberRoleForExactTeamMemeber(teamMemberEmail)).toHaveText(
                TEAM_MEMBER_ROLES.user);
        });
        await teamPage.clickOptionsForExactTeamMemberByEmail(teamMemberEmail);
        await teamPage.clickUpgradeToAdminButton();

        await step('Verify that a toast message ‘Team member successfully upgraded to admin.’ popped up', async () => {
            await expect(teamPage.toast.toastBody).toHaveText(TOAST_MESSAGE.upgradedToAdmin);
        });

        await step("Verify that a team member has role 'Admin' set in the Team table", async () => {
            await expect(await teamPage.teamMemberRoleForExactTeamMemeber(teamMemberEmail)).toHaveText(
                TEAM_MEMBER_ROLES.admin);
        });
    });

    test('TC_09_39_02 | Verify that Business User can downgrade an "Admin" team member to "User"', async ({
        page,
        request,
        createBusinessUserAndLogin,
        signPage,
        teamPage,
        addTeamMemberModal,
        teamsAcceptInvitePage,
    }) => {
        await description('Objective: To verify that Business User can downgrade an "Admin" team member to "User"');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-39`, 'Qase: SIGN-39');
        await link(`${GOOGLE_DOC_LINK}1lftblsigk2v`, 'ATC_09_39_02');

        await epic('Team');
        await tag('Team Member Roles');

        test.setTimeout(90000);

        const teamMemberEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${
            process.env.EMAIL_DOMAIN
        }`;
        const teamMemberName = `${process.env.NEW_USER_NAME}${'_teammember'}`;

        await signPage.sideMenu.clickTeam();
        await teamPage.clickAddTeamMemberButton();
        await addTeamMemberModal.fillTeamMemberEmailInputField(teamMemberEmail);
        await addTeamMemberModal.fillTeamMemberNameInputField(teamMemberName);
        (await addTeamMemberModal.isTeamMemberRoleSet(TEAM_MEMBER_ROLES.admin))
            ? null
            : await addTeamMemberModal.changeTeamMemberRole(TEAM_MEMBER_ROLES.admin);
        await addTeamMemberModal.clickSendInvitesButton();

        await step('Verify that a toast message ‘Invites sent successfully’ popped up', async () => {
            await expect(teamPage.toast.toastBody).toHaveText(TOAST_MESSAGE.invitesSent);
        });

        const emailSubject = `${process.env.NEW_USER_NAME}${EMAIL_SUBJECTS.inviteToJoin}`;
        const inviteLink = await retrieveUserEmailConfirmationLink(request, teamMemberEmail, emailSubject);
        await step('Navigate to the invite link', async () => {
            await page.goto(inviteLink);
        });
        await teamsAcceptInvitePage.clickBackToMainPageButton();
        await teamsAcceptInvitePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.inviteAccepted);
        await signPage.sideMenu.clickTeam();

        await step("Verify that a team member has role 'Admin' set in the Team table", async () => {
            await expect(await teamPage.teamMemberRoleForExactTeamMemeber(teamMemberEmail)).toHaveText(
                TEAM_MEMBER_ROLES.admin
            );
        });
        await teamPage.clickOptionsForExactTeamMemberByEmail(teamMemberEmail);
        await teamPage.clickDowngradeToUserButton();

        await step('Verify that a toast message ‘Team member successfully upgraded to admin.’ popped up', async () => {
            await expect(teamPage.toast.toastBody).toHaveText(TOAST_MESSAGE.downgradeToUser);
        });

        await step("Verify that a team member has role 'User' set in the Team table", async () => {
            await expect(await teamPage.teamMemberRoleForExactTeamMemeber(teamMemberEmail)).toHaveText(
                TEAM_MEMBER_ROLES.user);
        });
    });
    })

    test('TC_09_40_01 | Verify that Business User can remove teammate from Team', async ({
        page,
        request,
        createBusinessUserAndLogin,
        signPage,
        teamPage,
        addTeamMemberModal,
        teamsAcceptInvitePage
    }) => {
        await description('Objective: To verify that Business User can remove teammate from Team');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-40`, 'Qase: SIGN-40');
        await link(`${GOOGLE_DOC_LINK}piqlawxmqgos`, 'ATC_09_40_01');
        await epic('Team');
        await tag('Delete Team Member');

        test.setTimeout(90*1000);

        const teamMemberEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${process.env.EMAIL_DOMAIN}`;
        const teamMemberName = `${process.env.NEW_USER_NAME}${'_teammember'}`

        await signPage.sideMenu.clickTeam();
        await teamPage.clickAddTeamMemberButton();
        await addTeamMemberModal.fillTeamMemberEmailInputField(teamMemberEmail);
        await addTeamMemberModal.fillTeamMemberNameInputField(teamMemberName);
        await addTeamMemberModal.isTeamMemberRoleSet(TEAM_MEMBER_ROLES.user) ? null : await addTeamMemberModal.changeTeamMemberRole(TEAM_MEMBER_ROLES.user)
        await addTeamMemberModal.clickSendInvitesButton();

        await step("Verify that a toast message ‘Invites sent successfully’ popped up", async () => {
            await expect(teamPage.toast.toastBody).toHaveText(TOAST_MESSAGE.invitesSent);
        });

        const emailSubject = `${process.env.NEW_USER_NAME}${EMAIL_SUBJECTS.inviteToJoin}`;
        const inviteLink = await retrieveUserEmailConfirmationLink(request, teamMemberEmail, emailSubject);
        await step("Navigate to the invite link", async () => {
            await page.goto(inviteLink);
        });
        await teamsAcceptInvitePage.clickBackToMainPageButton();
        await teamsAcceptInvitePage.toast.waitForToastIsHiddenByText(TOAST_MESSAGE.inviteAccepted);
        await signPage.sideMenu.clickTeam();
        await teamPage.checkMemberCheckbox();
        await teamPage.clickDeleteButton();
        await teamPage.clickDeleteTeamMemberAnywayButton();

        await step('Verify that a toast message ‘Team member deleted successfully’ popped up', async () => {
            await expect(teamPage.toast.toastBody).toHaveText(TOAST_MESSAGE.teamMemberDeleted);
        });

        await step("Verify that a team member is not in the Team table", async () => {
            expect(await teamPage.exactTeamMember(teamMemberEmail)).not.toBeVisible();
        });
    });


