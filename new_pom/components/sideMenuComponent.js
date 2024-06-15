export default class SideMenuComponent {
    constructor(page) {
        this.page = page;

        this.signMenu = this.page.getByRole('link', { name: 'Sign', exact: true });
        this.documentsMenu = this.page.getByRole('link', { name: 'Documents', exact: true });

    }

    async clickSignMenu() {
        await this.signMenu.click();
    }

    async clickDocumentsMenu() {
        await this.documentsMenu.click();
    }

   
}