import SignPage from "./signPage";
import DocumentsTrashPage from "./documentsTrashPage";
import { FILL_FOLDER_NAME } from '../testData';

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
        getCreateFolderBtn: () => this.page.getByRole('button', { name: 'Create Folder'}),
        getNewFolderNameInputField: () => this.page.getByPlaceholder('New Folder Name'),
        getCreateBtn: () => this.page.getByRole('button', {name: 'Create'}),
        getOptionsBtn: () => this.page.locator('.documents__optionsDropdown').first(),
        getToaster: () => this.page.locator('.Toastify__toast-body'),
        getDeleteBtn: () => this.page.getByRole('button', {name: 'Delete'}),
        getYesDeteleBtn: () => this.page.getByRole('button', {name: 'Yes, Delete'}),
        getSignaturelyLogo: () => this.page.locator('a>img'),
        getListOfAllDocumentsInTable: () => this.page.locator(".table__column.table__column--text--document.truncated").allInnerTexts(),
        getOptionsButton: () => this.page.getByRole("button", { name: "Options" }),
        getMoveToFolderDropdownOption: () => this.page.getByRole("button", { name: "Move to" }),
        getNameOfFolderToMoveTo: (folderName) => this.page.getByRole("dialog").locator(".moveToFolderModal__item").filter({ hasText: `${folderName}` }),
        getMoveToFolderButton: () => this.page.getByRole("button", { name: "Move to folder" }),
        getTableControlsPath: () => this.page.locator(".tableControls__path").allInnerTexts(),
        getDocumentTitle: (name) => this.page.locator('.documents__list-item').filter({ hasText: name }),
        getRootItemOfTableControlsPath: () => this.page.locator('.tableControls__path--item').first(),
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

    async clickSignaturelyLogoAndGoSignPage() {
        await this.locators.getSignaturelyLogo().click();

        return new SignPage(this.page);
    }

    async getNumberOfDocument(documentName) {
        const listOfDocuments = await this.locators.getListOfAllDocumentsInTable()
        const number = await listOfDocuments.indexOf(documentName);

        return number;
    }

    async clickOptionsButton(number) {
        await this.locators.getOptionsButton().nth(number).click();

        return this;
    }

    async clickMoveToFolderOption() {
        await this.locators.getMoveToFolderDropdownOption().click();

        return this;
    }

    async selectFolderToMoveTo(folderName) {
        await this.locators.getNameOfFolderToMoveTo(folderName).click();

        return this;
    }

    async clickMoveToFolderButton() {
        await this.locators.getMoveToFolderButton().click();

        return this;
    }

    async openFolder(folderName) {
        await this.locators.getDocumentTitle(folderName).dblclick();

        return this;
    }

    async waitForFDocumentNameToBeVisible(name) {
        await this.locators.getDocumentTitle(name).waitFor({ state: 'visible' });

        return this;
    }

    async goToRootPathItem() {
        await this.locators.getRootItemOfTableControlsPath().click();

        return this;
    }

}

export default DocumentsPage;
