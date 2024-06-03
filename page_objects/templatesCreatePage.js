import { BUTTON_TEXT, CHOOSE_SIGNERS_FIELDS, PLACEHOLDER, SIGNERS_NAME, TEMPLATE_DOCUMENT_TITLE } from "../testData";
import path from 'path';
import TemplatesActivePage from "./templatesActivePage";
import SignPage from "./signPage";

class TemplatesCreatePage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getTemplateNamePlaceholder: () => this.page.getByPlaceholder(PLACEHOLDER.templateName),
        getTemplateRolePlaceholder: () => this.page.getByPlaceholder(PLACEHOLDER.role),
        getUploadFileButton: () => this.page.getByRole('button', { name: BUTTON_TEXT.uploadFile}),
        getFillTemplateButton: () => this.page.getByRole('button', { name: BUTTON_TEXT.fillTemplate}),
        getFieldBarSignLink: () => this.page.locator('interactModal__fieldBar-fieldItem interactModal__fieldBar-fieldItem--stroke').first(),
        getCreateButton: () => this.page.getByRole('button', { name: BUTTON_TEXT.create }),
        getBackToTemplatesButton: () => this.page.getByRole('button', { name: BUTTON_TEXT.backToTemplates}),
        getUploadFileButton: () => this.page.getByRole('button', {name: BUTTON_TEXT.uploadFile}),
        getFileInputField: () => this.page.locator('input[type = "file"]'),
        getMouseMove: () => this.page.mouse.move(125, 145),
    }

    async fillTemplateNamePlaceholder() {
        await this.locators.getTemplateNamePlaceholder().click().fill(TEMPLATE_DOCUMENT_TITLE.templateForOne);

        return this;
    }

    async fillTemplateRolePlaceholder() {
        await this.locators.getTemplateRolePlaceholder().fill(CHOOSE_SIGNERS_FIELDS.name1);

        return this;
    }

    async clickUploadFileButton(file) {
        await this.locators.getFileInputField().setInputFiles(file);

        return this;
    }
    
   async clickFillTemplateButton() {
    await this.locators.getFillTemplateButton().click();

    return this;
   }
   
   async clickFieldBarSignLink() {
    await this.locators.getFieldBarSignLink().click();

    return this;
   }

   async putSignPlace() {
    await this.locators.getMouseMove().click();

    return this;
   }

   async clickCreateButton() {
    await this.locators.getCreateButton().click();

    return this;
   }

   async clickBackToTemplatesButton() {
    await this.locators.getBackToTemplatesButton().click();

    return new TemplatesActivePage(this.page);
   }

}

export default TemplatesCreatePage;