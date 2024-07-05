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
        await step('Click "Name" dropdown.', async () => {
            await this.nameDropdown.click();
        });
    }

    async clickEmailDropdown() {
        await step('Click "Email" dropdown.', async () => {
            await this.emailDropdown.click();
        });
    }

    async selectNameOption() {
        await step('Select "Name" option.', async () => {
            await this.nameOption.waitFor({state: 'visible'});
            await this.nameOption.click();
        });
    }

    async selectEmailOption() {
        await step('Select "Email" option.', async () => {
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
        await step('Click the "Request Signatures" button.', async () => {
            await this.requestSignaturesBtn.click();
        });
    }
}
