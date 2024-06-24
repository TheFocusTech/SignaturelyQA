export default class TableComponent {

    constructor(page) {
        this.page = page;

        this.emptyTableHeader = this.page.locator('.empty-table__header');
        this.documentStatus = this.page.locator('.documents__documentStatus').first();
        this.optionsBtn = this.page.getByText('Options');
        this.editAndResendBtn = this.page.getByText('Edit & Resend');
        this.titleEditAndResendDocument = this.page.getByText('Edit & Resend document');
        this.createAPIKeyBtn = this.page.locator('.documents__empty-table').getByRole('button', { name: 'Create API key' });
        this.addToAPIBtn = this.page.getByRole('button', {name: 'Add to API'});
        this.documentTitle = this.page.locator('.documents__list-item .table__column--text--document p');
        this.moveToBtn = this.page.getByRole('button', { name: 'Move to' });
        this.controlsPath = this.page.locator('.tableControls__path');
        this.duplicateBtn = this.page.getByText('Duplicate');
    }

    async clickOptionsBtn(i) {
        await this.optionsBtn.nth(i).waitFor();
        await this.optionsBtn.nth(i).click();
    }

    async clickEditAndResendBtn() {
        await this.editAndResendBtn.click();
    }

    async getTitleText() {
        const actualText = await this.titleEditAndResendDocument.textContent();
        return actualText
    }

    async clickCreateAPIKeyBtnInTable() {
        await this.createAPIKeyBtn.waitFor();
        await this.createAPIKeyBtn.click();
    }
    
    async clickAddToAPIBtn() {
        await this.addToAPIBtn.waitFor();
        await this.addToAPIBtn.click();
    }
    async waitForDocumentTitleVisible(name) {
        await this.documentTitle.filter({ hasText: name }).waitFor({ state: 'visible' })
    }

    async clickMoveToBtn() {
        await this.moveToBtn.click();
    }

    async openFolder(name) { 
        await this.documentTitle.filter({ hasText: name }).dblclick();
    }
    
    async clickDuplicateBtn() {
        await this.duplicateBtn.click();
    }
}