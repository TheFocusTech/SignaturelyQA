import SideMenuComponent from "../../components/sideMenuComponent";


import UploadFileOnSignPage from "../../components/fileUploderComponent";
import CreateNewTemplateComponent from "../../components/createNewTemplateComponent";
import SideMenuTemlatesComponent from "../../components/sideMenuTemplatesComponent";
import NewTemplatesPage from "../documents/templatesPage";



import UploadFileOnSignPage from "../../pages/sign/uploadFileOnSignPage";


// import UploadFileOnSignPage from "../../pages/sign/uploadFileOnSignPage";



export default class NewSignPage {
  constructor(page) {
    this.page = page;

    this.uploadFile = new UploadFileOnSignPage(this.page);
    this.sideMenu = new SideMenuComponent(this.page);


    this.formNewTemplate = new CreateNewTemplateComponent(this.page);
    this.sideMenuTemplates = new SideMenuTemlatesComponent(this.page);
    this.newTemplatesPage = new NewTemplatesPage(this.page);










  }

}