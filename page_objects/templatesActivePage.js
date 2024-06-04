import SignPage from "./signPage";
import TemplatesCreatePage from "./templatesCreatePage";

class TemplatesActivePage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getCreateTemplateLink: () => this.page.getByRole('link', { name: 'Create Template' }),

        getSelectOptionsBtn: () => this.page.getByRole('button', { name: 'Options' }),
        getDeleteBtn: () => this.page.getByRole('button', { name: 'Delete' }),
        getDeleteYesBtn: () => this.page.getByRole('button', { name: 'Yes, Delete' }),
        getToaster: () => this.page.locator('div').filter({ hasText: 'Document successfully saved!' }).nth(3),
        getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),


    }

    async clickCreateTemplateLink() {
        await this.locators.getCreateTemplateLink().click();

        return new TemplatesCreatePage(this.page);
    }


    async clickSelectOptionsBtn() {
        await this.locators.getSelectOptionsBtn().click();

        return this;
    }

    async clickDeleteBtn() {
        await this.locators.getDeleteBtn().click();

        return this;
    }

    async clickDeleteYesBtn() {
        await this.locators.getDeleteYesBtn().click();

        return this;
    }

    async clickSignSidebarLink() {
        await this.locators. getSignSidebarLink().click();

        return new SignPage(this.page);
    }







}
export default TemplatesActivePage;