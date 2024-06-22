import SideMenuComponent from "../../components/sideMenuComponent";
import TableComponent from "../../components/tableComponent";
import SideMenuDocumentsComponent from "../../components/sideMenuDocumentsComponent";


export default class NewDocumentsPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.table = new TableComponent(this.page); 
        this.sideMenuDocuments = new SideMenuDocumentsComponent(this.page);
    }

}