export default class ToastComponent {
    constructor(page) {
        this.page = page;

        this.toastFirstCloseBtn = this.page.locator('.Toastify [data-src="/static/media/close-icon.9052da34.svg"]').first();
    }

    async clickToastFirstCloseBtn() {
        await this.toastFirstCloseBtn.click();
    }

}