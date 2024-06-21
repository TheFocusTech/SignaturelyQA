import {allure} from "allure-playwright";

export default class SideMenuComponent {
    constructor(page) {
        this.page = page;

        this.sign = this.page.getByRole('link', {name: 'Sign', exact: true});
        this.documents = this.page.getByRole('link', {name: 'Documents', exact: true});
        this.settings = this.page.locator('.sidebar__wrapper').getByText('Settings');
        this.templates = this.page.getByRole('link', { name: 'Templates', exact: true });   
    }

    async clickSign() {
        await this.sign.click();
    }

    async clickDocuments() {
        await this.documents.click();
    }



    async clickTemplates() {
        await this.templates.click();
    }




    async clickSettings() {
        await allure.step("Click Settings", async () => {
            await this.settings.click();
        })
    }


    async clickSettings() {
        await this.settings.click();
    }

}