import SideMenuComponent from "../../components/sideMenuComponent";
import UploadFileOnSignPage from "./uploadFileOnSignPage";
import PrepareForSignatureModal from "../../modalWindows/prepareForSignatureModal";
import FinalStepModal from "../../modalWindows/finalStepModal";

export default class NewSignPage {
  constructor(page) {
    this.page = page;

    this.uploadFile = new UploadFileOnSignPage(this.page);
    this.sideMenu = new SideMenuComponent(this.page);
    this.prepareForSign = new PrepareForSignatureModal(this.page);
    this.finalStep = new FinalStepModal(this.page);
  }

}