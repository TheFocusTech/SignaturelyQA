

export default class CreateNewTemplateComponent {
    constructor(page) {
        this.page = page;

        this.templateNameField = this.page.locator('.form__input').first();
        this.optionalMessageField = this.page.locator('.form__input').nth(1);
        this.createTemplateRolesField = this.page.locator('.form__input').nth(2);
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

      async clickfillTemlateBtn() {
        await this.fillTemlateBtn.waitFor();
        await this.fillTemlateBtn.click();
      }

}