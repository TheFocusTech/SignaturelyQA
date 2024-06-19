export default class NewCreateAPIKeyModal {
    constructor(page) {
        this.page = page;

        this.createAPIKeyNameField = this.page.getByPlaceholder('API key name');
        this.createAPIButton = this.page.getByRole('button', { name: 'Create API' });
        this.copyAPIButton = this.page.getByRole('button', { name: 'Copy API' });
        this.APIKeyValue = this.page.locator('.apiKeyModal__value');
        this.closeDialogButton = this.page.locator('.modal__close-button > div > .injected-svg > path');
    }

    async fillInCreateAPIKeyNameField(keyName) {
        await this.createAPIKeyNameField.waitFor({state: 'visible'});
        await this.createAPIKeyNameField().fill(keyName);
    }

    async clickCreateAPIButton() {
        await this.createAPIButton().click();
    }

    async clickCopyAPIButton() {
        await this.copyAPIButton().click();
    }

    async getAPIKeyValueText() {
        await this.APIKeyValue().waitFor({state: 'visible'});
        return await this.APIKeyValue().textContent();
    }

    async clickCloseDialogButton() {
        await this.closeDialogButton().click();
    }
}