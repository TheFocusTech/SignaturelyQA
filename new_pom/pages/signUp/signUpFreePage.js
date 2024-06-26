import SignUpYourInformationComponent from "../../components/signUpYourInformationComponent";
import {step} from "allure-js-commons";

export default class SignUpFreePage {
    constructor(page) {
        this.page = page;

        this.yourInformation = new SignUpYourInformationComponent(this.page);

        this.createAccountBtn = this.page.getByRole('button', {name: 'Create account'});
    }

    async clickCreateAccountBtn() {
        await step('Click the "Create Account" button', async () => {
            await this.createAccountBtn.click();
            await this.createAccountBtn.isHidden();
        });
    }
}