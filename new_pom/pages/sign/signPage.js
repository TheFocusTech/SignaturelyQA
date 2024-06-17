import SideMenuComponent from "../../components/sideMenuComponent";
import UploadFileOnSignPage from "../../pages/sign/uploadFileOnSignPage";

export default class NewSignPage {
  constructor(page) {
    this.page = page;

    this.uploadFile = new UploadFileOnSignPage(this.page);
    this.sideMenu = new SideMenuComponent(this.page);

  }
}