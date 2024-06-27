import {step} from "allure-js-commons";

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
        await step('Fill in the "API key name" field', async () => {
            await this.createAPIKeyNameField.waitFor();
            await this.createAPIKeyNameField.fill(keyName);
        });
    }

    async clickCreateAPIBtn() {
        await step('Click "Create API" button', async () => {
            await this.createAPIBtn.click();
        });
    }

    async clickCopyAPIBtn() {
        await step('Click "Copy API" button', async () => {
            await this.copyAPIBtn.click();
        });
    }

    async getAPIKeyValueText() {
        await step('Retrieve API key value', async () => {
            await this.APIKeyValue.waitFor();

            return await this.APIKeyValue.innerText();
        });
    }

    async clickCloseAPIModalBtn() {
        await step('Click close button at the API modal window', async () => {
            await this.closeAPIModalBtn.click();
        });
    }
}