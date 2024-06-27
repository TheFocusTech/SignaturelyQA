export default class SideMenuDocumentsComponent {
    constructor(page) {
        this.page = page;

        this.trash = this.page.getByRole('link', { name: 'Trash' });
        this.awaitingSignature = this.page.getByRole('link', {name: 'Awaiting Signature'});
        this.completedLink = this.page.getByRole('link', { name: 'Completed' });
    }

    async clickTrash() {
        await this.trash.click();
    }
  
    async clickAwaitingSignature() {
        await this.awaitingSignature.click();
    }

    async clickCompletedLink() {
        await this.completedLink.click();
    }
}