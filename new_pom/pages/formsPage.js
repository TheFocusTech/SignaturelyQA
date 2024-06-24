import TableComponent from "../components/tableComponent";
import ToastComponent from "../components/toastComponent";
export default class FormsPage {
    constructor(page) {
        this.page = page; 
        this.table = new TableComponent(this.page);
        this.toast = new ToastComponent(this.page);

        this.createFormBtn = this.page.locator('div').filter({ hasText: /^Create Form$/ }).getByRole('button');
        this.formsList = this.page.locator('div.table__dataRow');
    }

    clickCreateFormBtn() {
        this.createFormBtn.click();
    }
}