import { step } from "allure-js-commons";

export default class CardDetailsComponent {
    constructor(page) {
        this.page = page;

        this.cardNumberField = this.page.frameLocator('[title="Secure card number input frame"]').getByLabel('Card Number');
        this.expirationDateField = this.page.frameLocator('[title="Secure expiration date input frame"]').getByLabel('Expiration');
        this.cvvField = this.page.frameLocator('[title="Secure CVC input frame"]').getByPlaceholder('123');
        this.cardholderNameField = this.page.getByPlaceholder('Your Name');
        this.zipField = this.page.getByPlaceholder('00000');
    }

    async fillData(cardDetails) {
        await step("Enter card details", async () => {
            await step("Enter card number", async () => {
                await this.cardNumberField.fill(cardDetails.cardNumber);
            });
            await step("Enter expiration date", async () => {
                await this.expirationDateField.fill(cardDetails.expirationDate);
            });
            await step("Enter CVC", async () => {
                await this.cvvField.fill(cardDetails.cvc);
            });
            await step("Enter Full Name", async () => {
                await this.cardholderNameField.fill(cardDetails.fullNameOnCard);
            });
            await step("Enter ZIP", async () => {
                await this.zipField.fill(cardDetails.zip)
            });
        });
    }
}