import TableComponent from "../../components/tableComponent";
import ToastComponent from "../../components/toastComponent";
import SideMenuComponent from "../../components/sideMenuComponent";
import { step } from "allure-js-commons";

export default class FormsPage {
    constructor(page) {
        this.page = page;
        this.table = new TableComponent(this.page);
        this.toast = new ToastComponent(this.page);
        this.sideMenu = new SideMenuComponent(this.page);

        this.createFormBtn = this.page.getByRole('button', { name: 'Create Form', exect: true }).first();
    }
    
    async clickCreateFormBtn() {
        await step('Click the "Create Form" button', async () => {
        await this.createFormBtn.click();
        });
    }
}