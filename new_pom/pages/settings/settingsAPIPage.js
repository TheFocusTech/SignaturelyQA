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
        await step('Click on "Create API key" button at the right.', async () => {
            await this.createAPIKeyBtnAtRight.waitFor();
            await this.createAPIKeyBtnAtRight.click();
        });
    }

    async fillBillingDetailsField(text) {
        await step('Fill in "Billing Details" input field.', async () => {
            await this.billingDetailsField.waitFor();
            await this.billingDetailsField.fill(text);
        });
    }

    async clickUpgradeButton(plan) {
        await step(`Click on "Upgrade" button for ${plan} API plan.`, async () => {
            await this.apiPlansList.filter({ hasText: plan }).getByRole('button', { name: 'Upgrade' }).click();
        });
    }

    async pasteIntoBillingDetailsField() {
        await step('Paste into "Billing Details" input field with "Ctrl+V" shortcuts.', async () => {
            await this.billingDetailsTextField.click();

            await this.page.keyboard.down('Control');
            await this.page.keyboard.press('V');
            await this.page.keyboard.up('Control');
        });
    }
    
    async clickSelectButton(plan) {
        await step(`Click on "Select" button for ${plan} API plan to downgrade.`, async () => {
            await this.apiPlansList
                .filter({ hasText: plan })
                .getByRole('button', { name: "Select" })
                .click();
        });
    }
}