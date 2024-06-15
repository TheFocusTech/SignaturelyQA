import SideMenuComponent from "../../components/sideMenuComponent";
import TableComponent from "../../components/tableComponent";

export default class NewDocumentsPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.table = new TableComponent(this.page);       

    }
   

}