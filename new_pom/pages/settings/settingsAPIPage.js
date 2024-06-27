import ToastComponent from "../../components/toastComponent";
import TableComponent from "../../components/tableComponent";
import {step} from "allure-js-commons";

export default class NewSettingsAPIPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);
        this.table = new TableComponent(this.page)

        this.createAPIKeyBtnAtRight = this.page.locator('.team__header-container').getByRole('button', {name: 'Create API key'});
        this.billingDetailsField = this.page.getByPlaceholder('Enter billing details here');
        this.billingDetailsTextField = this.page.locator('.billing__details > form textarea');
    }

    async clickCreateAPIKeyBtnAtRight() {
        await step('Click on the "Create API key" button at the right', async () => {
            await this.createAPIKeyBtnAtRight.waitFor();
            await this.createAPIKeyBtnAtRight.click();
        });
    }

    async fillBillingDetailsField(text) {
        await step('Fill in the "Billing Details" field', async () => {
            await this.billingDetailsField.waitFor();
            await this.billingDetailsField.fill(text);
        });
    }

    async rightClickBillingDetailsField() {
        await step('Right click on the "Billing Details" field', async () => {
            await this.billingDetailsField.click({ button: 'right' });
        });
    }
}