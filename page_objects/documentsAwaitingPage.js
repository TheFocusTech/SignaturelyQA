import EditPage from "./editPage";
class DocumentsAwaitingPage {

    constructor(page) {
        this.page = page;
    }

    locators = {

        getOptionsButton: () => this.page.getByRole('button', { name: "Options" }),
        getEditAndResendButton: () => this.page.getByRole('button', { name: "Edit & Resend" }),
        getModalForm: () => this.page.locator('.confirmModal__content'),
        getRevertToDraftButton: () => this.page.getByRole('button', { name: 'Revert to Draft' }),
        getCancelButton: () => this.page.getByRole('button', { name: 'Cancel' }),
        getDeleteButton: () => this.page.getByRole('button', { name: "Delete" }),
        getCheckBoxSelectAll: ()=> this.page.locator('.select-all'),
        getSelectOptionsButton: () => this.page.getByText('Select options'),
        getDeleteButton: ()=> this.page.locator('//p[text()="Delete"]'),
        getYesDeleteButton: () => this.page.getByRole('button', { name: "Yes, Delete" }),
    }

    async clickOptionsButton() {
        await this.locators.getOptionsButton().hover();
        await this.locators.getOptionsButton().click();
        return this;
    }

    async clickEditAndResendButton() {
        await this.locators.getEditAndResendButton().hover();
        await this.locators.getEditAndResendButton().click();

        return this;
    }

    async clickRevertToDraftButton() {
        await this.locators.getRevertToDraftButton().hover();
        await this.locators.getRevertToDraftButton().click();

        return new EditPage(this.page);
    }

    async clickCancelButton() {
        await this.locators.getCancelButton().hover();
        await this.locators.getCancelButton().click();

        return  this;
    }

    async clickSelectOptionsButton() {
        await this.locators.getSelectOptionsButton().hover();
        await this.locators.getSelectOptionsButton().click();

        return this;
    }

    async clickCheckBoxSelectAll() {
        await this.locators.getCheckBoxSelectAll().hover();
        await this.locators.getCheckBoxSelectAll().click();

        return this;

}

async clickDeleteButton() {
    await this.locators.getDeleteButton().hover();
    await this.locators.getDeleteButton().click();

    return this;

}

async clickYesDeleteButton() {
    await this.locators.getYesDeleteButton().hover();
    await this.locators.getYesDeleteButton().click();

    return this;

}
}
export default DocumentsAwaitingPage;