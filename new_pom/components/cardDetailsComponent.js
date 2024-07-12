import { step } from 'allure-js-commons';

export default class CardDetailsComponent {
    constructor(page) {
        this.page = page;

        this.cardNumberField = this.page
            .frameLocator('[title="Secure card number input frame"]')
            .getByLabel('Card Number');
        this.expirationDateField = this.page
            .frameLocator('[title="Secure expiration date input frame"]')
            .getByLabel('Expiration');
        this.cvvField = this.page.frameLocator('[title="Secure CVC input frame"]').getByPlaceholder('123');
        this.cardholderNameField = this.page.getByPlaceholder('Your Name');
        this.zipField = this.page.getByPlaceholder('00000');
    }

    async fillData(cardDetails) {
        await step('Enter card details', async () => {
            await step('Fill in the "Card Number" input field', async () => {
                await this.cardNumberField.fill(cardDetails.cardNumber);
            });
            await step('Fill in the "Expiration Date" input field', async () => {
                await this.expirationDateField.fill(cardDetails.expirationDate);
            });
            await step('Fill in the "CVC" input field', async () => {
                await this.cvvField.fill(cardDetails.cvc);
            });
            await step('Fill in the "Full Name On Card" input field', async () => {
                await this.cardholderNameField.fill(cardDetails.fullNameOnCard);
            });
            await step('Fill in the "ZIP" input field', async () => {
                await this.zipField.fill(cardDetails.zip);
            });
        });
    }
}
