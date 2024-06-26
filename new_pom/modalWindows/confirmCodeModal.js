import {URL_END_POINTS} from "../../testData";
import {step} from "allure-js-commons";

export default class ConfirmCodeModal {
    constructor(page) {
        this.page = page;

        this.confirmCodeModalTitle = this.page.locator('.confirmCodeModal__title');
        this.confirmCodeInputField = this.page.getByPlaceholder('0A2b3C4d5E');
        this.sendButton = this.page.getByRole('button', {name: "Send", exact: true});
    }

    async fillConfirmCodeInputField(code) {
        await step("Enter the confirmation code in the modal window", async () => {
            await this.confirmCodeInputField.fill(code);
        });
    }

    async clickSendButton() {
        await step('Click "Send" button on the modal window', async () => {
            await this.sendButton.click();
            await this.page.waitForURL(`${process.env.URL}${URL_END_POINTS.signEndPoint}`)
        });
    }
}