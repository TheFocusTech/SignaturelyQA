import SpecialOfferUpsellModal from "./specialOfferUpsellModal.js";

class UpgradeYourPlanModal {
    constructor(page) {
        this.page = page;
    }

    locators = {        
        getCardNumberField: () => this.page.frameLocator('[title="Secure card number input frame"]').getByLabel('Card Number'),
        getExpirationDateField: () => this.page.frameLocator('[title="Secure expiration date input frame"]').getByLabel('Expiration'),
        getCVCField: () => this.page.frameLocator('[title="Secure CVC input frame"]').getByLabel('CVC'),
        getFullNameOnCard: () => this.page.getByPlaceholder('Your Name'),
        getZIPField: () => this.page.getByPlaceholder('00000'),
        getSubscribeBtn: () => this.page.getByRole('button', { name: 'Subscribe' })
    }

    async fillCreditCardData(cardNumber,expirationDate, cvc, fullNameOnCard, zip) {
        await this.locators.getCardNumberField().pressSequentially(cardNumber);
        await this.locators.getExpirationDateField().pressSequentially(expirationDate);
        await this.locators.getCVCField().pressSequentially(cvc);
        await this.locators.getFullNameOnCard().pressSequentially(fullNameOnCard);
        await this.locators.getZIPField().pressSequentially(zip)

        return this;
    }

    async clickSubscribeButtonAnGoToSpecialOfferUpsellModal() {
        await this.locators.getSubscribeBtn().click();

        return new SpecialOfferUpsellModal (this.page);
    }
}
export default UpgradeYourPlanModal;