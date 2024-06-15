export default class PrepareForSignatureModal {
    constructor(page) {
        this.page = page;

        this.signDocumentRadioBtn = this.page.getByText('Sign a Document', { exact: true });
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
        this.gotItBtn = this.page.getByRole('button', { name: 'Got it' });
        this.signFieldsItem = this.page.locator('.interactModal__fieldBar-fieldItem-icon').first();

    }

    async clickSignDocumentRadioBtn() {
        await this.signDocumentRadioBtn.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }

    async clickSignFieldsItem() {
        await this.signFieldsItem.click();
    }

    async clickGotItBtn() {
        await this.gotItBtn.click();
    }


}