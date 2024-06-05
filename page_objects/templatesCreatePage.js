import TemplatesActivePage from "./templatesActivePage";
import {CREATE_TEMPLATE} from "../testData"

class TemplatesCreatePage {
	constructor(page){
		 this.page = page;
	}

	locators = {
		 getTemplateNameField: () => this.page.getByPlaceholder('A template name to identify'),
		 getOptionalMessageField: () => this.page.getByPlaceholder('Add an optional message for'),
		 getCreateTemplateRolesField: () => this.page.getByPlaceholder('Role'),
		 getFillTemplateBtn: () => this.page.getByRole('button', { name: 'Fill Template' }),
		 getSignBtn: () => this.page.getByRole('complementary').getByText('Sign'),
		 getCreateBtn: () => this.page.getByRole('button', { name: 'Create' }),
		 getBackToTemplatesBtn: () => this.page.getByRole('button', { name: 'Back to Templates' }),
		 getPrepareForSigningHeader: () => this.page.getByRole('heading', { name: 'Prepare for Signing' }),
         getFileInputField: () => this.page.locator('input[type = "file"]'),

	}

	async fillTemplateNameField() {
	  await this.locators.getTemplateNameField().fill(CREATE_TEMPLATE.nameField);

	  return this;
	}

	async fillOptionalMessageField() {
		await this.locators.getOptionalMessageField().fill(CREATE_TEMPLATE.optionalMessage);

		return this;
	 }

	 async fillCreateTemplateRolesField() {
		await this.locators.getCreateTemplateRolesField().fill(CREATE_TEMPLATE.nameRole);

		return this;
	 }

	 async clickFillTemplateBtn() {
		await this.locators.getFillTemplateBtn().click();

		return this;
	 }

	 async clickSignBtn() {
		await this.locators.getSignBtn().click();

		return this;
	 }

	 async clickCreateBtn() {
		await this.locators.getCreateBtn().click();

		return this;
	 }

	 async clickBackToTemplatesBtn() {
		await this.locators.getBackToTemplatesBtn().click();

		return new TemplatesActivePage(this.page);
	 }

     clickUploadFileBtn(file) {
        this.locators.getFileInputField().setInputFiles(file);

        return this;
    }


}
export default TemplatesCreatePage;