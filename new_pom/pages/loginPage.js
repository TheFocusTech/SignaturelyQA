export default class NewLoginPage {
    constructor(page) {
        this.page = page;

        this.emailAddressInput = this.page.getByPlaceholder('username@gmail.com');
        this.passwordInput = this.page.getByPlaceholder('Your password');
        this.loginBtn = this.page.getByRole('button', {name: 'Login'});      
    }

    async fillEmailAddressInput(email){
        await this.emailAddressInput.fill(email);
    }

    async fillPasswordInput(password) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginBtn.click();
    }
}