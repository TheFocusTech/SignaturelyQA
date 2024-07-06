import { step } from 'allure-js-commons';
import { getRandomIndex } from '../../helpers/utils.js';

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
        this.objectTitle = this.page.locator('p.table__column');
        this.moveToBtn = this.page.getByRole('button', { name: 'Move to' });
        this.controlsPath = this.page.locator('.tableControls__path');
        this.sendReminderBtn = this.page.getByRole('button', { name: 'Send Reminder' });
        this.duplicateBtn = this.page.getByText('Duplicate');
        this.formsList = this.page.locator('div.table__dataRow');
        this.editBtn = this.page.getByRole('button', { name: 'Edit' });
        this.optionsDeleteBtn = this.page.getByRole('button', { name: 'Delete' });
        this.listElements = this.page.locator('.documents__list-container');
        this.renameBtn = this.page.getByRole('button', { name: 'Rename' });
        this.inputNameField = this.page.locator('.form__input--hidden');
        this.disableFormBtn = this.page.getByRole('button', { name: 'Disable Form' });
        this.enableFormBtn = this.page.getByRole('button', { name: 'Enable Form' });
        this.deleteForm = this.page.getByRole('button', { name: 'Delete Form' });
        this.shareBtn = this.page.getByRole('button', { name: 'Share' });
        this.objectCheckbox = this.page.locator('ul .uiCheckbox');
        this.documentsStatuses = this.page.locator('.documents__documentStatus');
        this.deleteBtn = this.page.getByRole('button', { name: 'Delete' });
        this.firstFormTitle = this.page.getByText('Edited Form Name');
        this.documentTitleList = this.page.locator('.table__column--text--document p');
        this.downloadBtn = this.page.getByText('Download');
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
            await this.objectTitle.filter({ hasText: name }).waitFor()
        });
    }

    async clickMoveToBtn() {
        await step('Click the "Move to" button', async () => {
            await this.moveToBtn.click();
        });
    }

    async openFolder(name) {
        await step('Open the folder', async () => {
            await this.objectTitle.filter({ hasText: name }).dblclick();
        });
    }

    async clickSendReminderBtn() {
        await step('Click the "Send Reminder" button', async () => {
            await this.sendReminderBtn.click();
        });
    }

    async getDocumentStatusText() {
        await this.documentStatus.waitFor({state:'visible', timeout: 3000});
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
        });
    }

    async clickEditBtn() {
        await step('Click the "Edit" button', async () => {
            await this.editBtn.click();
        });
    }

    async clickRenameBtn() {
        await step('Click the "Rename" button', async () => {
            await this.renameBtn.click();
        });
    }

    async fillInputNameField(name) {
        await step('Input new value', async () => {
            await this.inputNameField.fill(name);
        });
    }

    async pressEnterInputNameField() {
        await step('Input new value', async () => {
            await this.inputNameField.press('Enter');
        });
    }

    async getTitleFolder() {
        let actualNameFolder;
        await step('Get title folder', async () => {
            actualNameFolder = await this.objectTitle.textContent();
        });
        return actualNameFolder.trim();
    }

    async getTemplateTitle() {
        let actualText;
        await step('Get template title', async () => {
            actualText = await this.objectTitle.first().textContent();
        });
        return actualText;
    }

    async compareTitles() {
        let actualText;
        let actualSecondText;
        await step('Get template titles', async () => {
            actualText = await this.objectTitle.first().textContent();
            actualSecondText = await this.objectTitle.nth(1).textContent();
        });
        return actualText === actualSecondText;
    }

    async waitForDocumentStatus(page, expectedStatus) {
        await step('Wait for status of the document to update', async () => {
            await this.documentStatus.waitFor();
            let documentStatus = await this.documentStatus.textContent();

            while (documentStatus !== expectedStatus) {
                console.log(`The status of the document after creation is ${documentStatus}`);
                await page.reload();
                documentStatus = await this.documentStatus.textContent();
            }
        });
    }

    async clickDisableFormBtn() {
        await step('Click on "Disable Form" option', async () => {
            await this.disableFormBtn.click();
        });
    }

    async clickEnableFormBtn() {
        await step('Click on "Enable Form" option', async () => {
            await this.enableFormBtn.click();
        });
    }

    async clickDeleteForm() {
        await step('Click the "Delete Form" button', async () => {
            await this.deleteForm.click();
        });
    }

    async clickShareBtn() {
        await step('Click the "Share" button', async () => {
            await this.shareBtn.click();
        });
    }

    async clickOptionsDeleteBtn() {
        await step('Click the "Option delete" button it the dropdown menu', async () => {
            await this.optionsDeleteBtn.waitFor( {state: 'visible'});
            await this.optionsDeleteBtn.click();
        });
    }

    async getAllDocumentsTitles() {
        await this.objectTitle.first().waitFor({ state: 'visible' });
        const documentsTitles = await this.objectTitle.allInnerTexts();
        return documentsTitles;
    }

    async checkRandomDocuments() {
        return await step('Check two random documents and collect their titles', async () => {
            const documentsTitles = await this.getAllDocumentsTitles();
            const randomIndex = getRandomIndex(documentsTitles);            
            let documentsTitlesToDelete = [];
            const documentTitleToSave = await this.objectTitle.nth(randomIndex).innerText();
            for (let i = 0; i < documentsTitles.length; i++) {
                if (i !== randomIndex) {
                    const titleToDelete = await this.objectTitle.nth(i).innerText();
                    documentsTitlesToDelete.push(titleToDelete);
                    await this.objectCheckbox.nth(i).click();                   
                }
            }
            return {
                documentsToDelete: documentsTitlesToDelete,
                documentToSave: documentTitleToSave,
            };
        });
    }
  
    async waitForTable(time) {
        await this.page.waitForTimeout(time);
        await this.page.reload();
    }

    async clickDeleteBtn() {
        await step('Click on the "Delete" button', async () => {
            await this.deleteBtn.click();
        });
    }

    async clickOptionsButtonByDocumentTitle(documentTitle) {
        await step(`Click "Options" button for exact document by document title`, async () => {
            await this.page.waitForSelector('.table__column--text--document p', { timeout: 5000 });
            const documentTitleElementsCount = await this.documentTitleList.count(); 
                for (let i = 0; i < documentTitleElementsCount; i++) {
                    const elementText = await this.documentTitleList.nth(i).innerText();
                    if (elementText.trim() === documentTitle) {
                        await this.optionsBtn.nth(i).click();
                        return; 
                }
            }
        });
    }

    async clickDownloadBtn() {
        await step('Click on "Download" option', async () => {
            await this.downloadBtn.click();
        });
    }
}
