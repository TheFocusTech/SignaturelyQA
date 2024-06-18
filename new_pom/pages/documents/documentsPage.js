import SideMenuComponent from "../../components/sideMenuComponent";
import TableComponent from "../../components/tableComponent";
import SideMenuDocumentsComponent from "../../components/sideMenuDocumentsComponent";

export default class NewDocumentsPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.table = new TableComponent(this.page); 
        this.sideMenuDocuments = new SideMenuDocumentsComponent(this.page);

        this.optionsBtn = this.page.getByText('Options');
        this.editAndResendBtn = this.page.getByText('Edit & Resend');
        this.editAndResendTitle = this.page.getByText('Edit & Resend document');
    }

    async clickOptionsBtn() {
        await this.optionsBtn.waitFor('visible');
        await this.optionsBtn.click();
    }

    async clickEditAndResendBtn() {
        await this.editAndResendBtn.click();
    }

}