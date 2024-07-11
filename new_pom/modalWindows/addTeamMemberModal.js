import { step } from 'allure-js-commons';
export default class AddTeamMemberModal {
    constructor(page) {
        this.page = page;

        this.teamMemberEmail = this.page.getByPlaceholder('test@signaturely.com');
        this.teamMemberName = this.page.getByPlaceholder('Name');
        this.teamMemberActualRole = this.page.locator('.uiSelect__select-value');
        this.teamMembersRoleOptionsDropdown = this.page.locator('.teammates__role-wrapper');
        this.teamMemberRoleOption = this.page.locator('.uiSelect__select-row');
        this.sendInvitesBtn = this.page.getByRole('button', { name: 'Send Invites' });
    }

    async fillTeamMemberEmailInputField(teamMemberEmail) {
        await step("Fill in the  team member's 'Email' input field", async () => {
            await this.teamMemberEmail.type(teamMemberEmail);
        });
    }

    async fillTeamMemberNameInputField(teamMemberName) {
        await step("Fill in the  team member's 'Name' input field", async () => {
            await this.teamMemberName.type(teamMemberName);
        });
    }

    async isTeamMemberRoleSet(role) {
        return await step("Get the team member's role value", async () => {
            return (await this.teamMemberActualRole.innerText()) === role;
        });
    }

    async openTeamMemberRoleDropdown() {
        await step('Open team member role dropdown', async () => {
            await this.teamMembersRoleOptionsDropdown.click();
        });
    }

    async selectTeamMemberRoleFromDropdown(role) {
        await step("Select the team member's role from the dropdown", async () => {
            await this.teamMemberRoleOption.getByText(role).click();
        });
    }

    async changeTeamMemberRole(expectedRole) {
        await step(`Change team member role to ${expectedRole}`, async () => {
            await this.openTeamMemberRoleDropdown();
            await this.selectTeamMemberRoleFromDropdown(expectedRole);
        });
    }

    async clickSendInvitesButton() {
        await step('Click on "Send Invites" button', async () => {
            await this.sendInvitesBtn.click();
        });
    }
}
