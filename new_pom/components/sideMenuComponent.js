import { step } from "allure-js-commons";

export default class SideMenuComponent {
    constructor(page) {
        this.page = page;

        this.sign = this.page.getByRole('link', { name: 'Sign', exact: true });
        this.documents = this.page.getByRole('link', { name: 'Documents', exact: true });
        this.settings = this.page.getByRole('link', { name: 'Settings', exact: true });
        this.templates = this.page.getByRole('link', { name: 'Templates', exact: true });
        this.forms = this.page.getByRole('link', { name: 'Forms', exact: true });
        this.team = this.page.getByRole('link', { name: 'Team', exact: true });
    }

    async clickSign() {
        await step('Click on "Sign" item on the left SideMenu.', async () => {
            await this.sign.click();
        });
    }

    async clickDocuments() {
        await step('Click on "Documents" item on the left SideMenu.', async () => {
            await this.documents.click();
        });
    }

    async clickTemplates() {
        await step('Click on "Templates" item on the left SideMenu.', async () => {
            await this.templates.click();
        });
    }

    async clickSettings() {
        await step('Click on "Settings" item on the left SideMenu.', async () => {
            await this.settings.click();
        })
    }

    async clickForms() {
        await step('Click on "Forms" item on the left SideMenu.', async () => {
            await this.forms.click();
        });        
    }

    async clickTeam() {
        await step('Click on "Team" item on the left SideMenu.', async () => {
            await this.team.click();
        })
    }
}