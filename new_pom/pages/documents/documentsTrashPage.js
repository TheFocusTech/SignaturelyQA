import TableComponent from "../../components/tableComponent";
import SideMenuDocumentsComponent from "../../components/sideMenuDocumentsComponent";
import SideMenuComponent from "../../components/sideMenuComponent";
import { step } from "allure-js-commons";
import ToastComponent from "../../components/toastComponent";

export default class DocumentsTrashPage {

    constructor(page) {
        this.page = page;

        this.table = new TableComponent(this.page);
        this.sideMenuDocuments = new SideMenuDocumentsComponent(this.page);
        this.sideMenu = new SideMenuComponent(this.page);
        this.toast = new ToastComponent(this.page);
        this.emptyTrashBtn = this.page.getByRole('button', { name: 'Empty Trash' });
    }

    async clickEmptyTrashBtn() {
        await step('Click on "Empty Trash" button.', async () => {
            await this.emptyTrashBtn.waitFor();
            await this.emptyTrashBtn.click();
        });
    }
}