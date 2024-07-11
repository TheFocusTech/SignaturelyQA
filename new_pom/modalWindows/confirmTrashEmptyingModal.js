import {step} from "allure-js-commons";

export default class ConfirmTrashEmptyingModal {
    constructor(page) {
        this.page = page;
        this.emptyTrashBtn = this.page.locator('.confirmModal__button');
    }

    async clickEmptyTrashBtn() {
        await step('Click on "Empty trash" button', async () => {
            await this.emptyTrashBtn.waitFor();
            await this.emptyTrashBtn.click();
        });
    }
};
