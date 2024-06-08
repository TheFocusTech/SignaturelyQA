import AbstractBaseSet from "./abstractBaseSet";
import SignPage from "./signPage";

class LoginPage extends AbstractBaseSet {
    constructor(page) {
        super(page);
        // this.page = page;
    // }

    this.locators = {
        ...this.locators,
        getEmailAddressInputField: () => this.page.getByPlaceholder('username@gmail.com'), 
        getPasswordInputField: () => this.page.getByPlaceholder('Your password'),        
        getLoginBtn: () => this.page.getByRole('button', {name: 'Login'}),
    }
}

    async fillEmailAddressInputField(email){
        await this.locators.getEmailAddressInputField().fill(email);

        return this;
    }

    async fillPasswordInputField(password) {
        await this.locators.getPasswordInputField().fill(password);

        return this;
    }

    async clickLoginAndGoSignPage() {
        await this.locators.getLoginBtn().click();

        return new SignPage(this.page);
    }
}
export default LoginPage;