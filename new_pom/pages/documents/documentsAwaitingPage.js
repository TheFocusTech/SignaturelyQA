import TableComponent from "../../components/tableComponent";
import ToastComponent from "../../components/toastComponent";

export default class NewDocumentsAwaitingPage {

  constructor(page) {
      this.page = page;

      this.table = new TableComponent(this.page);
      this.toast = new ToastComponent(this.page);


  }

}