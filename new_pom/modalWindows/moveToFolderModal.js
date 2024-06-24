export default class MoveToFolderModal {
    constructor(page) {
        this.page = page;

        this.nameOfFolder = this.page.getByRole('dialog').locator('.moveToFolderModal__item');
        this.moveToFolderBtn = this.page.getByRole('button', { name: 'Move to folder' });
    }

    async selectFolder(name) {
        await this.nameOfFolder.filter({ hasText: name }).click();
    }

    async clickMoveToFolderBtn() {
        await this.moveToFolderBtn.click();
    }
}
