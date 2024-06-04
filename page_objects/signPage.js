import DocumentsPage from "./documentsPage";
import SettingEditSignature from "./settingEditSignature";
import SettingsCompanyPage from "./settingsCompanyPage";

class SignPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
        getSettingsSidebarLink: () => this.page.getByRole('link', {name: 'Settings', exact: true}),
        getDocumentsSidebarLink: () => this.page.getByRole('link', {name: 'Documents', exact: true}),
        getUploadFileBtn: () => this.page.getByRole('button', {name: 'Upload File'}),
        getFileInputField: () => this.page.locator('input[type = "file"]'),
        getDocumentsDropdown: () => this.page.getByText('Documents', {exact: true}),
        getPrepareDocumentBtn: () => this.page.locator('div.wizardSignForm-createButton button'),
        getSendForSignatureRadioBtn: () => this.page.locator('div.radio-button__wrapper ').last(),
        getAddSignerBtn: () => this.page.locator('form.wizardSignForm__form p:nth-child(2)').first(),
        getChooseSignersNameField: () => this.page.locator('div.form__field .form__input').first(),
        getChooseSignersEmailField: () => this.page.locator('div.form__field .form__input').last(),
        getCustomSigningOrderCheckbox: () => this.page.locator('.uiCheckbox__inner'),
        getCustomSigningOrderPositionNumberOne: () => this.page.locator('span.signers__item-order-position').first(),
        getCustomSigningOrderPositionNumberTwo: () => this.page.locator('span.signers__item-order-position').last(),
        getCancelBtn: () => this.page.locator('.interactModal__header-send button.interactModal__header-cancelButton'),
        getContinueBtn: () => this.page.getByRole('button', {name: 'Continue'}),
        getSignModal: () => this.page.locator('//ul[@class="interactModal__fieldBar-fieldList"]/li[1]'),
        getSignPlace: () => this.page.locator('(//canvas[@class="react-pdf__Page__canvas"])[1]'),
        getSaveBtn: () => this.page.getByRole('button', {name: 'Save'}),
        getSendForSignatureBtn: () =>this.page.getByRole('button', {name: 'Send for Signature'}),
        getBackToDocumentsBtn: () =>this.page.getByRole('button', {name: 'Back to Documents'}),
        getDropDownUser: () => this.page.locator('.dropDownUser__wrapper'),
        getEditSignatureDropItem: () => this.page.getByRole('banner').getByRole('link', { name: 'Edit Signature' }),

    }

    async clickDocumentsSidebarLinkAndGoDocumentsPage() {
        await this.locators.getDocumentsSidebarLink().click();

        return new DocumentsPage(this.page);
    }
    async clickSettingsSidebarLinkAndGoSettingsCompanyPage(){
        await this.locators.getSettingsSidebarLink().click();

        return new SettingsCompanyPage(this.page);
    }
    async clickDocumentsDropdownAndGoDocumentsPage() { 
        await this.locators.getDocumentsDropdown().click();

        return new DocumentsPage(this.page);
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

        return new SignPage(this.page);
    }

    async clickContinueBtn() {
        await this.locators.getContinueBtn().click();
        
        return this;
    }
    
    async clickDropDownUser() {
        await this.locators.getDropDownUser().click();
        
        return this;
    }
        

    async clickSignModal() {
        await this.locators.getSignModal().click();

        return this;
    }

    async clickSignPlace() {
        await this.locators.getSignPlace().click();

        return this;
    }

    async clickSaveBtn() {
        await this.locators.getSaveBtn().click();

        return this;
    }
    async clickSendForSignatureBtn() {
        await this.locators.getSendForSignatureBtn().click();

        return this;
    }
    async clickBackToDocumentsBtnGoDocumentsPage() {
        await this.locators.getBackToDocumentsBtn().hover();
        await this.locators.getBackToDocumentsBtn().click();

        return new DocumentsPage(this.page);
   }
    async clickEditSignatureAndGoEditSignaturePage() {
        await this.locators.getEditSignatureDropItem().click();

        return new SettingEditSignature(this.page);

    }
}
export default SignPage;