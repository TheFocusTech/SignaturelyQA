export default class SideMenuComponent {
    constructor(page) {
        this.page = page;

        this.sign = this.page.getByRole('link', { name: 'Sign', exact: true });
        this.documents = this.page.getByRole('link', { name: 'Documents', exact: true });

    }

    async clickSign() {
        await this.sign.click();
    }

    async clickDocuments() {
        await this.documents.click();
    }

   
}