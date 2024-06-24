import {step} from "allure-js-commons";

export default class ToastComponent {
    constructor(page) {
        this.page = page;

        this.toastFirstCloseBtn = this.page.locator('.Toastify [data-src="/static/media/close-icon.9052da34.svg"]').first();
        this.toastBody = this.page.locator('.Toastify__toast-body');

    }

    async clickToastFirstCloseBtn() {
        await step('Close the toast notification.', async () => {
            await this.toastFirstCloseBtn.click();
        });
    }

    async waitForToastCompleted() {
        await this.toastFirstCloseBtn.waitFor({ state: 'visible' });
        await this.toastFirstCloseBtn.waitFor({ state: 'hidden' });
    }

    async waitForToastIsHiddenByText(text) {
        await this.toastBody.getByText(text).waitFor({ state: "visible"});
        await this.toastBody.getByText(text).waitFor({ state: "hidden" });
    }
}
