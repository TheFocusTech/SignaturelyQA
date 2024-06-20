export default class DowngradeToPersonalPlanModal {
    constructor(page) {
        this.page = page;
        
        this.downgradeToPersonalPlanButton = this.page.getByRole('button', {name: 'Downgrade'});
    }

    async clickDowngradeButton() {
        await this.downgradeToPersonalPlanButton.click();
    }
}
