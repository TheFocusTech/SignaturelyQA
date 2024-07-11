import { step } from "allure-js-commons";

export default class CreateUpdateFormComponent {
    constructor(page) {
        this.page = page;
       
        this.formNameField = this.page.getByPlaceholder('A form name to identify your');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.fillTemplateBtn = this.page.getByRole('button', { name: 'Fill Template' });
    }

    async fillFormNameField(name) {
        await step('Fill in "Form Name" input field.', async () => {
            await this.formNameField.fill(name);
        });
    }

    async fillOptionalMessageField(message) {
        await step('Fill in "Optional Message" input field.', async () => {
            await this.optionalMessageField.fill(message);
        });
    }

    async clickFillTemplateBtn() {
        await step('Click on "Fill Template" button.', async () => {
            await this.fillTemplateBtn.waitFor();
            await this.fillTemplateBtn.click();
        });
    }
}
