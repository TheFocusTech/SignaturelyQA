export default class NewCreateAPIKeyModal {
    constructor(page) {
        this.page = page;

        this.createAPIKeyNameField = this.page.getByPlaceholder('API key name');
        this.createAPIBtn = this.page.getByRole('button', { name: 'Create API' });
        this.copyAPIBtn = this.page.getByRole('button', { name: 'Copy API' });
        this.APIKeyValue = this.page.locator('.apiKeyModal__value');
        this.closeAPIModalBtn = this.page.locator('.modal__close-button > div > .injected-svg > path');
    }

    async fillCreateAPIKeyNameField(keyName) {
        await this.createAPIKeyNameField.waitFor();
        await this.createAPIKeyNameField.fill(keyName);
    }

    async clickCreateAPIBtn() {
        await this.createAPIBtn.click();
    }

    async clickCopyAPIBtn() {
        await this.copyAPIBtn.click();
    }

    async getAPIKeyValueText() {
        await this.APIKeyValue.waitFor();
        return await this.APIKeyValue.textContent();
    }

    async clickCloseAPIModalBtn() {
        await this.closeAPIModalBtn.click();
    }
}