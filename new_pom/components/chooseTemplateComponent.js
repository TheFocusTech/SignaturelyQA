import { step } from 'allure-js-commons';

export default class ChooseTemplateComponent {
    constructor(page) {
        this.page = page;

        this.chooseTemplateDropdown = this.page.getByText('Choose a Template');       
        this.templateItem = this.page.locator('.uiSelect__select-row');
        this.signerNameField = this.page.getByPlaceholder('Name');
        this.signerEmailField = this.page.getByPlaceholder('Email');
        this.sendTheDocumentBtn = this.page.getByRole('button', {name: 'Send the Document'});
    }

    async clickChooseTemplateDropdown() {
        await step('Click on the "Choose Template" dropdown', async () => {
            await this.chooseTemplateDropdown.waitFor({ state: 'visible' });            
            await this.chooseTemplateDropdown.click({ force: true });
        });
    }

    async clickTemplateItem(title) {
        await step('Select the template from the dropdown', async () => {
            await this.templateItem.getByText(title).waitFor();
            await this.templateItem.getByText(title).click();
        });
    }
    
    async fillFirstSignerNameField(name) {
        await step('Fill the first signer\'s name field', async () => {
            await this.signerNameField.first().waitFor();
            await this.signerNameField.first().fill(name);
        });
    }
    
    async fillFirstSignerEmailField(email) {
        await step('Fill the first signer\'s email field', async () => {
            await this.signerEmailField.first().waitFor()
            await this.signerEmailField.first().fill(email);
        });
    }
    
    async clickSendTheDocumentBtn() {
        await step('Click the "Send Document" button', async () => {
            await this.sendTheDocumentBtn.waitFor();
            await this.sendTheDocumentBtn.click();
        });
    }
    
}