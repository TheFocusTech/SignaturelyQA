import CardDetailsComponent from "../components/cardDetailsComponent";
import {URL_END_POINTS} from "../../testData";

export default class ActivateTrialStripePage {
    constructor(page) {
        this.page = page;
        this.cardDetails = new CardDetailsComponent(this.page);

        this.userHeaderName = this.page.locator('.dropDownUser__trigger-name');
        this.billingInfoHeader = this.page.locator('.sign-up-second-step__billing-info h3');
        this.freeTrialStatement = this.page.locator('.sign-up-second-step__title');
        this.startMy7DayFreeTrialBtn = this.page.getByRole('button', {name: "Start My 7-day Free Trial", exact: true});
    }

    async clickStartMy7DayFreeTrialBtn() {
        await this.startMy7DayFreeTrialBtn.click();
        await this.page.waitForURL(`${process.env.URL}${URL_END_POINTS.activateTrialEndPoint}`);
    }
}
