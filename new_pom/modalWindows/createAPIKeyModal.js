export default class NewCreateAPIKeyModal {
    constructor(page) {
        this.page = page;

        this.createAPIKeyNameField = this.page.getByPlaceholder('API key name');
        this.createAPIButton = this.page.getByRole('button', { name: 'Create API' });
        this.copyAPIButton = this.page.getByRole('button', { name: 'Copy API' });
        this.APIKeyValue = this.page.locator('.apiKeyModal__value');
        this.closeAPIModalButton = this.page.locator('.modal__close-button > div > .injected-svg > path');
    }

    async fillInCreateAPIKeyNameField(keyName) {
        await this.createAPIKeyNameField.waitFor();
        await this.createAPIKeyNameField.fill(keyName);
    }

    async clickCreateAPIButton() {
        await this.createAPIButton.click();
    }

    async clickCopyAPIButton() {
        await this.copyAPIButton.click();
    }

    async getAPIKeyValueText() {
        await this.APIKeyValue.waitFor();
        return await this.APIKeyValue.textContent();
    }

    async clickCloseAPIModalButton() {
        await this.closeAPIModalButton.click();
    }
}