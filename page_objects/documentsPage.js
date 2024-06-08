import SignPage from "./signPage";
import DocumentsTrashPage from "./documentsTrashPage";
import { FILL_FOLDER_NAME } from '../testData';
import AbstractBaseSet from "./abstractBaseSet";

class DocumentsPage extends AbstractBaseSet {
    constructor(page) {
        // this.page = page;
        super(page);
    // }

    this.locators = {
        ...this.locators,
        getResultsNumber: () => this.page.locator('.tableControls__pagingCounter span'),
        // getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
        getTitleCheckbox: () => this.page.locator('.uiCheckbox__inner').first(),
        getDocumentTableIcon: () => this.page.locator('.documents__dropdownOption-icon').first(),
        getSelectOptionsDropdown: () => this.page.getByText('Select options', {exact: true}),
        getAllCheckboxes: () => this.page.locator('.uiCheckbox__inner'),
        getDeleteDropdownItem: () => this.page.locator('.grid__dropDown-item-label').nth(1),
        getYesDeleteBtn: () => this.page.getByRole('button', {name: 'Yes, Delete'}),
        getEmptyTableHeader: () => this.page.locator('.empty-table__header'),
        getTrashSidebarLink: () => this.page.getByRole('link', {name: 'Trash'}),
        getCreateFolderBtn: () => this.page.getByRole('button', { name: 'Create Folder'}),
        getNewFolderNameInputField: () => this.page.getByPlaceholder('New Folder Name'),
        getCreateBtn: () => this.page.getByRole('button', {name: 'Create'}),
        getOptionsBtn: () => this.page.locator('.documents__optionsDropdown').first(),
        getToast: () => this.page.locator('.Toastify__toast-body'),
        getDeleteBtn: () => this.page.getByRole('button', {name: 'Delete'}),
        getYesDeteleBtn: () => this.page.getByRole('button', {name: 'Yes, Delete'}),
        getRenameBtn: () => this.page.getByRole('button', {name: 'Rename'}),
        getRenameInputField: () => this.page.locator('input.form__input--hidden'),
    }
    }
    
    // async clickSignSidebarLinkAndGoSignPage() {
    //     await this.locators.getSignSidebarLink().click();

    //     return new SignPage(this.page);
    // }

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

    async clickCreateFolderBtn() {
        await this.locators.getCreateFolderBtn().click();

        return this;
    }

    async fillNewFolderNameInputField() {
        await this.locators.getNewFolderNameInputField().fill(FILL_FOLDER_NAME) 

        return this;
    }

    async clickCreateBtn() {
        await this.locators.getCreateBtn().click();

        return this;
    }

    async clickOptionsBtn() {
        await this.locators.getOptionsBtn().click();

        return this;
    }

    async clickDeleteBtn() {
        await this.locators.getDeleteBtn().click();

        return this;
    }

    async clickYesDeleteBtn() {
        await this.locators.getYesDeteleBtn().click();

        return this;
    }

    async clickRenameBtn() {
        await this.locators.getRenameBtn().click();

        return this.page;
    }

    async fillRenameInputField(folderName) {
        await this.locators.getRenameInputField().fill(folderName);

        return this.page;
    }

    async pressEnterRenameInputFielder() {
        await this.locators.getRenameInputField().press('Enter');

        return this.page;
    }
}

export default DocumentsPage;
