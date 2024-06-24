import { test } from "../../fixtures/base";

export default class MoveToFolderModal {
    constructor(page) {
        this.page = page;

        this.nameOfFolder = this.page.getByRole('dialog').locator('.moveToFolderModal__item');
        this.moveToFolderBtn = this.page.getByRole('button', { name: 'Move to folder' });
    }

    async selectFolder(name) {
        await test.step('Select the folder', async () => {
            await this.nameOfFolder.filter({ hasText: name }).click();
        });
    }

    async clickMoveToFolderBtn() {
        await test.step('Click the "Move to folder" button', async () => {
            await this.moveToFolderBtn.click();
        });    
    }
}
