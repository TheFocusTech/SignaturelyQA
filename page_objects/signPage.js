import { MODULE_WINDOW_BUTTON, MODULE_WINDOW_TEXT,  BUTTON_TEXT, PLACEHOLDER, TEMPLATE_DOCUMENT_TITLE } from "../testData";
import DocumentsPage from "./documentsPage";
import TemplatesActivePage from "./templatesActivePage";

class SignPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
        getDocumentsSidebarLink: () => this.page.getByRole('link', {name: 'Documents', exact: true}),
        getUploadFileBtn: () => this.page.getByRole('button', {name: 'Upload File'}),
        getFileInputField: () => this.page.locator('input[type = "file"]'),
        getTemplateDropdown: () => this.page.getByText('Templates', {exact: true}),
        getPrepareDocumentBtn: () => this.page.locator('div.wizardSignForm-createButton button'),
        getSendForSignatureRadioBtn: () => this.page.locator('div.radio-button__wrapper ').last(),
        getAddSignerBtn: () => this.page.locator('form.wizardSignForm__form p:nth-child(2)').first(),
        getChooseSignersNameField: () => this.page.locator('div.form__field .form__input').first(),
        getChooseSignersEmailField: () => this.page.locator('div.form__field .form__input').last(),
        getCustomSigningOrderCheckbox: () => this.page.locator('.uiCheckbox__inner'),
        getCustomSigningOrderPositionNumberOne: () => this.page.locator('span.signers__item-order-position').first(),
        getCustomSigningOrderPositionNumberTwo: () => this.page.locator('span.signers__item-order-position').last(),
        getCancelBtn: () => this.page.locator('.interactModal__header-send button.interactModal__header-cancelButton'),
        getChooseATemplateArrow: () => this.page.locator('.uiSelect__select-arrow'),
        getSelectTemplateForOne: () => this.page.getByText(TEMPLATE_DOCUMENT_TITLE.templateForOne),
        getNameInputField: () => this.page.getByPlaceholder(PLACEHOLDER.name),
        getSendTheDocumentButton: () => this.page.getByRole('button', { name: BUTTON_TEXT.sendTheDocument }),
        getSendForSignatureButton: () => this.page.locator('button[type="submit"] p.button__text'),
        getModalWindowText: () => this.page.getByText(MODULE_WINDOW_TEXT.saveACopy).waitFor(),
        getBackToDocumentsButton: () => this.page.getByRole('button', {name: MODULE_WINDOW_BUTTON.backToDocuments}),  
    }

    async clickDocumentsSidebarLinkAndGoDocumentsPage() {
        await this.locators.getDocumentsSidebarLink().click();

        return new DocumentsPage(this.page);
    }

    async clickTemplateDropdownAndGoTemplatesActivePage() { 
        await this.locators.getTemplateDropdown().click();

        return new TemplatesActivePage(this.page);
    }
    clickUploadFileBtn(file) {
        this.locators.getFileInputField().setInputFiles(file);

        return this;
    }
    clickPrepareDocumentBtn() {
        this.locators.getPrepareDocumentBtn().click();

        return this;
    }
    async clickSignSidebarLinkAndGoSignPage() {
        await this.locators.getSignSidebarLink().click();
    }
    async clickSendForSignatureRadioBtn() {
        await this.locators.getSendForSignatureRadioBtn().click();

        return this;
    }
    async clickAddSignerBtn() {
        await this.locators.getAddSignerBtn().click();

        return this;
    }
    async fillChooseSignersNameField(name) {
        await this.locators.getChooseSignersNameField().fill(name);

        return this;
    }
    async fillChooseSignersEmailField(email) {
        await this.locators.getChooseSignersEmailField().fill(email);

        return this;
    }
    async clickCustomSigningOrderCheckbox() {
        await this.locators.getCustomSigningOrderCheckbox().click();

        return this;
    }
    async clickCancelBtnAndDeleteDocument() {
        await this.locators.getCancelBtn().click();

        return this;
    }

    async clickChooseATemplateArrow() {
        await this.locators.getChooseATemplateArrow().click();

        return this;
    }

    async clickSelectTemplateForOne() {
        await this.locators.getSelectTemplateForOne().scrollIntoViewIfNeeded()
        await this.locators.getSelectTemplateForOne().click();

        return this;
    }

    async clickNameInputField() {
        await this.locators.getNameInputField().click();
        
        return this;
    }

    async fillNameInputField(signersName) {
        await this.locators.getNameInputField().fill(signersName);
     
        return this;
    }

    async clickSendTheDocumentButton() {
        await this.locators.getSendTheDocumentButton().click();

        return this;
    }

    async clickSendForSignatureButton() {
        await this.locators.getSendForSignatureButton().click();

        return this;
    }

    async clickBackToDocumentsButton() {
        await this.locators.getBackToDocumentsButton().click();

        return new DocumentsPage(this.page);
    }
}
export default SignPage;