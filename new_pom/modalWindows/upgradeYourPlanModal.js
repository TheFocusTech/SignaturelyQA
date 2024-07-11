import CardDetailsComponent from "../components/cardDetailsComponent";
import { step } from "allure-js-commons";

export default class UpgradeYourPlanModal {
    constructor(page) {
        this.page = page;
        
        this.cardDetails = new CardDetailsComponent(this.page);

        this.suscribeButton = this.page.getByRole('button', {name: "Subscribe"});
    }

    async clickSubscribeButton() {
        await step('Click on "Subscribe" button', async () => {
            await this.suscribeButton.click();
        });
    }
}