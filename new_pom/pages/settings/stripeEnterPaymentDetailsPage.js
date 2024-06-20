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

    async attachCard(cardDetails){
        await this.cardNumberFild.pressSequentially(cardDetails.cardNumber);
        await this.expirationDateFild.pressSequentially(cardDetails.expirationDate);
        await this.cvcFild.pressSequentially(cardDetails.cvc);
        await this.fullNameOnCardFild.pressSequentially(cardDetails.fullNameOnCard);
        await this.countryOrRegionOption.selectOption(cardDetails.countryOrRegion);
        await this.zipFild.fill(cardDetails.zip);
        await this.saveMyInfoCheckbox.uncheck();
        await this.saveCardButton.click();
        await this.successCheckmark.waitFor({ timeout: 30000 });
        await this.page.close();
    }
}