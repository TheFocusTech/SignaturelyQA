import { step } from 'allure-js-commons';

export default class ToastComponent {
    constructor(page) {
        this.page = page;

        this.toastFirstCloseBtn = this.page.locator('.Toastify [data-src="/static/media/close-icon.9052da34.svg"]').first();
        this.toastBody = this.page.locator('div.Toastify__toast-body');
    }

    async clickToastFirstCloseBtn() {
        await step('Close toast notification', async () => {
            await this.toastFirstCloseBtn.click();
        });
    }

    async waitForToastCompleted() {
        await step('Wait for toast to be hidden', async () => {
            await this.toastFirstCloseBtn.waitFor({ state: 'visible' });
            await this.toastFirstCloseBtn.waitFor({ state: 'hidden' });
        });
    }

    async waitForToastIsHiddenByText(text) {
        await step(`The toast message with the text "${text}" is visible and then hidden`, async () => {
            await this.toastBody.getByText(text).waitFor({ state: "visible" });
            await this.toastBody.getByText(text).waitFor({ state: "hidden" });
        });
    }

    async waitForToastText() {
        await step('Wait for toast message to be visible', async () => {
            await this.toastBody.waitFor({state: 'visible'});
        });
    }
}
