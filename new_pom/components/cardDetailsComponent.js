export default class CardDetailsComponent {
    constructor(page) {
        this.page = page;

        this.cardNumberField =  this.page.frameLocator('[title="Secure card number input frame"]').getByPlaceholder('1234 5678 9101 1129');
        this.expirationDateField =  this.page.frameLocator('[title="Secure expiration date input frame"]').getByLabel('Expiration');
        this.cvvField =  this.page.frameLocator('[title="Secure CVC input frame"]').getByPlaceholder('123');
        this.cardholderNameField = this.page.getByPlaceholder('Your Name');
        this.zipField = this.page.getByPlaceholder('00000');
    }

    async fillData(cardDetails) {
        await this.cardNumberField.fill(cardDetails.cardNumber);
        await this.expirationDateField.fill(cardDetails.expirationDate);
        await this.cvvField.fill(cardDetails.cvc);
        await this.cardholderNameField.fill(cardDetails.fullNameOnCard);
        await this.zipField.fill(cardDetails.zip)
    }
}