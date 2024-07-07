import CardDetailsComponent from "../../components/cardDetailsComponent";
import SignUpYourInformationComponent from "../../components/signUpYourInformationComponent";
import {step} from "allure-js-commons";

export default class SignUpBusinessPage {
    constructor(page) {
        this.page = page;

        this.cardDetails = new CardDetailsComponent(this.page);
        this.yourInformation = new SignUpYourInformationComponent(this.page);

        this.businessPageLabelTitle = this.page.locator('.label-title');
        this.confirmCodeModal = this.page.locator('.ReactModalPortal').getByRole('dialog');
        this.purchaseNowBtn = this.page.getByRole('button', {name: 'Purchase now'});
        this.radioButtons = this.page.locator('.radio-button__wrapper');
    }

    async clickPurchaseNowButton() {
        await step('Click "Purchase Now" button', async () => {
            await this.purchaseNowBtn.click();
            await this.confirmCodeModal.waitFor();
        });
    }

    async clickSubscriptionButton(subscription) {
        await step(`Click ${subscription} radio button`, async () => {
            await this.radioButtons
                .filter({hasText: subscription})
                .click();
        })
    }
}
