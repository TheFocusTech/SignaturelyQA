
import {CREATE_TEMPLATE} from "../../testData"

export default class CreateNewTemplateComponent {
    constructor(page) {
        this.page = page;

        this.templateNameField = this.page.locator('.form__input').first();
        this.optionalMessageField = this.page.locator('.form__input').nth(1);
        this.createTemplateRolesField = this.page.locator('.form__input').nth(2);
        this.fillTemlateBtn = this.page.getByRole('button', { name: 'Fill Template' });


    }



    async fillTemplateNameField() {
        try {
          await this.templateNameField.fill(CREATE_TEMPLATE.nameField);
        } finally {

        }
      }


      async fillOptionalMessageField() {
        try {
          await this.optionalMessageField.fill(CREATE_TEMPLATE.optionalMessage);
        } finally {

        }
      }

      async fillCreateTemplateRolesField() {
        try {
          await this.createTemplateRolesField.fill(CREATE_TEMPLATE.nameRole);
        } finally {

        }
      }

      async clickfillTemlateBtn() {
        await this.fillTemlateBtn.waitFor();
        await this.fillTemlateBtn.click();
      }

}