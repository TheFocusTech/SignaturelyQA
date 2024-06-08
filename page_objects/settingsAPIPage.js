import AbstractBaseSet from "./abstractBaseSet";
import CreateAPIKeyModal from "./createAPIKeyModal";
import SignPage from "./signPage";
import AbstractSettingsSet from "./abstractSettingsSet.js";

class SettingsAPIPage extends AbstractSettingsSet {
    constructor(page) {
        super(page);
        // this.page = page;
    // }

    this.locators = {
        ...this.locators,
        getCreateAPIKeyButtonAtRight: () => this.page.locator('.team__header-container').getByRole('button', {name: 'Create API key'}),
        getCreateAPIKeyButtonInTable: () => this.page.locator('.documents__empty-table').getByRole('button', {name: 'Create API key'}),
        getBillingDetailsField: () => this.page.getByPlaceholder('Enter billing details here'),
        getBillingDetailsTextField: () => this.page.locator('.billing__details > form textarea'),
        getOptionDropdown: () => this.page.getByRole('button', {name: 'Options'}),
        getDeleteButton: () => this.page.getByRole('button', {name: 'Delete'}),
        getYesButton: () => this.page.getByRole('button', {name: 'Yes, Delete'}),
        getToaster: () => this.page.locator('.Toastify__toast-body'),
        getEmptyAPiKeysHeader: () => this.page.locator('.empty-table__header'),
        // getSignSidebarLink: () => this.page.getByRole('link', {name: 'Sign', exact: true}),
    }
}

    async clickCreateAPIKeyButtonAtRight() {
        await this.locators.getCreateAPIKeyButtonAtRight().click();

        return new CreateAPIKeyModal(this.page);
    }

    async clickCreateAPIKeyButtonInTable() {
        await this.locators.getCreateAPIKeyButtonInTable().click();

        return new CreateAPIKeyModal(this.page);
    }

    async fillBillingDetailsField(text) {
        await this.locators.getBillingDetailsField().fill(text);

        return this;
    }

    async clickDeleteButton() {
        await this.locators.getDeleteButton().click();

        return this;
    }

    async clickYesButton() {
        await this.locators.getYesButton().click();

        return this;
    }

    async clickToaster() {
        await this.locators.getToaster().click();

        return this;
    }

    async getToasterText() {
        const toasterMessageText =  await this.locators.getToaster().innerText();

        return toasterMessageText;
    }

    async removeAPIKeys() {
        const buttons = await this.locators.getOptionDropdown().all();

        if (buttons.length > 0) {
            for (let i = 0; i < buttons.length; i++) {
                await buttons[0].first().click();
                await this.clickDeleteButton();
                await this.clickYesButton();
                await this.clickToaster();
            }
        }

        return this;
    }

    // async clickSignSidebarLinkAndGoSignPage() {
    //     await this.locators.getSignSidebarLink().click();

    //     return new SignPage(this.page);
    // }
}

export default SettingsAPIPage;