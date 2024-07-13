import { step } from "allure-js-commons";

export default class MoveToFolderModal {
    constructor(page) {
        this.page = page;

        this.nameOfFolder = this.page.getByRole('dialog').locator('.moveToFolderModal__item');
        this.moveToFolderBtn = this.page.getByRole('button', { name: 'Move to folder' });
    }

    async selectFolder(name) {
        await step(`Select folder with ${name} name.`, async () => {
            await this.nameOfFolder.filter({ hasText: name }).click();
        });
    }

    async clickMoveToFolderBtn() {
        await step('Click on "Move to folder" button.', async () => {
            await this.moveToFolderBtn.click();
        });    
    }
}
