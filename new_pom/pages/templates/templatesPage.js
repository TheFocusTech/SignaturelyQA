import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuTemlatesComponent from "../../components/sideMenuTemplatesComponent";
import NewCreateTemplatePage from "./createTemplatePage";

export default class TemplatesPage {
    constructor(page) {
        this.page = page;
        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemlatesComponent(this.page);
        this.createTemplate = new NewCreateTemplatePage(this.page);

    }

}