import SignUpYourInformationComponent from "../../components/signUpYourInformationComponent";
import {test} from "../../../fixtures/base";

export default class SignUpTrialPage {
    constructor(page) {
        this.page = page;

        this.yourInformation = new SignUpYourInformationComponent(this.page);

        this.createAccountBtn = this.page.getByRole('button', {name: 'Create account'});
    }

    async clickCreateAccountBtn() {
        await test.step("Click the button to create an account", async () => {
            await this.createAccountBtn.click();
            await this.createAccountBtn.isHidden();
        });
    }
}
