import ButtonsComponent from "../components/buttonComponent";
import CanvasComponent from "../components/canvasComponent";
import ToastsComponent from "../components/toastsComponent";

export default class PrepareForSignatureModal {
    constructor(page) {
        this.page = page;
        this.buttons = new ButtonsComponent(this.page);
        this.canvas = new CanvasComponent(this.page);
        this.toasts = new ToastsComponent(this.page);

        this.signDocumentRadioBtn = this.page.getByText('Sign a Document', { exact: true });
        this.signAndSendForSignatureRadioBtn = this.page.getByText('Sign & Send for Signature', { exact: true });
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
        this.gotItBtn = this.page.getByRole('button', { name: 'Got it' });
        this.signFieldsItem = this.page.locator('.interactModal__fieldBar-fieldItem-icon').first();
        this.addSignerBtn = this.page.getByText('Add signer', { exact: true });
        this.addSignersNameField = this.page.getByRole('textbox', {name: 'Name'});
        this.addSignersEmailField = this.page.getByRole('textbox', {name: 'Email'});
    }

    async clickSignDocumentRadioBtn() {
        await this.signDocumentRadioBtn.waitFor({ state: 'visible' });
        await this.signDocumentRadioBtn.click();
    }

    async clickSignAndSendForSignatureRadioBtn() {
        await this.signAndSendForSignatureRadioBtn.waitFor({ state: 'visible' });
        await this.signAndSendForSignatureRadioBtn.click();
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
        await this.addSignerBtn.waitFor({ state: 'visible' });
        await this.addSignerBtn.click();
    }

    async fillAddSignersNameField(name, i) {
        await this.addSignersNameField.nth(i).fill(name);
    }

    async fillAddSignersEmailField(email, i) {
        await this.addSignersEmailField.nth(i).fill(email);
    }

    async doCanvasClicks() {
        const canvasLocator = await this.locators.getCanvas();
        await clickCanvas(this.page, canvasLocator, this.excludedAreas);
    }

}