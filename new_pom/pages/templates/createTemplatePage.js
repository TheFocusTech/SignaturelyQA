import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemplatesComponent from "../../components/sideMenuTemplatesComponent";
import FileUploaderComponent from "../../components/fileUploaderComponent";
import { step } from "allure-js-commons";

export default class NewCreateTemplatePage {

    constructor(page) {
        this.page = page;
        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemplatesComponent(this.page);
        this.fileUploader = new FileUploaderComponent(this.page);

        this.templateNameField = this.page.getByPlaceholder('A template name to identify');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.createTemplateRolesField = this.page.getByPlaceholder('Role');
        this.fillTemplateBtn = this.page.getByRole('button', { name: 'Fill Template' });
        this.deleteUploadedFileBtn = this.page.locator('button.button.cancel');

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

    async deleteUploadedFile() {
        await step('Delete uploaded file', async () => {
            await this.deleteUploadedFileBtn.waitFor({ state: 'visible' });
            await this.deleteUploadedFileBtn.hover();
            await this.deleteUploadedFileBtn.click({ force: true });
        })
    }
}
