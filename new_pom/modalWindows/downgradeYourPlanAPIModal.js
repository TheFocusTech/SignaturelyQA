import { step } from "allure-js-commons";

export default class DownGradeYourPlanAPIModal {
    constructor(page) {
        this.page = page;

        this.downgradeBtn = this.page.getByRole('button', { name: 'Downgrade' })
        this.titleOfDowngradeModalWindow = this.page.locator('.downgradePlanModal__title')
    }

    async clickDowngradeBtn() {
        await step(`Click on "Downgrade" button to downgrade the API plan.`, async () => {
            await this.downgradeBtn.click();
        });
    }

    async getTitleOfDowngradeApiPlanModal(plan) {
        await step(`Generate title for downgrade modal for ${plan} plan.`, async () => {
            return `Downgrade to ${plan} Plan`;
        });
    }
    
}