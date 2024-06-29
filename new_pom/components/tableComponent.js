import { step } from 'allure-js-commons';

export default class TableComponent {
    constructor(page) {
        this.page = page;

        this.emptyTableHeader = this.page.locator('.empty-table__header');
        this.documentStatus = this.page.locator('.documents__documentStatus').first();
        this.optionsBtn = this.page.getByText('Options');
        this.editAndResendBtn = this.page.getByText('Edit & Resend');
        this.createAPIKeyBtn = this.page
            .locator('.documents__empty-table')
            .getByRole('button', { name: 'Create API key' });
        this.titleEditAndResendDocument = this.page.getByText('Edit & Resend document');
        this.addToAPIBtn = this.page.getByRole('button', { name: 'Add to API' });
        this.documentTitle = this.page.locator('.documents__list-item .table__column--text--document p');
        this.moveToBtn = this.page.getByRole('button', { name: 'Move to' });
        this.controlsPath = this.page.locator('.tableControls__path');
        this.sendReminderBtn = this.page.getByRole('button', { name: 'Send Reminder' });
        this.duplicateBtn = this.page.getByText('Duplicate');
        this.formsList = this.page.locator('div.table__dataRow');
        this.editBtn = this.page.getByRole('button', { name: 'Edit' });
    }

    async clickFirstOptionsBtn() {
        await step('Click the first "Options" button', async () => {
            await this.optionsBtn.first().waitFor();
            await this.optionsBtn.first().click();
        });
    }

    async clickSecondOptionsBtn() {
        await step('Click the second "Options" button', async () => {
            await this.optionsBtn.nth(1).waitFor();
            await this.optionsBtn.nth(1).click();
        });
    }

    async clickEditAndResendBtn() {
        await step('Click the "Edit & Resend" button', async () => {
            await this.editAndResendBtn.click();
        });
    }

    async clickCreateAPIKeyBtnInTable() {
        await this.createAPIKeyBtn.waitFor();
        await this.createAPIKeyBtn.click();
    }

    async clickAddToAPIBtn() {
        await step('Click the "Add to API" option', async () => {
            await this.addToAPIBtn.waitFor();
            await this.addToAPIBtn.click();
        });
    }

    async waitForDocumentTitleVisible(name) {
        await step(`Wait for the document title to be visible`, async () => {
            await this.documentTitle.filter({ hasText: name }).waitFor();
        });
    }

    async clickMoveToBtn() {
        await step('Click the "Move to" button', async () => {
            await this.moveToBtn.click();
        });
    }

    async openFolder(name) {
        await step('Open the folder', async () => {
            await this.documentTitle.filter({ hasText: name }).dblclick();
        });
    }

    async clickSendReminderBtn() {
        await this.sendReminderBtn.click();
    }

    async getDocumentStatusText() {
        const actualText = await this.documentStatus.textContent();
        return actualText;
    }

    async waitForDocumentStatusVisible(status) {
        await step(`Wait for ${status} status of the created document in the table.`, async () => {
            await this.documentStatus.getByText(status).waitFor({ state: 'visible' });
        });
    }

    async clickDuplicateBtn() {
        await step('Click the "Duplicate" button', async () => {
            await this.duplicateBtn.click();
            await this.duplicateBtn.click();
        });
    }

    async clickEditBtn() {
        await step('Click the "Edit" button', async () => {
            await this.editBtn.click();
        });
    }

    async getTemplateTitle() {
        let actualText;
        await step('Get template title', async () => {
            actualText = await this.documentTitle.textContent();
        });
        return actualText;
    }
}
