import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemlatesComponent from "../../components/sideMenuTemplatesComponent";
import FileUploaderComponent from "../../components/fileUploaderComponent";

export default class NewCreateTemplatePage {
    constructor(page) {
        this.page = page;
        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemlatesComponent (this.page);
        this.fileUploader = new FileUploaderComponent(this.page);
        this.templateNameField = this.page.getByPlaceholder('A template name to identify');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.createTemplateRolesField = this.page.getByPlaceholder('Role');
        this.fillTemlateBtn = this.page.getByRole('button', { name: 'Fill Template' });

    }


    async fillTemplateNameField(name) {
      await this.templateNameField.fill(name);
    }

      async fillOptionalMessageField(message) {
        await this.optionalMessageField.fill(message);
      }

      async fillCreateTemplateRolesField(role) {
        await this.createTemplateRolesField.fill(role);
      }

      async clickFillTemlateBtn() {
        await this.fillTemlateBtn.waitFor();
        await this.fillTemlateBtn.click();
      }

    }
