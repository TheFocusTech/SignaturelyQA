export default class ToastComponent {
    constructor(page) {
        this.page = page;

        this.toastFirstCloseBtn = this.page.locator('.Toastify [data-src="/static/media/close-icon.9052da34.svg"]').first();
        this.toastBody = this.page.locator('.Toastify__toast-body');

    }

    async clickToastFirstCloseBtn() {
        await this.toastFirstCloseBtn.click();
    }

    async waitForToastCompleted() {
        await this.toastBody.waitFor("visible");
        await this.toastBody.waitFor({ state: "hidden" });
    }
}
