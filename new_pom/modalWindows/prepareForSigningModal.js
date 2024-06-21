import ToastComponent from "../components/toastComponent.js";
import { clickCanvas } from "../../helpers/utils.js";
import TableComponent from "../components/tableComponent.js";

export default class PrepareForSigningModal {
    constructor(page) {
        this.page = page;
        this.excludedAreas = [];
        
        this.toast = new ToastComponent(this.page);
        this.table = new TableComponent(this.page);

        this.nameField = this.page.locator('div.interactModal__fieldBar li ').filter({ hasText: /^Name$/ }).first();
        this.signField = this.page.locator('ul.interactModal__fieldBar-fieldList li').nth(1);
        this.canvas = this.page.locator('canvas');
        this.createBtn = this.page.getByRole('button', { name: 'Create' });
        this.backToFormsBtn = this.page.getByRole('button', { name: 'Back to Forms' });
    }

    async doCanvasClicks() {
        await clickCanvas(this.page, this.canvas, this.excludedAreas);
    }

    async clickNameField() {
        await this.nameField.click();
    }

    async clickSignField() {
        await this.signField.click();
    }

    async clickCreateBtn() {
        await this.createBtn.click();
    }

    async clickBackToFormsBtn() {
        await this.backToFormsBtn.click();
    }
}    