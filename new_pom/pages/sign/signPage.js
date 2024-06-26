import SideMenuComponent from '../../components/sideMenuComponent';
import UploadFileOnSignPage from '../../pages/sign/uploadFileOnSignPage';
import HeaderComponent from '../../components/headerComponent';

export default class SignPage {
  constructor(page) {
    this.page = page;

        this.uploadFileTab = new UploadFileOnSignPage(this.page);
        this.sideMenu = new SideMenuComponent(this.page);
        this.header = new HeaderComponent(this.page);       
    }
}
