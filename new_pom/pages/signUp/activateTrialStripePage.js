import CardDetailsComponent from "../../components/cardDetailsComponent";
import {URL_END_POINTS} from "../../../testData";
import HeaderComponent from "../../components/headerComponent";
import {step} from "allure-js-commons";

export default class ActivateTrialStripePage {
    constructor(page) {
        this.page = page;
        
        this.cardDetails = new CardDetailsComponent(this.page);
        this.header = new HeaderComponent(this.page);

        this.startMy7DayFreeTrialBtn = this.page.getByRole('button', {name: "Start My 7-day Free Trial", exact: true});
    }

    async clickStartMy7DayFreeTrialBtn() {
        await step("Click the 'Start My 7-Day Free Trial' button.", async () => {
            await this.startMy7DayFreeTrialBtn.click();
            await this.page.waitForURL(`${process.env.URL}${URL_END_POINTS.activateTrialEndPoint}`);
        });
    }
}
