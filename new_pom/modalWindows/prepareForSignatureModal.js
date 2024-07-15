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
        this.signOnFieldsMenu = this.fieldsMenu.getByText('Sign');
        this.nameOnFieldsMenu = this.fieldsMenu.getByText('Name');
        this.initialOnFieldsMenu = this.fieldsMenu.getByText('Initial');
        this.dateOnFieldsMenu = this.fieldsMenu.getByText('Date');
        this.addSignerBtn = this.page.getByText('Add signer', { exact: true });
        this.signerNameField = this.page.getByPlaceholder('Name');
        this.signerEmailField = this.page.getByPlaceholder('Email');
        this.canvas = this.page.locator('canvas');
        this.assignedToDropDown = this.page.locator('ul .uiSelect__select');
        this.itemDropDown = this.page.locator('.uiSelect__search-item');
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
        this.signatureElement = this.page.locator('.documentPage .react-pdf__Page__canvas').last();
        this.createBtn = this.page.getByRole('button', { name: 'Create' });
        this.customSigningOrderCheckbox = this.page.locator('.uiCheckbox__inner');
        this.customSigningOrderPositionNumberOne = this.page.locator('span.signers__item-order-position').first();
        this.customSigningOrderPositionNumberTwo = this.page.locator('span.signers__item-order-position').last();
        this.addRecipientsBtn = this.page.getByText('Recipients', { exact: true });
        this.recipientEmailField = this.page.getByPlaceholder('test@signaturely.com');
        this.prepareForSigningTitle = this.page.getByRole('heading', { name: 'Prepare for Signing' });
        this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
        this.documentPage = this.page.locator('.documentPage__inner');
        this.dateStampedOnDocument = this.page.locator(
            'input.fieldDropDown__trigger-date-input:not(fieldDropDown__trigger--disabled)'
        );
        this.dateOnLeftMenu = this.page.locator('.interactModal__fieldBar-selectField-item-label');
    }

    async clickSignDocumentRadioBtn() {
        await step('Select "Sign Document" radio button.', async () => {
            await this.signDocumentRadioBtn.waitFor({ state: 'visible' });
            await this.signDocumentRadioBtn.click();
        });
    }

    async clickSignAndSendForSignatureRadioBtn() {
        await step('Select "Sign and Send for Signature" radio button.', async () => {
            await this.signAndSendForSignatureRadioBtn.waitFor({ state: 'visible' });
            await this.signAndSendForSignatureRadioBtn.click();
        });
    }

    async clickSendForSignatureRadioBtn() {
        await step('Select "Send for Signature" radio button.', async () => {
            await this.sendForSignatureRadioBtn.click();
        });
    }

    async clickContinueBtn() {
        await step('Click on "Continue" button.', async () => {
            await this.continueBtn.click();
        });
    }

    async clickSignOnFieldsMenu() {
        await step('Click on "Sign" in "Fields" menu.', async () => {
            await this.signOnFieldsMenu.waitFor({ state: 'visible' });
            await this.signOnFieldsMenu.click();
        });
    }

    async clickGotItBtn() {
        await step('Click on "Got it" button.', async () => {
            await this.gotItBtn.click();
        });
    }

    async clickAddSignerBtn() {
        await step('Click on "Add signer" button.', async () => {
            await this.addSignerBtn.click();
        });
    }

    async fillSignerNameField(name, i) {
        await step('Fill in "Name" input field.', async () => {
            await this.signerNameField.nth(i).fill(name);
        });
    }

    async fillSignerEmailField(email, i) {
        await step('Fill in "Email" input field.', async () => {
            await this.signerEmailField.nth(i).fill(email);
        });
    }

    async clickDocumentBody() {
        await step('Click randomly inside the document.', async () => {
            await clickCanvas(this.page, this.canvas, this.excludedAreas);
        });
    }

    async clickAssignedToDropDown() {
        await step('Click on "Assigned To" dropdown.', async () => {
            await this.assignedToDropDown.waitFor();
            await this.assignedToDropDown.click();
        });
    }

    async clickItemDropDown(signerName) {
        await step("Select signer's name from the 'Assigned To' dropdown.", async () => {
            await this.itemDropDown.getByText(signerName).waitFor();
            await this.itemDropDown.getByText(signerName).click();
        });
    }

    async clickSaveBtn() {
        await step('Click on "Save" button.', async () => {
            await this.saveBtn.click();
        });
    }

    async clickCustomSigningOrderCheckbox() {
        await step('Click on "Custom signing order" checkbox.', async () => {
            await this.customSigningOrderCheckbox.click();
        });
    }

    async clickAddRecipientsBtn() {
        await step('Click on "Recipients" button.', async () => {
            await this.addRecipientsBtn.click();
        });
    }

    async fillRecipientEmailField(email) {
        await step('Fill in "Recipient" input field.', async () => {
            await this.recipientEmailField.fill(email);
        });
    }

    async getPrepareForSigningTitleText() {
        let actualText;
        await step('Get text title.', async () => {
            actualText = await this.prepareForSigningTitle.textContent();
        });
        return actualText;
    }

    async clickNameOnFieldsMenu() {
        await step('Click on "Name" in "Fields" menu.', async () => {
            await this.nameOnFieldsMenu.waitFor({ state: 'visible' });
            await this.nameOnFieldsMenu.click();
        });
    }

    async clickCreateBtn() {
        await step('Click on "Create" button.', async () => {
            await this.createBtn.click();
        });
    }

    async clickInitialOnFieldsMenu() {
        await step('Click on "Initial" in "Fields" menu.', async () => {
            await this.initialOnFieldsMenu.waitFor({ state: 'visible' });
            await this.initialOnFieldsMenu.click();
        });
    }

    async clickCancelBtn() {
        await step('Click on "Cancel" button.', async () => {
            await this.cancelBtn.click();
        });
    }

    async clickDateOnFieldsMenu() {
        await step('Click on "Date" in "Fields" menu.', async () => {
            await this.dateOnFieldsMenu.waitFor({ state: 'visible' });
            await this.dateOnFieldsMenu.click();
        });
    }
    async waitDocumentSection() {
        await step('Wait for the "document section" element to loaded.', async () => {
            await this.documentPage.first().waitFor({ state: 'visible' });
        });
    }

    async setSignFieldOnDocument() {
        await step('Set "Sign" field on document.', async () => {
            await this.canvas.first().waitFor(5000);
            let coordinates = 0;
            let retries = 5;
            while (retries !== 0) {
                await step('Click randomly inside the document.', async () => {
                    await this.signOnFieldsMenu.click();
                    coordinates = await clickCanvas(this.page, this.canvas, this.excludedAreas);
                    coordinates === 0 ? retries-- : (retries = 0);
                });
            }
            if (coordinates === 0) {
                await step('Error: Test precondition fail.', async () => {
                    console.error('Error: Test precondition fail.');
                });
            }
        });
    }

    async clickDateOnLeftMenu() {
        await step('Click on "Date" in left submenu.', async () => {
            await this.dateOnLeftMenu.waitFor({ state: 'visible' });
            await this.dateOnLeftMenu.click();
        });
    }
}