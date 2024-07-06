import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import { TEAM_MEMBER_ROLES, TOAST_MESSAGE, QASE_LINK, GOOGLE_DOC_LINK } from '../testData.js';
import { description, tag, severity, Severity, link, epic, step } from 'allure-js-commons';
import { addTeamMember } from '../helpers/preconditions.js';

test.describe('Team', () => {
    const teamMemberRoles = Object.values(TEAM_MEMBER_ROLES);
    teamMemberRoles.forEach(role => {
        test(`TC_09_38_01 | Verify that Business User can add ${role} team member`, async ({
            page,
            request,
            createBusinessUserAndLogin,
            signPage,
            teamPage,
            addTeamMemberModal,
            teamsAcceptInvitePage,
        }) => {
            await description(`Objective: Verify that Business User can add ${role} team member`);
            await severity(Severity.CRITICAL);
            await link(`${QASE_LINK}/SIGN-38`, 'Qase: SIGN-38');
            await link(`${GOOGLE_DOC_LINK}70blkaheuq3a`, 'ATC_09_38_01');

            await epic('Team');
            await tag('Add team member');

            test.setTimeout(90000);

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

            await signPage.sideMenu.clickTeam();

            await step(`Verify that a team member has role ${role} set in the Team table`, async () => {
                await expect(await teamPage.teamMemberRoleForExactTeamMemeber(teamMemberEmail)).toHaveText(role);
            });
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

        await addTeamMember(
            TEAM_MEMBER_ROLES.user,
            teamMemberEmail,
            teamMemberName,
            page,
            request,
            signPage,
            teamPage,
            addTeamMemberModal,
            teamsAcceptInvitePage
        );

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

        await addTeamMember(
            TEAM_MEMBER_ROLES.admin,
            teamMemberEmail,
            teamMemberName,
            page,
            request,
            signPage,
            teamPage,
            addTeamMemberModal,
            teamsAcceptInvitePage
        );
        
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

    test('TC_09_40_01 | Verify that Business User can remove "User" teammate from Team', async ({
        page,
        request,
        createBusinessUserAndLogin,
        signPage,
        teamPage,
        addTeamMemberModal,
        teamsAcceptInvitePage
    }) => {
        await description('Objective: To verify that Business User can remove "User" teammate from Team');
        await severity(Severity.CRITICAL);
        await link(`${QASE_LINK}/SIGN-40`, 'Qase: SIGN-40');
        await link(`${GOOGLE_DOC_LINK}piqlawxmqgos`, 'ATC_09_40_01');
        await epic('Team');
        await tag('Delete Team Member');

        test.setTimeout(90*1000);

        const teamMemberEmail = `${process.env.EMAIL_PREFIX}${process.env.NEW_USER_NUMBER}${'_teammember'}${process.env.EMAIL_DOMAIN}`;
        const teamMemberName = `${process.env.NEW_USER_NAME}${'_teammember'}`

        await addTeamMember(
            TEAM_MEMBER_ROLES.user,
            teamMemberEmail,
            teamMemberName,
            page,
            request,
            signPage,
            teamPage,
            addTeamMemberModal,
            teamsAcceptInvitePage
        );
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
})


