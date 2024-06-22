
export default class SideMenuTemlatesComponent {
    constructor(page) {
        this.page = page;
        this.createTemplate = this.page.getByRole('link', { name: 'Create Template' });
        this.apiTemplates = this.page.getByRole('link', { name: 'API Templates' });

    }

    async clickCreateTemplate() {
        await this.createTemplate.click();
    }

    async clickApiTemplates() {
        await this.apiTemplates.click();
    }
}