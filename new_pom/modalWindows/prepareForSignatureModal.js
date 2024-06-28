import ToastComponent from '../components/toastComponent';
import { clickCanvas } from '../../helpers/utils.js';
import { step } from 'allure-js-commons';

export default class PrepareForSignatureModal {
    constructor(page) {
        this.page = page;
        this.excludedAreas = [];

        this.toast = new ToastComponent(this.page);

        this.signDocumentRadioBtn = this.page.getByText('Sign a Document', { exact: true });
        this.signAndSendForSignatureRadioBtn = this.page.getByText('Sign & Send for Signature', { exact: true });
        this.sendForSignatureRadioBtn = this.page.getByText('Send for Signature', { exact: true });
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
        this.gotItBtn = this.page.getByRole('button', { name: 'Got it' });
        this.fieldsMenu = this.page.locator('.interactModal__fieldBar-fieldList');
        this.signFieldsItem = this.fieldsMenu.getByText('Sign');
        this.nameFieldsItem = this.fieldsMenu.getByText('Name');
        this.addSignerBtn = this.page.getByText('Add signer', { exact: true });
        this.signerNameField = this.page.getByPlaceholder('Name');
        this.signerEmailField = this.page.getByPlaceholder('Email');
        this.canvas = this.page.locator('canvas');
        this.assignedToDropDown = this.page.locator('ul .uiSelect__select');
        this.itemDropDown = this.page.locator('.uiSelect__search-item');
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
        this.signatureElement = this.page.locator('.documentPage .react-pdf__Page__canvas').last();
        this.createBtn = this.page.getByRole('button', { name: 'Create' });
        this.backToTempatesBtn = this.page.getByRole('button', { name: 'Back to Templates' });
        this.customSigningOrderCheckbox = this.page.locator('.uiCheckbox__inner');
        this.customSigningOrderPositionNumberOne = this.page.locator('span.signers__item-order-position').first();
        this.customSigningOrderPositionNumberTwo = this.page.locator('span.signers__item-order-position').last();
        this.addRecipientsBtn = this.page.getByText('Recipients', { exact: true });
        this.recipientEmailField = this.page.getByPlaceholder('test@signaturely.com');
        this.prepareForSigningTitle = this.page.getByRole('heading', { name: 'Prepare for Signing' });
        this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
        this.nameFieldItem = this.page.getByRole('complementary').getByText('Name', { exact: true });
        this.signFieldItem = this.page.getByRole('complementary').getByText('Sign', { exact: true });
        this.initialFieldItem = this.fieldsMenu.getByText('Initial');
        this.dateFieldItem = this.page.getByRole('complementary').getByText('Date', { exact: true });


    }

    async clickSignDocumentRadioBtn() {
        await this.signDocumentRadioBtn.waitFor({ state: 'visible' });
        await this.signDocumentRadioBtn.click();
    }

    async clickSignAndSendForSignatureRadioBtn() {
        await step('Select "Sign and Send for Signature" radio button', async () => {
            await this.signAndSendForSignatureRadioBtn.waitFor({ state: 'visible' });
            await this.signAndSendForSignatureRadioBtn.click();
        });
    }

    async clickSendForSignatureRadioBtn() {
        await step('Select the "Send for Signature" radio button.', async () => {
            await this.sendForSignatureRadioBtn.click();
        });
    }

    async clickContinueBtn() {
        await step('Click the "Continue" button.', async () => {
            await this.continueBtn.click();
        });
    }

    async clickSignFieldsItem() {
        await step('Click on the "Sign" in "Fields" menu', async () => {
            await this.signFieldsItem.waitFor();
            await this.signFieldsItem.click();
        });
    }

    async clickGotItBtn() {
        await step('Click the "Got it" button.', async () => {
            await this.gotItBtn.click();
        });
    }

    async clickAddSignerBtn() {
        await step('Click the "Add signer" button.', async () => {
            await this.addSignerBtn.click();
        });
    }

    async fillSignerNameField(name, i) {
        await step('Fill the name of the signer into the "Name" input field.', async () => {
            await this.signerNameField.nth(i).fill(name);
        });
    }

    async fillSignerEmailField(email, i) {
        await step('Fill the email address of the signer into the "Email" input field.', async () => {
            await this.signerEmailField.nth(i).fill(email);
        });
    }

    async doCanvasClicks() {
        await step('Click randomly inside the document', async () => {
            await clickCanvas(this.page, this.canvas, this.excludedAreas);
        });
    }

    async clickAssignedToDropDown() {
        await step('Click on the "Assigned To" dropdown.', async () => {
            await this.assignedToDropDown.waitFor();
            await this.assignedToDropDown.click();
        });
    }

    async clickItemDropDown(signerName) {
        await step('Select a signer\'s name from the "Assigned To" dropdown.', async () => {
            await this.itemDropDown.getByText(signerName).click();
        });
    }

    async clickSaveBtn() {
        await step('Click the "Save" button.', async () => {
            await this.saveBtn.click();
        });
    }

    async clickBackToTemplatesBtn() {
        await step('In the modal window, click on the "Back to templates" button.', async () => {
            await this.backToTempatesBtn.click();
        });
    }

    async clickCustomSigningOrderCheckbox() {
        await step('Click on the "Custom signing order" checkbox.', async () => {
            await this.customSigningOrderCheckbox.click();
        });
    }

    async clickAddRecipientsBtn() {
        await step('Click the "Recipients" button.', async () => {
            await this.addRecipientsBtn.click();
        });
    }

    async fillRecipientEmailField(email) {
        await step('Fill the email address of the viewer into the input field.', async () => {
            await this.recipientEmailField.fill(email);
        });
    }

    async getPrepareForSigningTitleText() {
        const actualText = await this.prepareForSigningTitle.textContent();
        return actualText
    }

    async clickSignFieldItem() {
        await step('Click on the "Sign" in "Fields" menu', async () => {
            await this.signFieldItem.waitFor({ state: 'visible' });
            await this.signFieldItem.click();
        });
    }

    async clickNameFieldItem() {
        await step('Click on the "Name" in "Fields" menu', async () => {
            await this.nameFieldItem.waitFor({ state: 'visible' });
            await this.nameFieldItem.click();
        });
    }

    async clickCreateBtn() {
        await step('Click the "Create" button.', async () => {
            await this.createBtn.click();

        });
    }

    async clickInitialFieldsItem() {
        await step('Click on the "Initial" in "Fields" menu', async () => {
            await this.initialFieldItem.click();
        });
    }

    async clickCancelBtn() {
        await step('Click the "Cancel" button.', async () => {
            await this.cancelBtn.click();
        });
    }

    async clickDateFieldItem() {
        await step('Click on the "Date" in "Fields" menu', async () => {
        await this.dateFieldItem.waitFor({ state: 'visible' });
        await this.dateFieldItem.click();
        });

    }
}