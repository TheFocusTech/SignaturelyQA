import CardDetailsComponent from "../components/cardDetailsComponent";

export default class SignUpPersonalPage {
    constructor(page) {
        this.page = page;

        this.cardDetails = new CardDetailsComponent(this.page);

        this.personalPageLabelTitle = this.page.locator('.label-title');
        this.nameInputField = this.page.getByPlaceholder('Full Name');
        this.emailInputField = this.page.getByPlaceholder('username@gmail.com');
        this.passwordInputField = this.page.getByPlaceholder('Your password');
        this.confirmCodeModal = this.page.locator('.ReactModalPortal').getByRole('dialog');
        this.purchaseNowBtn = this.page.getByRole('button', { name: 'Purchase now' });
        this.radioButtons = this.page.locator('.radio-button__wrapper');
    }

    async fillNameInputField(name) {
        await this.nameInputField.fill(name);
    }

    async fillEmailInputField(email) {
        await this.emailInputField.fill(email);
    }

    async fillPasswordInputField(password) {
        await this.passwordInputField.fill(password);
    }

    async clickPurchaseNowButton() {
        await this.purchaseNowBtn.click();
        await this.purchaseNowBtn.isHidden();
        await this.confirmCodeModal.waitFor();
    }

    async clickSubscriptionButton(subsription) {
        await this.radioButtons
            .filter({ hasText: subsription })
            .click();
        console.log(`Clicking subscription button: ${subsription}`);
    }
}