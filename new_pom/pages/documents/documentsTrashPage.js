import TableComponent from "../../components/tableComponent";
import SideMenuDocumentsComponent from "../../components/SideMenuDocumentsComponent";
import SideMenuComponent from "../../components/sideMenuComponent";

export default class NewDocumentsTrashPage {

    constructor(page) {
        this.page = page;

        this.table = new TableComponent(this.page);
        this.sideMenuDocuments = new SideMenuDocumentsComponent(this.page);
        this.sideMenu = new SideMenuComponent(this.page)
    }

}