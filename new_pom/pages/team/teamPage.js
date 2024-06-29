import { step } from "allure-js-commons";
import ToastComponent from "../../components/toastComponent";

export default class TeamPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.addTeamMemberBtn = this.page.locator('.team').getByRole('button', { name: 'Add Team Member' });
        this.optionsDropdownForExactTeamMember = (teamMemberEmail) => this.page.locator('.table__column--team-email').getByText(`${teamMemberEmail}`).locator('~ *').getByRole('button', { name: 'Options' });
        this.upgradeToAdminOptionBtn = this.page.getByRole('button', { name: 'Upgrade to Admin' });
        this.teamMemberRoleForExactTeamMemeber = (teamMemberEmail) => this.page.locator('.table__column--team-email').getByText(`${teamMemberEmail}`).locator('~ div.table__column--status');
        this.downgradeToAdminOptionBtn = this.page.getByRole('button', { name: 'Downgrade to User' });
    }

    async clickAddTeamMemberButton() {
        await step('Click on the "Add Team Member" button', async () => {
            await this.addTeamMemberBtn.click();
        });
    }

    async clickOptionsForExactTeamMemberByEmail(teamMemberEmail) {
        await step('Click on the "Options" button associated with the exact team member', async () => {
            await this.optionsDropdownForExactTeamMember(teamMemberEmail).click();
        });
    }

    async clickUpgradeToAdminButton() {
        await step('Click on the "Upgrade to Admin" button', async () => {
            await this.upgradeToAdminOptionBtn.click();
        });
    }

    async clickDowngradeToUserButton() {
        await step('Click on the "Downgrade to User" button', async () => {
            await this.downgradeToAdminOptionBtn.click();
        });
    }
}
