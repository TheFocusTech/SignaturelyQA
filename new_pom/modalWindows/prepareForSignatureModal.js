import ToastComponent from "../components/toastComponent";
import { clickCanvas } from "../../helpers/utils.js";

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
        this.signFieldsItem = this.page.locator('li').getByText('Sign');
        this.addSignerBtn = this.page.getByText('Add signer', { exact: true });
        this.signerNameField = this.page.getByPlaceholder('Name');
        this.signerEmailField = this.page.getByPlaceholder('Email');
        this.canvas = this.page.locator('canvas');
        this.assignedToDropDown = this.page.locator('.uiSelect__select').nth(1);
        this.meNowDropDownItem = this.page.getByText('Me (Now)', { exact: true });
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
         this.signatureElement = this.page.locator('.documentPage .react-pdf__Page__canvas').last();
         this.createBtn = this.page.getByRole('button', { name: 'Create' });
         this.backToTempatesBtn = this.page.getByRole('button', { name: 'Back to Templates' })
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
        await this.sendForSignatureRadioBtn.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }

    async clickSignFieldsItem() {
        await this.signFieldsItem.waitFor({ state: 'visible' });
        await this.signFieldsItem.click();
    }

    async clickGotItBtn() {
        await this.gotItBtn.click();
    }

    async clickAddSignerBtn() {
        await this.addSignerBtn.click();
    }

    async fillSignerNameField(name, i) {
        await this.signerNameField.nth(i).fill(name);
    }

    async fillSignerEmailField(email, i) {
        await this.signerEmailField.nth(i).fill(email);
    }

    async doCanvasClicks() {
        await clickCanvas(this.page, this.canvas, this.excludedAreas);
    }

    async clickAssignedToDropDown() {
        await this.assignedToDropDown.click();
    }

    async clickMeNowDropDownItem() {
        await this.meNowDropDownItem.click();
    }

    async clickSaveBtn() {
        await this.saveBtn.click();
    }



    async clickcreateBtn() {
        try {
            await this.createBtn.click();

        } finally {

        }
    }

    async clickbackToTempatesBtn() {
        try {
            await this.backToTempatesBtn.click();

        } finally {

        }
    }

}