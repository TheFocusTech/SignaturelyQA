import { title } from "process";
import DocumentsPage from "./documentsPage";
import SettingEditSignature from "./settingEditSignature";
import SettingsCompanyPage from "./settingsCompanyPage";

class SignPage {
    constructor(page) {
        this.page = page;
    }

    locators = {
        getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
        getSettingsSidebarLink: () => this.page.getByRole('link', { name: 'Settings', exact: true }),
        getDocumentsSidebarLink: () => this.page.getByRole('link', { name: 'Documents', exact: true }),
        getUploadFileBtn: () => this.page.getByRole('button', { name: 'Upload File' }),
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
        getPrepareForSigningTitle: () => this.page.getByText('Prepare for Signing'),
        getChooseSignersTitle: () => this.page.getByText('Choose Signers'),
        getContinueBtn: () => this.page.getByRole('button', { name: 'Continue' }),
        getSaveBtn: () => this.page.getByRole('button', { name: 'Save' }),
        getSignModal: () => this.page.locator('//ul[@class="interactModal__fieldBar-fieldList"]/li[1]'),
        getSignPlace: () => this.page.locator('(//canvas[@class="react-pdf__Page__canvas"])[1]'),
        getSendForSignatureButton: () => this.page.getByRole('button', { name: 'Send for Signature' }),
        getBackToDocumentsBtn: () => this.page.getByRole('button', { name: 'Back to Documents  ' }),
        getDocumentSavedAlert: () => this.page.getByText('Document successfully saved!'),
        getSaveAcopyDocumentmessage: () => this.page.getByText('Save a copy of your document'),
        getDocumentCreatedAlert: () => this.page.getByText('Document successfully saved!'),
        getSignNowBtn: () => this.page.getByRole('button', {name: 'Sign Now'}),
        getSignatureCreatedAlert: () => this.page.getByText('Signature created successfully'),
        getSignDocumentBtn: () => this.page.getByRole('button', {name: 'Sign Document'}),
    }

    async clickDocumentsSidebarLinkAndGoDocumentsPage() {
        await this.locators.getDocumentsSidebarLink().click();

        return new DocumentsPage(this.page);
    }

    async clickSettingsSidebarLinkAndGoSettingsCompanyPage() {
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
        await this.locators.getPrepareForSigningTitle().waitFor({ state: 'attached' });
        await this.locators.getSendForSignatureRadioBtn().click();

        return this;
    }

    async clickAddSignerBtn() {
        await this.locators.getChooseSignersTitle().waitFor({ state: 'attached' });
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

    async clickSignModal() {
        await this.locators.getSaveBtn().waitFor({ state: 'attached' });
        await this.locators.getSignModal().click();

        return this;
    }
    async clickSignPlace() {
        await this.locators.getSignPlace().click();

        return this;
    }

    async clickSaveBtn() {
        await this.locators.getSaveBtn().waitFor({ state: 'attached' });
        await this.locators.getSaveBtn().click();

        return this;
    }

    async clickContinueBtn() {
        await this.locators.getContinueBtn().waitFor({ state: 'attached' });
        await this.locators.getContinueBtn().click();

        return this;
    }

    async clickSendForSignatureButton() {
        await this.locators.getDocumentSavedAlert().waitFor({ state: 'hidden' });
        await this.locators.getSendForSignatureButton().click();

        return this;
    }
    async clickBackToDocumentsBtn() {
        await this.locators.getSaveAcopyDocumentmessage().waitFor({ status: 'attached' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.locators.getBackToDocumentsBtn().click();

        return new DocumentsPage(this.page);
    }

    async clickSignNowBtn() {
        await this.locators.getSignNowBtn().click();

        return this;
    }

    async clickSignDocumentBtn() {
        await this.locators.getSignDocumentBtn().click();

        return this;
    }

}
export default SignPage;