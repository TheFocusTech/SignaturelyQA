export default class ToastsComponent {
    constructor(page) {
        this.page = page;

        this.toastFirstCloseBtn = this.page.locator('[type="success"]').first();
    }

    async clickToastFirstCloseBtn() {
        await this.toastFirstCloseBtn.click();
    }

}