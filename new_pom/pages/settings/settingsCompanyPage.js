import SettingsHorizontalMenuComponent from "../../components/settingsHorizontalMenuComponent";
import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";
import ToastComponent from "../../components/toastComponent";

export default class NewSettingsCompanyPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.horizontalMenu = new SettingsHorizontalMenuComponent(this.page);
        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);
    }
}