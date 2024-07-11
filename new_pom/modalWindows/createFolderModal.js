import { step } from "allure-js-commons";

export default class CreateFolderModal {
    constructor(page) {
        this.page = page;

        this.newFolderName = this.page.getByPlaceholder('New Folder Name');
        this.createBtn = this.page.getByRole('button', { name: 'Create' });

    }

    async fillNewFolderName(name) {
        await step('Fill in "New Folder Name" input field.', async () => {
            await this.newFolderName.fill(name);
        });
    }

    async clickCreateBtn() {
        await step('Click on "Create" button.', async () => {
            await this.createBtn.click();
        });
    }
}
