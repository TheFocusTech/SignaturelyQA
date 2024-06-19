import SettingsHorizontalMenuComponent from "../../components/settingsHorizontalMenuComponent";
import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";

export default class NewSettingsCompanyPage {
    constructor(page) {
        this.page = page;

        this.horizontalMenu = new SettingsHorizontalMenuComponent(this.page);
        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);
    }
}