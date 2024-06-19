import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemlatesComponent from "../../components/sideMenuTemplatesComponent";
import CreateNewTemplateComponent from "../../components/createNewTemplateComponent";





export default class NewTemplatesPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemlatesComponent(this.page);
        this.createNewTemplate = new CreateNewTemplateComponent(this.page);


    }

}