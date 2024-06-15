import SideMenuComponent from "../../components/sideMenuComponent";
import UploadFileOnSignPage from "../../components/fileUploderComponent";
import PrepareForSignatureModal from "../../modalWindows/prepareForSignatureModal";

export default class NewSignPage {
  constructor(page) {
    this.page = page;
    
    this.UploadFileOnSignPage = new UploadFileOnSignPage(this.page);
    this.sideMenu = new SideMenuComponent(this.page);

  }

}