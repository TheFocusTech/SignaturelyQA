import { step } from 'allure-js-commons';

export default class FolderPermissionsModal {
    constructor(page) {
        this.page = page;

        this.memberName = this.page.locator('.changePermissionsModal__member-name');
        this.checkBoxesList = this.page.locator('form .uiCheckbox__inner');
        this.updatePermissionsBtn = this.page.getByRole('button', { name: 'Update permissions' });
    }

    async waitForMemberName(text) {
        await step('Wait for members names', async () => {
            await this.memberName.getByText(text).waitFor({ state: 'visible' });
        });
    }

    async checkCheckboxes() {
        await step('Check checkboxes', async () => {
            const checkboxesCount = await this.checkBoxesList.count();

            for (let i = 1; i < checkboxesCount; i++) {
                const checkbox = await this.checkBoxesList.nth(i);
                await checkbox.click();
            }
        });
    }

    async clickUpdatePermissionsBtn() {
        await step('Click "Update permissions" button on the modal window', async () => {
            await this.updatePermissionsBtn.click();
        });
    }
}
