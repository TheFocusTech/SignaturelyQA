export default class TableComponent {

    constructor(page) {
        this.page = page;

        this.emptyTableHeader = this.page.locator('.empty-table__header');
    }

    async getEmptyTableHeaderText() {
        await this.emptyTableHeader.innerText();
    }
}