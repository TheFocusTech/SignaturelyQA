import ToastComponent from "../../components/toastComponent";

export default class NewSettingsAPIPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.createAPIKeyButtonAtRight = this.page.locator('.team__header-container').getByRole('button', {name: 'Create API key'});
        this.billingDetailsField = this.page.getByPlaceholder('Enter billing details here');
        this.billingDetailsTextField = this.page.locator('.billing__details > form textarea');
    }

    async clickCreateAPIKeyButtonAtRight() {
        await this.createAPIKeyButtonAtRight.waitFor();
        await this.createAPIKeyButtonAtRight.click();
    }

    async fillBillingDetailsField(text) {
        await this.billingDetailsField.waitFor();
        await this.billingDetailsField.fill(text);
    }

}