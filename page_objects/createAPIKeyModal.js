import NewSettingsCompanyPage from "../new_pom/pages/settings/settingsCompanyPage";
import NewCreateAPIKeyModal from "../new_pom/modalWindows/createAPIKeyModal";

class CreateAPIKeyModal {
    constructor(page) {
        this.page = page;

        this.createAPIKeyModal =  new NewCreateAPIKeyModal(this.page)
    }

    locators = {
        getAPIKeyNameField: () => this.page.getByPlaceholder('API key name'),
        getCreateAPIButton: () => this.page.getByRole('button', { name: 'Create API' }),
        getCopyAPIButton: () => this.page.getByRole('button', { name: 'Copy API' }),
        getAPIKeyValue: () => this.page.locator('.apiKeyModal__value'),
        getCloseDialogButton: () => this.page.locator('.modal__close-button > div > .injected-svg > path'),
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

        return new NewSettingsCompanyPage(this.page);
    }

}

export default CreateAPIKeyModal;