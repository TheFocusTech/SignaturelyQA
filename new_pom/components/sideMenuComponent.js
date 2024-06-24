import { test } from "../../fixtures/base";
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
        await this.sign.click();
    }

    async clickDocuments() {
        await test.step('Click the "Documents" item on the left SideMenu', async () => {
            await this.documents.click();
        });
    }

    async clickTemplates() {
        await this.templates.click();
    }

    async clickSettings() {
        await step("Click Settings", async () => {
            await this.settings.click();
        })
    }

    async clickForms() {
        await this.forms.click();
    }
}