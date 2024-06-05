import DocumentsPage from "./documentsPage";
import SettingEditSignature from "./settingEditSignature";
import SettingsCompanyPage from "./settingsCompanyPage";
import { clickCanvas } from "../helpers/utils";

class SignPage {
    constructor(page){
        this.page = page;
        this.excludedAreas = [];
    }

    locators = {
        getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
        getSettingsSidebarLink: () => this.page.getByRole('link', {name: 'Settings', exact: true}),
        getDocumentsSidebarLink: () => this.page.getByRole('link', {name: 'Documents', exact: true}),
        getUploadFileBtn: () => this.page.getByRole('button', {name: 'Upload File'}),
        getFileInputField: () => this.page.locator('input[type = "file"]'),
        getPrepareDocumentBtn: () => this.page.locator('div.wizardSignForm-createButton button'),
        getSendForSignatureRadioBtn: () => this.page.locator('div.radio-button__wrapper ').last(),
        getAddSignerBtn: () => this.page.locator('form.wizardSignForm__form p:nth-child(2)').first(),
        getChooseSignersNameField: () => this.page.locator('div.form__field .form__input').first(),
        getChooseSignersEmailField: () => this.page.locator('div.form__field .form__input').last(),
        getCustomSigningOrderCheckbox: () => this.page.locator('.uiCheckbox__inner'),
        getCustomSigningOrderPositionNumberOne: () => this.page.locator('span.signers__item-order-position').first(),
        getCustomSigningOrderPositionNumberTwo: () => this.page.locator('span.signers__item-order-position').last(),
        getCancelBtn: () => this.page.locator('.interactModal__header-send button.interactModal__header-cancelButton'),
        getDropDownUser: () => this.page.locator('.dropDownUser__wrapper'),
        getEditSignatureDropItem: () => this.page.getByRole('banner').getByRole('link', { name: 'Edit Signature' }),
        getAddSignerSingAndSendBtn: () => this.page.getByRole('complementary').locator('div').filter({ hasText: 'Add signer' }).nth(4),
        getAddedSignersNameField: () => this.page.getByRole('textbox', {name: 'Name'}),
        getAddedSignersEmailField: () => this.page.getByRole('textbox', {name: 'Email'}),
        getSignAndSendForSignature: () => this.page.locator('div').getByText('Sign & Send for Signature', { exact: true }),
        getContinueBtn: () => this.page.getByRole('button', {name: 'Continue'}),
        getSignFieldsItem: () => this.page.locator('li').getByText('Sign'),
        getInitialFieldsItem: () => this.page.locator('li').getByText('Initial'),
        getCanvas: () => this.page.locator('canvas').first(),
        getFieldsOnPage: () => this.page.locator('.fieldDropDown'),
    }

    async clickDocumentsSidebarLinkAndGoDocumentsPage() {
        await this.locators.getDocumentsSidebarLink().click();

        return new DocumentsPage(this.page);
    }
    
    async clickSettingsSidebarLinkAndGoSettingsCompanyPage(){
        await this.locators.getSettingsSidebarLink().click();

        return new SettingsCompanyPage(this.page);
    }

    async clickUploadFileBtn(file) {
        await this.locators.getFileInputField().setInputFiles(file);

        return this;
    }

    async clickPrepareDocumentBtn() {
        await this.locators.getPrepareDocumentBtn().click();

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
    
    async clickDropDownUser() {
        await this.locators.getDropDownUser().click();

        return this;
    }

    async clickEditSignatureAndGoEditSignaturePage() {
        await this.locators.getEditSignatureDropItem().click();

        return new SettingEditSignature(this.page);
    }

    async clickAddSignerSingAndSendBtn() {
        await this.locators.getAddSignerSingAndSendBtn().click();

        return this;
    }

    async fillAddedSignersNameField(name) {
        await this.locators.getAddedSignersNameField().fill(name);

        return this;
    }

    async fillAddedSignersEmailField(email) {
        await this.locators.getAddedSignersEmailField().fill(email);

        return this;
    }

    async clickSignAndSendForSignature() {
        await this.locators.getSignAndSendForSignature().click();

        return this;
    }

    async clickContinueBtn() {
        await this.locators.getContinueBtn().click();

        return this;
    }

    async clickSignFieldsItem() {
        await this.locators.getSignFieldsItem().click();

        return this;
    }

    async clickInitialFieldsItem() {
        await this.locators.getInitialFieldsItem().click();

        return this;
    }

    async doCanvasClicks() {
        const canvasLocator = await this.locators.getCanvas();
        await clickCanvas(this.page, canvasLocator, this.excludedAreas);

        return this;
    }

    clearExcludedAreas() {
        this.excludedAreas = [];

        return this;
    }
}
export default SignPage;