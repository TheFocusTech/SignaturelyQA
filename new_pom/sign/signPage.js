import SideMenu from "../base/sideMenuComponent";
import UploadFileTab from "./uploadFileTab";

export default class NewSignPage {
  constructor(page) {
    this.page = page;
    this.uploadFileTab = new UploadFileTab(this.page);
    this.sideMenu = new SideMenu(this.page);

  }

}