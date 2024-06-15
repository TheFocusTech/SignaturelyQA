
export default class NewDocumentsPage {
    constructor(page) {
        this.page = page;

        this.optionsBtn = this.page.getByText('Options');
        this.editAndResendBtn = this.page.getByText('Edit & Resend');
        this.editAndResendTitle = this.page.getByText('Edit & Resend document')

    }

    async clickOptionsBtn() {
        await this.optionsBtn.click();
    }

    async clickEditAndResendBtn() {
        await this.editAndResendBtn.click();
    }

}