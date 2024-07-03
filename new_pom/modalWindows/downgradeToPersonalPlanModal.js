import {step} from "allure-js-commons";

export default class DowngradeToPersonalPlanModal {
    constructor(page) {
        this.page = page;
        
        this.downgradeToPersonalPlanButton = this.page.getByRole('button', {name: 'Downgrade'});
    }

    async clickDowngradeButton() {
        await step('Click on "Downgrade" To Personal Plan button', async () => {
            await this.downgradeToPersonalPlanButton.click();
        });
    }
}
