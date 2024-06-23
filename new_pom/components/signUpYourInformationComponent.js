import {test} from "../../fixtures/base";

export default class SignUpYourInformationComponent {
    constructor(page) {
        this.page = page;

        this.nameInputField = this.page.getByPlaceholder('Full Name');
        this.emailInputField = this.page.getByPlaceholder('username@gmail.com');
        this.passwordInputField = this.page.getByPlaceholder('Your password');
    }

    async fillNameInputField(name) {
        await test.step(`Fill in Name with ${name}`, async () => {
            await this.nameInputField.fill(name);
        });
    }

    async fillEmailInputField(email) {
        await test.step(`Fill in Email with ${email}`, async () => {
            await this.emailInputField.fill(email);
        });
    }

    async fillPasswordInputField(password) {
        await test.step(`Fill in Password with ${password}`, async () => {
            await this.passwordInputField.fill(password);
        });
    }
}
