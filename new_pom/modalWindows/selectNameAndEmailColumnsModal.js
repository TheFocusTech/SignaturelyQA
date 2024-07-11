import { step } from 'allure-js-commons';

export default class SelectNameAndEmailColumnsModal {
    constructor(page) {
        this.page = page;

        this.nameDropdown = this.page.locator('p.uiSelect__select-placeholder').getByText('Name');
        this.emailDropdown = this.page.locator('p.uiSelect__select-placeholder').filter({ hasText: 'Email' })
        this.nameOption = this.page.locator('p.uiSelect__select-row').filter({ hasText: 'Name' });
        this.emailOption = this.page.locator('p.uiSelect__select-row').filter({ hasText: 'Email' });
        this.requestSignaturesBtn = this.page.getByRole('button', { name: 'Request Signatures' });
    }

    async clickNameDropdown() {
        await step('Click on "Name" dropdown.', async () => {
            await this.nameDropdown.click();
        });
    }

    async clickEmailDropdown() {
        await step('Click on "Email" dropdown.', async () => {
            await this.emailDropdown.click();
        });
    }

    async selectNameOption() {
        await step('Open "Name" dropdown.', async () => {
            await this.nameOption.waitFor({state: 'visible'});
            await this.nameOption.click();
        });
    }

    async selectEmailOption() {
        await step('Open "Email" dropdown.', async () => {
            await this.emailOption.waitFor({state: 'visible'});
            await this.emailOption.click();
        });
    }

    async selectColumnName() {
        await step('Select "Name" for the Name column.', async() => {
            await this.clickNameDropdown();
            await this.selectNameOption();
        });
    }

    async selectColumnEmail() {
        await step('Select "Email" for the Email column.', async() => {
            await this.clickEmailDropdown();
            await this.selectEmailOption();
        });
    }

    async clickRequestSignaturesBtn() {
        await step('Click on "Request Signatures" button.', async () => {
            await this.requestSignaturesBtn.click();
        });
    }
}
