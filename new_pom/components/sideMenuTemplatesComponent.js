import { step } from "allure-js-commons";

export default class SideMenuTemplatesComponent {
    constructor(page) {
        this.page = page;
        this.createTemplate = this.page.getByRole('link', { name: 'Create Template' });
        this.apiTemplates = this.page.getByRole('link', { name: 'API Templates' });

    }

    async clickCreateTemplate() {
        await step('Click the "Create Template" item on the Templates menu', async () => {
            await this.createTemplate.click();
        });
    }

    async clickApiTemplates() {
        await step('Click the "API Templates" item on the Templates menu', async () => {
            await this.apiTemplates.click();
        });
    }
}