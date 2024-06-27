import { step } from 'allure-js-commons';

export default class DocumentSubmitProccessModal {
    constructor(page) {
        this.page = page;

        this.submitTitle = page.locator('.successSignUpModal__side-title');
    }

    async waitForSubmitTitleByText(text) {
        await step(`A Title with the text "${text}" is visible`, async () => {
            await this.submitTitle.getByText(text).waitFor({ state: 'visible' });
        });
    }
}
