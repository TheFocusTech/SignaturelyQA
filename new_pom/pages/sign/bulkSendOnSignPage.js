import FileUploaderComponent from '../../components/fileUploaderComponent';
import { step } from 'allure-js-commons';
import ToastComponent from "../../components/toastComponent";
import {CREATE_TEMPLATE} from "../../../testData";

export default class BulkSendOnSignPage {
    constructor(page) {
        this.page = page;
        this.fileUploader = new FileUploaderComponent(this.page);
        this.toast = new ToastComponent(this.page);

        this.chooseATemplateDropdown = this.page.getByText('Choose a Template');
        this.templateOption = this.page.locator('p.uiSelect__select-row');
        this.selectColumnsBtn = this.page.getByRole('button', { name: 'Select Columns' });
    }

    async clickChooseATemplateDropdown() {
        await step('Click the "Choose a Template" dropdown.', async () => {
            await this.chooseATemplateDropdown.waitFor();
            await this.chooseATemplateDropdown.click();
        })
    }

    async selectTemplateOption() {
        await step(`Select the template with the "${CREATE_TEMPLATE.nameField}" title.`, async () => {
            await this.templateOption.first().waitFor({ state: 'visible' });
            await this.templateOption.first().click();
        })
    }

    async selectTemplate() {
        await step('Select the available template.', async () => {
            await this.clickChooseATemplateDropdown();
            await this.selectTemplateOption();
        });
    }

    async clickSelectColumnsBtn() {
        await step('Click the "Select Columns" button.', async () => {
            await this.selectColumnsBtn.click();
        });
    }
}