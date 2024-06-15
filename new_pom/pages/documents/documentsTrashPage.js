import TableComponent from "../../components/tableComponent";

export default class NewDocumentsTrashPage {

    constructor(page) {
        this.page = page;

        this.table = new TableComponent(this.page);
       
    }

}