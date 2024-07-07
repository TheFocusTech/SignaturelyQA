import { step } from 'allure-js-commons';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default class ChooseTemplateComponent {
    constructor(page) {
        this.page = page;

        this.chooseTemplateDropdown = this.page.locator('.uiSelect__select');
        this.signerNameField = this.page.getByPlaceholder('Name');
        this.signerEmailField = this.page.getByPlaceholder('Email');
        this.sendTheDocumentBtn = this.page.getByRole('button', { name: 'Send the Document' });

        this.chooseTemplateField = this.page.locator('div.uiSelect__select-inner ');
        this.titleTemplate = this.page.locator('p.uiSelect__select-row');

        this.editTemplateBtn = this.page.getByRole('button', { name: 'Edit template' });
    }

    async clickSendTheDocumentBtn() {
        await step('Click the "Send Document" button', async () => {
            await this.sendTheDocumentBtn.waitFor();
            await this.sendTheDocumentBtn.click();
        });
    }

    async clickChooseTemplateField() {
        await step('Click the "Choose a Template" field.', async () => {
            await this.chooseTemplateField.waitFor();
            await this.chooseTemplateField.hover();
            await delay(1000);
            await this.chooseTemplateField.click();
        });
    }

    async clickTitleTemplate() {
        await step('Click the "title template" row.', async () => {
            await this.titleTemplate.click();
        });
    }

    async fillSignerName(name, i) {
        await step("fill Signer's name in the field 'Name'", async () => {
            await this.signerNameField.nth(i).fill(name);
        });
    }

    async fillSignerEmail(email, i) {
        await step("fill Signer's email in the field 'Email' ", async () => {
            await this.signerEmailField.nth(i).fill(email);
        });
    }

    async clickEditTemplateBtn() {
        await step("Click the button 'Edit Template'", async () => {
            await this.editTemplateBtn.click();
        });
    }
}