import { step } from "allure-js-commons";
// 
export default class CreateTemplateComponent {
    constructor(page) {
        this.page = page;

        this.templateNameField = this.page.getByPlaceholder('A template name to identify');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.createTemplateRolesField = this.page.getByPlaceholder('Role');
        this.fillTemplateBtn = this.page.getByRole('button', { name: 'Fill Template' });
    }

    async fillTemplateNameField(name) {
        await step('Fill the Template Name input field', async () => {
            await this.templateNameField.fill(name);
        });
    }

    async fillOptionalMessageField(message) {
        await step('Fill the Optional Message input field', async () => {
            await this.optionalMessageField.fill(message);
        });
    }

    async fillCreateTemplateRolesField(role) {
        await step('Fill the Roles field', async () => {
            await this.createTemplateRolesField.fill(role);
        });
    }

    async clickFillTemplateBtn() {
        await step('Click the "Fill template" button', async () => {
            await this.fillTemplateBtn.waitFor();
            await this.fillTemplateBtn.click();
        })
    }
}