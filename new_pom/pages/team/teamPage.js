import { step } from "allure-js-commons";
import ToastComponent from "../../components/toastComponent";

export default class TeamPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.addTeamMemberBtn = this.page.locator('.team').getByRole('button', { name: 'Add Team Member' });
        this.optionsDropdownForExactTeamMember = (teamMemberEmail) => this.page.locator('.table__column--team-email').getByText(`${teamMemberEmail}`).locator('~ *').getByRole('button', { name: 'Options' });
        this.upgradeToAdminOptionBtn = this.page.getByRole('button', { name: 'Upgrade to Admin' });
        this.teamMemberRoleForExactTeamMember = (teamMemberEmail) => this.page.locator('.table__column--team-email').getByText(`${teamMemberEmail}`).locator('~ div.table__column--status');
        this.downgradeToAdminOptionBtn = this.page.getByRole('button', { name: 'Downgrade to User' });
        this.memberCheckbox = this.page.locator('.uiCheckbox__inner')
        this.deleteBtn = this.page.getByRole('button', { name: 'Delete' });
        this.deleteTeamMemberAnywayBtn = this.page.getByRole('button', { name: 'Delete team member anyway' });
        this.exactTeamMember = (teamMemberEmail) => this.page.locator('.table__column--team-email').getByText(`${teamMemberEmail}`)
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

    async checkMemberCheckbox() {
        await step('Set a checkbox for the required user', async () => {
            await this.memberCheckbox.click();
        });
    }

    async clickDeleteButton() {
        await step('Click on the "Delete" button', async () => {
            await this.deleteBtn.click();
        });
    }

    async clickDeleteTeamMemberAnywayButton() {
        await step('Click on the "Delete Team Member Anyway" button', async () => {
            await this.deleteTeamMemberAnywayBtn.click();
        });
    }
}
