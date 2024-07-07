import {step} from "allure-js-commons";

export default class FolderPermissionsModal {
    constructor(page) {
        this.page = page;

        this.folderPermissionsWindow = this.page.locator('.ReactModal__Content');
        this.teamMemberCheckbox = this.page.locator('form .uiCheckbox__inner');
        this.memberName = this.page.locator('.changePermissionsModal__member-name');
        this.updatePermissionsBtn = this.page.getByRole('button', { name: 'Update permissions' });
        
    }

    async waitForMemberName(text) {
        await step('Wait for members names', async () => {
            await this.memberName.getByText(text).waitFor({ state: 'visible' });
        });
    }

    async clickTeamMemberCheckboxLast() {
        await step('Check the checkbox of a team member on the modal window "Folder permissions"', async () => {
            await this.teamMemberCheckbox.last().click();
        });
    };

    async checkCheckboxes() {
        await step('Check checkboxes', async () => {
            const checkboxesCount = await this.teamMemberCheckbox.count();

            for (let i = 1; i < checkboxesCount; i++) {
                const checkbox = await this.teamMemberCheckbox.nth(i);
                await checkbox.click();
            }
        });
    }

    async clickUpdatePermissionsBtn() {
        await step('Click "Update permissions" button on the modal window "Folder permissions"', async () => {
            await this.updatePermissionsBtn.click();
        });
    };
};
 

    

   
