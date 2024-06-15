export default class SideMenuDocumentsComponent {
    constructor(page) {
        this.page = page;

        this.trash = this.page.getByRole('link', { name: 'Trash' });

    }

    async clickTrash() {
        await this.trash.click();
    }
}