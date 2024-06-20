import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemlatesComponent from "../../components/sideMenuTemplatesComponent";
import NewCreateTemplatePage from "./createTemplatePage";

export default class NewTemplatesPage {
    constructor(page) {
        this.page = page;
        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemlatesComponent(this.page);
        this.createNewTemplate = new NewCreateTemplatePage(this.page);

    }

}