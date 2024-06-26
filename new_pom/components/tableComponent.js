import { test } from "../../fixtures/base";
import { step } from "allure-js-commons";

export default class TableComponent {

    constructor(page) {
        this.page = page;

        this.emptyTableHeader = this.page.locator('.empty-table__header');
        this.documentStatus = this.page.locator('.documents__documentStatus').first();
        this.optionsBtn = this.page.getByText('Options');
        this.editAndResendBtn = this.page.getByText('Edit & Resend');
        this.createAPIKeyBtn = this.page.locator('.documents__empty-table').getByRole('button', { name: 'Create API key' });
        this.titleEditAndResendDocument = this.page.getByText('Edit & Resend document');
        this.addToAPIBtn = this.page.getByRole('button', { name: 'Add to API' });
        this.documentTitle = this.page.locator('.documents__list-item .table__column--text--document p');
        this.moveToBtn = this.page.getByRole('button', { name: 'Move to' });
        this.controlsPath = this.page.locator('.tableControls__path');
        this.sendReminderBtn = this.page.getByRole('button', {name: 'Send Reminder'});
        //.documents__documentStatus-text
    }

    async clickOptionsBtn(i) {
        await step('Click the "Options" button', async () => {
            await this.optionsBtn.nth(i).waitFor();
            await this.optionsBtn.nth(i).click();
        });
    }

    async clickEditAndResendBtn() {
        await test.step('Click the "Edit & Resend" button', async () => {
            await this.editAndResendBtn.click();
        });
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
        await step('Click the "Move to" button', async () => {
            await this.moveToBtn.click();
        });
    }

    async openFolder(name) { 
        await step('Open the folder', async () => {
            await this.documentTitle.filter({ hasText: name }).dblclick();
        });
    }
    
    async clickOptionsButton() {
        await test.step('Click the "Options" button', async () => {
            await this.optionsBtn.waitFor();
            await this.optionsBtn.click();
        });
    }

    async clickSendReminderBtn() {
        await this.sendReminderBtn.click();
    }

    async getDocumentStatusText() {
        const actualText = await this.documentStatus.textContent();
        return actualText
    }
}