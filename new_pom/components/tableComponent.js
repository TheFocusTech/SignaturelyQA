export default class TableComponent {

    constructor(page) {
        this.page = page;

        this.emptyTableHeader = this.page.locator('.empty-table__header');
        this.documentStatus = this.page.locator('.documents__documentStatus').first();
        this.optionsBtn = this.page.getByText('Options');
        this.editAndResendBtn = this.page.getByText('Edit & Resend');
    }

    async clickOptionsBtn() {
        await this.optionsBtn.waitFor();
        await this.optionsBtn.click();
    }

    async clickEditAndResendBtn() {
        await this.editAndResendBtn.click();
    }
}