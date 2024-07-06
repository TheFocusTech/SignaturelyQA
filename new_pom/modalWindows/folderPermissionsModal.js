import {step} from "allure-js-commons";

export default class FolderPermissionsModal {
    constructor(page) {
        this.page = page;

        this.folderPermissionsWindow = this.page.locator('.ReactModal__Content');
        this.teamMemberCheckbox = this.page.locator('form .uiCheckbox__inner').last();
        this.updatePermissionsBtn = this.page.getByRole('button', { name: 'Update permissions' });
    }

    async clickTeamMemberCheckbox() {
        await step('Check the checkbox of a team member on the modal window "Folder permissions"', async () => {
            await this.teamMemberCheckbox.click();
        });
    };

    async clickUpdatePermissionsBtn() {
        await step('Click "Update permissions" button on the modal window "Folder permissions"', async () => {
            await this.updatePermissionsBtn.click();
        });
    };
};