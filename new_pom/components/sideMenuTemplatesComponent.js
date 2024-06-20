
export default class SideMenuTemlatesComponent {
    constructor(page) {
        this.page = page;
        this.createTemplate = this.page.getByRole('link', { name: 'Create Template' });

    }

    async clickCreateTemplate() {
        await this.createTemplate.click();
    }
}