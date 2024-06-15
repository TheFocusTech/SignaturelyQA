export default class DocumentsSideMenuComponent {
    constructor(page) {
        this.page = page;

        this.trashMenu = this.page.getByRole('link', { name: 'Trash' });

    }

    async clickTrashMenu() {
        await this.trashMenu.click();
    }
}