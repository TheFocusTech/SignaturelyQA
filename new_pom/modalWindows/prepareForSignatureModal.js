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
        this.nameFieldItem = this.page
            .locator('ul.interactModal__fieldBar-fieldList li')
            .filter({ hasText: /^Name$/ })
            .first();    
        this.initialFieldsItem = this.fieldsMenu.getByText('Initial');
    }

    async clickSignDocumentRadioBtn() {
        await this.signDocumentRadioBtn.waitFor({ state: 'visible' });
        await this.signDocumentRadioBtn.click();
    }

    async clickSignAndSendForSignatureRadioBtn() {
        await this.signAndSendForSignatureRadioBtn.waitFor({ state: 'visible' });
        await this.signAndSendForSignatureRadioBtn.click();
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
        await step('Select the "Sign" option from the left side menu', async () => {
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
        await this.assignedToDropDown.waitFor();
        await this.assignedToDropDown.click();
    }

    async clickItemDropDown(signerName) {
        await this.itemDropDown.getByText(signerName).click();
    }

    async clickSaveBtn() {
        await step('Click the "Save" button', async () => {
            await this.saveBtn.click();
        });
    }

    async clickCreateBtn() {
        try {
            await this.createBtn.click();
        } finally {
        }
    }

    async clickBackToTemplatesBtn() {
        try {
            await this.backToTempatesBtn.click();
        } finally {
        }
    }

    async clickCustomSigningOrderCheckbox() {
        await this.customSigningOrderCheckbox.click();
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

    async clickNameFieldItem() {
        await this.nameFieldItem.click();
    }

    async clickCreateBtn() {
        await this.createBtn.click();
    }

    async clickInitialFieldsItem() {
        await this.initialFieldsItem.click();
    }
}
