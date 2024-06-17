import SettingsHorizontalMenuComponent from "../../components/settingsHorizontalMenuComponent";

export default class NewSettingsCompanyPage {
    constructor(page) {
        this.page = page;

        this.horizontalMenu = new SettingsHorizontalMenuComponent(this.page);
    }
}