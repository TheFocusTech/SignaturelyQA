import {test} from "../../fixtures/base";

export default class SignUpYourInformationComponent {
    constructor(page) {
        this.page = page;

        this.nameInputField = this.page.getByPlaceholder('Full Name');
        this.emailInputField = this.page.getByPlaceholder('username@gmail.com');
        this.passwordInputField = this.page.getByPlaceholder('Your password');
    }

    async fillNameInputField(name) {
        await test.step('Fill in Name', async () => {
            await this.nameInputField.fill(name);
        });
    }

    async fillEmailInputField(email) {
        await test.step('Fill in Email', async () => {
            await this.emailInputField.fill(email);
        });
    }

    async fillPasswordInputField(password) {
        await test.step('Fill in Password', async () => {
            await this.passwordInputField.fill(password);
        });
    }
}
