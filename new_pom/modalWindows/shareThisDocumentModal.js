export default class ShareThisDocumentModal {
    constructor(page) {
        this.page = page;

        this.textField = this.page.locator('.shareModal__form>ul>li .form__input-wrapper');
        this.inputEmailField = this.page.getByPlaceholder('test@signaturely.com');
        this.shareDocumentBtn = this.page.getByRole('button', {name: 'Share Document'});
    }

    async clickTextField() {
        await this.textField.click();
    }

    async clickInputEmailField(email) {
        await this.inputEmailField.fill(email);
    }

    async clickShareDocumentBtn() {
        await this.shareDocumentBtn.click();
    }
  };