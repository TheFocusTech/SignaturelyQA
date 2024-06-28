import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemplatesComponent from "../../components/sideMenuTemplatesComponent";
import FileUploaderComponent from "../../components/fileUploaderComponent";
import CreateTemplateComponent from "../../components/createTemplateComponent";

export default class CreateNewTemplatePage {

    constructor(page) {
        this.page = page;
        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemplatesComponent(this.page);
        this.fileUploader = new FileUploaderComponent(this.page);
        this.createTemplate = new CreateTemplateComponent(this.page);
    }

}
