import { step } from 'allure-js-commons';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class ChooseTemplateComponent {
    constructor(page) {
        this.page = page;

        this.signerNameField = this.page.getByPlaceholder('Name');
        this.signerEmailField = this.page.getByPlaceholder('Email');
        this.sendTheDocumentBtn = this.page.getByRole('button', { name: 'Send the Document' });
        this.chooseTemplateField = this.page.locator('div.uiSelect__select-inner ');
        this.titleTemplate = this.page.locator('p.uiSelect__select-row');
        this.editTemplateBtn = this.page.getByRole('button', { name: 'Edit template' });
    }

    async clickSendTheDocumentBtn() {
        await step('Click on "Send Document" button', async () => {
            await this.sendTheDocumentBtn.waitFor();
            await this.sendTheDocumentBtn.click();
        });
    }

    async clickChooseTemplateField() {
        await step('Click on "Choose a Template" field.', async () => {
            await this.chooseTemplateField.waitFor();
            await this.chooseTemplateField.hover();
            await delay(1000);
            await this.chooseTemplateField.click();
        });
    }

    async clickTitleTemplate() {
        await step('Select the desired template from the dropdown list.', async () => {
            await this.titleTemplate.click();
        });
    }

    async fillSignerName(name, i) {
        await step("Fill in the signer's name in the 'Name' field", async () => {
            await this.signerNameField.nth(i).fill(name);
        });
    }

    async fillSignerEmail(email, i) {
        await step("Fill in the signer's name in the 'Email' field", async () => {
            await this.signerEmailField.nth(i).fill(email);
        });
    }

    async clickEditTemplateBtn() {
        await step('Click on "Edit Template" button', async () => {
            await this.editTemplateBtn.click();
        });
    }
}
