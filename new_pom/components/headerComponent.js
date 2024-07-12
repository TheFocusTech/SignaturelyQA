import {step} from "allure-js-commons";
import {expect} from "@playwright/test";
import {CI_USER_NAME} from "../../testData";

export default class HeaderComponent {
    constructor(page) {
        this.page = page;

        this.userName = this.page.locator('.dropDownUser__trigger-name')
    }

    async verifyUserNameForOldUserLogin() {
        await step('Verify "User Name" is as expected.', async () => {
            if (process.env.USER_NAME === undefined) {
                await expect(this.userName).toContainText(CI_USER_NAME);
            } else {
                await expect(this.userName).toContainText(process.env.USER_NAME);
            }
        });
    }

}