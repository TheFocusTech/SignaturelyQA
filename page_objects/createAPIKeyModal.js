import AbstractBaseSet from "./abstractBaseSet";
import SettingsCompanyPage from "./settingsCompanyPage";

class CreateAPIKeyModal extends AbstractBaseSet {
    constructor(page) {
        super(page);
        // this.page = page;
    // }

    this.locators = {
        ...this.locators,
        getAPIKeyNameField: () => this.page.getByPlaceholder('API key name'),
        getCreateAPIButton: () => this.page.getByRole('button', { name: 'Create API' }),
        getCopyAPIButton: () => this.page.getByRole('button', { name: 'Copy API' }),
        getAPIKeyValue: () => this.page.locator('.apiKeyModal__value'),
        getCloseDialogButton: () => this.page.locator('.modal__close-button > div > .injected-svg > path'),
    }
}

    async fillInCreateAPIKeyNameField(keyName) {
        await this.locators.getAPIKeyNameField().fill(keyName);

        return this;
    }

    async clickCreateAPIButton() {
        await this.locators.getCreateAPIButton().click();

        return this;
    }

    async clickCopyAPIButton() {
        await this.locators.getCopyAPIButton().click();

        return this;
    }

    async getAPIKeyValueText() {
        return await this.locators.getAPIKeyValue().textContent();
    }

    async clickCloseDialogButton() {
        await this.locators.getCloseDialogButton().click();

        return new SettingsCompanyPage(this.page);
    }

}

export default CreateAPIKeyModal;