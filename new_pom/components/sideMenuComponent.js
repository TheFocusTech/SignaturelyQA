import {test} from "../../fixtures/base";
import {step} from "allure-js-commons";

export default class SideMenuComponent {
    constructor(page) {
        this.page = page;

        this.sign = this.page.getByRole('link', {name: 'Sign', exact: true});
        this.documents = this.page.getByRole('link', {name: 'Documents', exact: true});
        this.settings = this.page.locator('.sidebar__wrapper').getByText('Settings');
        this.templates = this.page.getByRole('link', { name: 'Templates', exact: true });   
        this.forms = this.page.getByRole('link', { name: 'Forms', exact: true });

    }

    async clickSign() {
        await test.step('Click on the Sign in Side Menu', async () => {
            await this.sign.click();
        });
    }

    async clickDocuments() {
        await this.documents.click();
    }

    async clickTemplates() {
        await this.templates.click();
    }

    async clickSettings() {
        await step("Click on the Settings in the Side menu", async () => {
            await this.settings.click();
        });
    }

    async clickForms() {
        await this.forms.click();
    }
}