import SideMenuComponent from "../../components/sideMenuComponent";
<<<<<<< HEAD
import UploadFileOnSignPage from "../../components/fileUploderComponent";
import CreateNewTemplateComponent from "../../components/createNewTemplateComponent";
import SideMenuTemlatesComponent from "../../components/sideMenuTemplatesComponent";
import NewTemplatesPage from "../documents/templatesPage";


=======
import UploadFileOnSignPage from "../../pages/sign/uploadFileOnSignPage";
>>>>>>> b08616299cfce14675b82e8f231b03a37fe535df


export default class NewSignPage {
  constructor(page) {
    this.page = page;

    this.uploadFile = new UploadFileOnSignPage(this.page);
    this.sideMenu = new SideMenuComponent(this.page);
<<<<<<< HEAD
    this.formNewTemplate = new CreateNewTemplateComponent(this.page);
    this.sideMenuTemplates = new SideMenuTemlatesComponent(this.page);
    this.newTemplatesPage = new NewTemplatesPage(this.page);




=======
    
>>>>>>> b08616299cfce14675b82e8f231b03a37fe535df
  }

}