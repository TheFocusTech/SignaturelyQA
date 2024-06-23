import SideMenuComponent from "../../components/sideMenuComponent";
import TableComponent from "../../components/tableComponent";
import SideMenuDocumentsComponent from "../../components/sideMenuDocumentsComponent";
import MoveToFolderModal from "../../modalWindows/moveToFolderModal";
import ToastComponent from "../../components/toastComponent";
import CreateFolderModal from "../../modalWindows/createFolderModal";

export default class NewDocumentsPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.table = new TableComponent(this.page); 
        this.sideMenuDocuments = new SideMenuDocumentsComponent(this.page);
        this.moveToFolderModal = new MoveToFolderModal(this.page);
        this.toast = new ToastComponent(this.page);
        this.createFolderModal = new CreateFolderModal(this.page);
        
        this.createFolderBtn = this.page.getByRole('button', { name: 'Create Folder' });
    }

    async clickCreateFolderBtn() {
        await this.createFolderBtn.click();
    }
}