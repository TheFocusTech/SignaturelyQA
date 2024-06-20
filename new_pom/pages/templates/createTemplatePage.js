import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemlatesComponent from "../../components/sideMenuTemplatesComponent";

export default class NewCreateTemplatePage {
    constructor(page) {
        this.page = page;
        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemlatesComponent (this.page);
        this.templateNameField = this.page.getByPlaceholder('A template name to identify');
        this.optionalMessageField = this.page.getByPlaceholder('Add an optional message for');
        this.createTemplateRolesField = this.page.getByPlaceholder('Role');
        this.fillTemlateBtn = this.page.getByRole('button', { name: 'Fill Template' });

    }

    async fillTemplateNameField(name) {
        try {
          await this.templateNameField.fill(name);
        } finally {

        }
      }

      async fillOptionalMessageField(message) {
        try {
          await this.optionalMessageField.fill(message);
        } finally {

        }
      }

      async fillCreateTemplateRolesField(role) {
        try {
          await this.createTemplateRolesField.fill(role);
        } finally {

        }
      }

      async clickFillTemlateBtn() {
        await this.fillTemlateBtn.waitFor();
        await this.fillTemlateBtn.click();
      }

    }
