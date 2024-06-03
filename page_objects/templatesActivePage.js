import { FILL_FOLDER_NAME } from '../testData';

class TemplatesActivePage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getCreateFolderBtn: () => this.page.getByRole('button', { name: 'Create Folder'}),
        getNewFolderNameInputField: () => this.page.getByPlaceholder('New Folder Name'),
        getCreateBtn: () => this.page.getByRole('button', {name: 'Create'}),
        getOptionsBtn: () => this.page.getByRole('button', {name: 'Options'}),
        getToaster: () => this.page.locator('.Toastify__toast-body'),
        getDeleteBtn: () => this.page.getByRole('button', {name: 'Delete'}),
        getYesDeteleBtn: () => this.page.getByRole('button', {name: 'Yes, Delete'}),
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
}
export default TemplatesActivePage;