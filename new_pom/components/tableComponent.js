export default class TableComponent {

    constructor(page) {
        this.page = page;

        this.emptyTableHeader = this.page.locator('.empty-table__header');
        this.documentStatus = this.page.locator('.documents__documentStatus').first();
        this.optionsBtn = this.page.getByText('Options');
        this.editAndResendBtn = this.page.getByText('Edit & Resend');
        this.titleEditAndResendDocument = this.page.getByText('Edit & Resend document');

    }

    async clickOptionsBtn() {
        await this.optionsBtn.waitFor();
        await this.optionsBtn.click();
    }

    async clickEditAndResendBtn() {
        await this.editAndResendBtn.click();
    }

    async getTitleText() {
        const actualText = await this.titleEditAndResendDocument.textContent();
        return actualText
    }

}