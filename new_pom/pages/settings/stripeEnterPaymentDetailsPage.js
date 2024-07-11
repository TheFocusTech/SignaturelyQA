import {step} from "allure-js-commons";

export default class StripeEnterPaymentDetailsPage {
    constructor(page) {
        this.page = page;

        this.cardNumberFild = this.page.getByPlaceholder('1234 1234 1234');
        this.expirationDateFild = this.page.getByPlaceholder('MM / YY');
        this.cvcFild = this.page.getByPlaceholder('CVC');
        this.fullNameOnCardFild = this.page.getByPlaceholder('Full name on card');
        this.countryOrRegionOption = this.page.getByLabel('Country or region');
        this.zipFild = this.page.getByPlaceholder('ZIP');
        this.saveCardButton = this.page.getByTestId('hosted-payment-submit-button');
        this.saveMyInfoCheckbox = this.page.getByRole('checkbox');
        this.successCheckmark = this.page.locator('[class="Icon Icon--md Icon--white"]');
    }

    async attachCard(cardDetails) {
        await step('Attach the payment card throw the Stripe service', async () => {
            await step('Fill in the "Card Number" input field', async () => {
                await this.cardNumberFild.pressSequentially(cardDetails.cardNumber);
            });
            await step('Fill in the "Expiration Date" input field', async () => {
                await this.expirationDateFild.pressSequentially(cardDetails.expirationDate);
            });
            await step('Fill in the "CVC" input field', async () => {
                await this.cvcFild.pressSequentially(cardDetails.cvc);
            });
            await step('Fill in the "Full Name On Card" input field', async () => {
                await this.fullNameOnCardFild.pressSequentially(cardDetails.fullNameOnCard);
            });
            await step('Select the "Country or region" input field', async () => {
                await this.countryOrRegionOption.selectOption(cardDetails.countryOrRegion);
            });
            await step('Fill in the "ZIP" input field', async () => {
                await this.zipFild.fill(cardDetails.zip);
            });
            await step('Uncheck the "Save My Info" checkbox', async () => {
                await this.saveMyInfoCheckbox.uncheck();
            });
            await step('Click on "Save Card" button  ', async () => {
                await this.saveCardButton.click();
            });
            await this.successCheckmark.waitFor({timeout: 30000});
            await this.page.close();
        });
    }
}