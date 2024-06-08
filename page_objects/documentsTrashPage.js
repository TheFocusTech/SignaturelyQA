import AbstractBaseSet from "./abstractBaseSet";
import SignPage from "./signPage";

class DocumentsTrashPage extends AbstractBaseSet {
    constructor(page) {
        super(page);
        // this.page = page;
    // }

    this.locators = {
        ...this.locators,
        getTitleCheckbox: () => this.page.locator('.uiCheckbox__inner').first(),
        getResultsNumber: () => this.page.locator('.tableControls__pagingCounter span'),
        getDocumentTableIcon: () => this.page.locator('.documents__dropdownOption-icon').first(),
        getEmptyTrashBtn: () => this.page.getByRole('button', {name: 'Empty Trash'}),
        getConfirmEmptyTrashBtn: () => this.page.locator('.confirmModal__button'),
        getEmptyTableHeader: () => this.page.locator('.empty-table__header'),
        // getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),        
    }
}

    async clickTitleCheckbox() {
        await this.locators.getTitleCheckbox().click();

        return this;
    }

    async clickEmptyTrashBtn() {
        await this.locators.getEmptyTrashBtn().click();        

        return this;
    }

    async clickConfirmEmptyTrashBtn() {
        await this.locators.getConfirmEmptyTrashBtn().click();

        return this;
    }

    // async clickSignSidebarLinkAndGoSignPage() {
    //     await this.locators.getSignSidebarLink().click();

    //     return new SignPage(this.page);
    // }
    
}
export default DocumentsTrashPage;