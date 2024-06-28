import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemplatesComponent from "../../components/sideMenuTemplatesComponent";
import FileUploaderComponent from "../../components/fileUploaderComponent";
import CreateTemplateComponent from "../../components/createTemplateComponent";

export default class CreateNewTemplatePage {

    constructor(page) {
        this.page = page;
        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemplatesComponent(this.page);
        this.fileUploader = new FileUploaderComponent(this.page);
        this.createTemplate = new CreateTemplateComponent(this.page);
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

}
