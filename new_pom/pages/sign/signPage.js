import SideMenuComponent from '../../components/sideMenuComponent';
import UploadFileOnSignPage from '../../pages/sign/uploadFileOnSignPage';
import HeaderComponent from '../../components/headerComponent';
import { step } from "allure-js-commons";

export default class SignPage {
  constructor(page) {
    this.page = page;

        this.uploadFileTab = new UploadFileOnSignPage(this.page);
        this.sideMenu = new SideMenuComponent(this.page);
        this.header = new HeaderComponent(this.page);       
    }

    async signPageReload() {
        await this.page.reload();
        await this.page.waitForTimeout(1000);
    };
}
