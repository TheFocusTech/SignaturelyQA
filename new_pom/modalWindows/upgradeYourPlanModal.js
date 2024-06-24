import CardDetailsComponent from "../components/cardDetailsComponent";

export default class UpgradeYourPlanModal {
    constructor(page) {
        this.page = page;
        
        this.cardDetails = new CardDetailsComponent(this.page);

        this.suscribeButton = this.page.getByRole('button', {name: "Subscribe"});
    }

    async clickSubscribeButton() {
        await this.suscribeButton.click();
    }
}