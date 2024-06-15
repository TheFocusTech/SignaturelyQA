import SideMenuComponent from "../../components/sideMenuComponent";
import TableComponent from "../../components/tableComponent";
import DocumentsSideMenuComponent from "../../components/documentsSideMenuComponent";

export default class NewDocumentsPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.table = new TableComponent(this.page); 
        this.documentsSideMenu = new DocumentsSideMenuComponent(this.page);      

    }
   

}