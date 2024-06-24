export default class FormsPage {
    constructor(page) {
        this.page = page;
        this.createFormBtn = this.page.locator('div').filter({ hasText: /^Create Form$/ }).getByRole('button');
    }

    clickCreateFormBtn() {
        this.createFormBtn.click();
    }
}