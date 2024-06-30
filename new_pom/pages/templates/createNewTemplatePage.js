import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemplatesComponent from "../../components/sideMenuTemplatesComponent";
import FileUploaderComponent from "../../components/fileUploaderComponent";
import CreateTemplateComponent from "../../components/createTemplateComponent";
import { step } from "allure-js-commons";

export default class CreateNewTemplatePage {

    constructor(page) {
        this.page = page;
        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemplatesComponent(this.page);
        this.fileUploader = new FileUploaderComponent(this.page);
        this.createTemplate = new CreateTemplateComponent(this.page);

        this.templateNameField = this.page.getByPlaceholder('A template name to identify');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.createTemplateRolesField = this.page.getByPlaceholder('Role');
        this.fillTemplateBtn = this.page.getByRole('button', { name: 'Fill Template' });
        this.addRoleBtn = this.page.getByText('Add Role');
    }
    async fillTemplateNameField(name) {
        await step('Fill in the "Template Name" field', async () => {
            await this.templateNameField.fill(name);
        });
    }

    async fillOptionalMessageField(message) {
        await step('Fill in the "Optional Message" field', async () => {
            await this.optionalMessageField.fill(message);
        });
    }

    async fillCreateTemplateRolesField(role) {
        await step('Fill in the "Role" field', async () => {
            await this.createTemplateRolesField.fill(role);
        });
    }

    async clickFillTemplateBtn() {
        await step('Click on the "Fill template" button', async () => {
            await this.fillTemplateBtn.waitFor();
            await this.fillTemplateBtn.click();
        });
    }

    async clickAddRoleBtn() {
        await step('Click on the "Add Role" button', async () => {
            await this.addRoleBtn.click();
        });
    }

    async fillCreateTemplateSecondRolesField(role) {
        await step('Fill in the "Role" second field', async () => {
            await this.createTemplateRolesField.nth(1).fill(role);
        });
    }

}
