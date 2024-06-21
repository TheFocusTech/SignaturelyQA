export default class TableComponent {

    constructor(page) {
        this.page = page;

        this.emptyTableHeader = this.page.locator('.empty-table__header');
        this.documentStatus = this.page.locator('.documents__documentStatus').first();
        this.optionsDropdown = this.page.getByText('Options');
        this.editAndResendBtn = this.page.getByText('Edit & Resend');
    }

    async clickOptionsDropdown() {
        await this.optionsDropdown.waitFor();
        await this.optionsDropdown.click();
    }

    async clickEditAndResendBtn() {
        await this.editAndResendBtn.click();
    }

}