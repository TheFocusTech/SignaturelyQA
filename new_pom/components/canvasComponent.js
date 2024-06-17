import { clickCanvas } from "../../helpers/utils.js";

export default class CanvasComponent {
    constructor(page) {
        this.page = page;
        this.excludedAreas = [];

        this.canvas = this.page.locator('canvas');
        this.assignedToDropDown = this.page.locator('.uiSelect__select').nth(1);
        this.meNowDropDownItem = this.page.getByText('Me (Now)', { exact: true });
    }

    async doCanvasClicks() {
        await clickCanvas(this.page, this.canvas, this.excludedAreas);
    }

    async clickAssignedToDropDown() {
        await this.assignedToDropDown.click();
    }

    async clickMeNowDropDownItem() {
        await this.meNowDropDownItem.click();
    }

}