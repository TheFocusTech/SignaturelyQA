import {test} from "../../fixtures/base";

export default class NewLoginPage {
    constructor(page) {
        this.page = page;

        this.emailAddressInput = this.page.getByPlaceholder('username@gmail.com');
        this.passwordInput = this.page.getByPlaceholder('Your password');
        this.loginBtn = this.page.getByRole('button', {name: 'Login'});
    }

    async fillEmailAddressInput(email){
        await test.step('Fill in Email Address', async () => {
            await this.emailAddressInput.fill(email);
        });
    }

    async fillPasswordInput(password) {
        await test.step('Fill in Password', async () => {
            await this.passwordInput.fill(password);
        });
    }

    async clickLogin() {
        await test.step('Click on the Login Button', async () => {
            await this.loginBtn.click();
        });
    }
}