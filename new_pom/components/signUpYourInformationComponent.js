import {step} from "allure-js-commons";

export default class SignUpYourInformationComponent {
    constructor(page) {
        this.page = page;

        this.nameInputField = this.page.getByPlaceholder('Full Name');
        this.emailInputField = this.page.getByPlaceholder('username@gmail.com');
        this.passwordInputField = this.page.getByPlaceholder('Your password');
    }

    async fillNameInputField(name) {
        await step('Fill in "Name" input field.', async () => {
            await this.nameInputField.fill(name);
        });
    }

    async fillEmailInputField(email) {
        await step('Fill in "Email Address" input field.', async () => {
            await this.emailInputField.fill(email);
        });
    }

    async fillPasswordInputField(password) {
        await step('Fill in "Password" input field.', async () => {
            await this.passwordInputField.fill(password);
        });
    }
}
