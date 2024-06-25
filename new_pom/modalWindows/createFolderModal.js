export default class CreateFolderModal {
    constructor(page) {
        this.page = page;

        this.newFolderName = this.page.getByPlaceholder('New Folder Name');
        this.createBtn = this.page.getByRole('button', { name: 'Create' });

    }

    async fillNewFolderName(name) {
        await this.newFolderName.fill(name);
    }

    async clickCreateBtn() {
        await this.createBtn.click();
    }
}
