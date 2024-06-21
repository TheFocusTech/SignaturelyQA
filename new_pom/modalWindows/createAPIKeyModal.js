export default class NewCreateAPIKeyModal {
    constructor(page) {
        this.page = page;

        this.createAPIKeyNameInput = this.page.getByPlaceholder('API key name');
        this.createAPIButton = this.page.getByRole('button', { name: 'Create API' });
        this.copyAPIButton = this.page.getByRole('button', { name: 'Copy API' });
        this.APIKeyValue = this.page.locator('.apiKeyModal__value');
        this.closeAPIModalButton = this.page.locator('.modal__close-button > div > .injected-svg > path');
    }

    async fillCreateAPIKeyNameInput(keyName) {
        await this.createAPIKeyNameInput.waitFor();
        await this.createAPIKeyNameInput.fill(keyName);
    }

    async clickCreateAPIBtn() {
        await this.createAPIButton.click();
    }

    async clickCopyAPIBtn() {
        await this.copyAPIButton.click();
    }

    async getAPIKeyValueText() {
        await this.APIKeyValue.waitFor();
        return await this.APIKeyValue.textContent();
    }

    async clickCloseAPIModalBtn() {
        await this.closeAPIModalButton.click();
    }
}