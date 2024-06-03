import SignPage from "./signPage";
import DocumentsTrashPage from "./documentsTrashPage";

class DocumentsPage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getResultsNumber: () => this.page.locator('.tableControls__pagingCounter span'),
        getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
        getTitleCheckbox: () => this.page.locator('.uiCheckbox__inner').first(),
        getDocumentTableIcon: () => this.page.locator('.documents__dropdownOption-icon').first(),
        getSelectOptionsDropdown: () => this.page.getByText('Select options', {exact: true}),
        getAllCheckboxes: () => this.page.locator('.uiCheckbox__inner'),
        getDeleteDropdownItem: () => this.page.locator('.grid__dropDown-item-label').nth(1),
        getYesDeleteBtn: () => this.page.getByRole('button', {name: 'Yes, Delete'}),
        getEmptyTableHeader: () => this.page.locator('.empty-table__header'),
        getTrashSidebarLink: () => this.page.getByRole('link', {name: 'Trash'}),
        getDocumentStatusAwaiting: () => this.page.locator('.documents__documentStatus-text').first(),
    }

    async clickSignSidebarLinkAndGoSignPage() {
        await this.locators.getSignSidebarLink().click();

        return new SignPage(this.page);
    }

    async clickTitleCheckbox() {
        await this.locators.getTitleCheckbox().click();

        return this;
    }

    async clickSelectOptionsDropdown() {
        await this.locators.getSelectOptionsDropdown().click();

        return this;
    }

    async clickDeleteDropdownItem() {
        await this.locators.getDeleteDropdownItem().click();

        return this;
    }

    async clickYesDeleteBtn() {
        await this.locators.getYesDeleteBtn().click();

        return this;
    }

    async clickTrashSidebarLinkAndGoDocumentsTrashPage() {
        await this.locators.getTrashSidebarLink().click();

        return new DocumentsTrashPage(this.page);
    }

}
export default DocumentsPage;