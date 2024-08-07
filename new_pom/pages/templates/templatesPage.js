import SideMenuComponent from '../../components/sideMenuComponent';
import SideMenuTemplatesComponent from '../../components/sideMenuTemplatesComponent';
import TableComponent from '../../components/tableComponent';
import ToastComponent from '../../components/toastComponent';

export default class TemplatesPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.sideMenuTemplates = new SideMenuTemplatesComponent(this.page);
        this.table = new TableComponent(this.page);
        this.toast = new ToastComponent(this.page);
    }
}
