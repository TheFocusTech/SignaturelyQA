import SideMenuComponent from "../../components/sideMenuComponent";
import UploadFileOnSignPage from "../../components/fileUploderComponent";

export default class NewSignPage {
  constructor(page) {
    this.page = page;

    this.uploadFile = new UploadFileOnSignPage(this.page);
    this.sideMenu = new SideMenuComponent(this.page);

  }

}