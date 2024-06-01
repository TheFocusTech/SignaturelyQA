import DocumentsPage from "./documentsPage";
import TemplatesActivePage from "./templatesActivePage";

class SignPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
        getDocumentsSidebarLink: () => this.page.getByRole('link', {name: 'Documents', exact: true}),
        getUploadFileBtn: () => this.page.getByRole('button', {name: 'Upload File'}),
        getFileInputField: () => this.page.locator('input[type = "file"]'),
        getTemplateDropdown: () => this.page.getByText('Templates', {exact: true}),
    }

    async clickDocumentsSidebarLinkAndGoDocumentsPage() {
        await this.locators.getDocumentsSidebarLink().click();

        return new DocumentsPage(this.page);
    }

    async clickTemplateDropdownAndGoTemplatesActivePage() { 
        await this.locators.getTemplateDropdown().click();

        return new TemplatesActivePage(this.page);
    }
}
export default SignPage;