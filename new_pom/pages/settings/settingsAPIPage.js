import ToastComponent from "../../components/toastComponent";
import TableComponent from "../../components/tableComponent";
import {step} from "allure-js-commons";

export default class SettingsAPIPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);
        this.table = new TableComponent(this.page);

        this.createAPIKeyBtnAtRight = this.page.locator('.team__header-container').getByRole('button', {name: 'Create API key'});
        this.billingDetailsField = this.page.getByPlaceholder('Enter billing details here');
        this.billingDetailsTextField = this.page.locator('.billing__details > form textarea');
        this.apiPlansList = this.page.locator('.api-plan');
    }

    async clickCreateAPIKeyBtnAtRight() {
        await this.createAPIKeyBtnAtRight.waitFor();
        await this.createAPIKeyBtnAtRight.click();
    }

    async fillBillingDetailsField(text) {
        await this.billingDetailsField.waitFor();
        await this.billingDetailsField.fill(text);
    }

    async clickUpgradeButton(plan) {
        await step(`Click Upgrade button for ${plan} API plan`, async () => {
            await this.apiPlansList
                .filter({ hasText: plan })
                .getByRole('button', { name: "Upgrade" })
                .click();
        });
    }
}