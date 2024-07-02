import SideMenuComponent from "../../components/sideMenuComponent";
import TableComponent from "../../components/tableComponent";
import SideMenuDocumentsComponent from "../../components/sideMenuDocumentsComponent";
import ToastComponent from "../../components/toastComponent";
import { step } from "allure-js-commons";


export default class DocumentsPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.table = new TableComponent(this.page); 
        this.sideMenuDocuments = new SideMenuDocumentsComponent(this.page);
        this.toast = new ToastComponent(this.page);
                
        this.createFolderBtn = this.page.getByRole('button', { name: 'Create Folder' })
        this.selectOptionsBtn = this.page.getByText('Select options', {exact: true});
        this.selectOptionsDeleteBtn = this.page.getByText('Delete', {exact: true});
    }

    async clickCreateFolderBtn() {
        await step('Click the "Create Folder" button', async () => {
            await this.createFolderBtn.click();
        });
    }

    async clickSelectOptionsBtn() {
        await step('Click on the "Select options" button', async () => {
            await this.selectOptionsBtn.click();
        });
    }

    async clickSelectOptionsDeleteBtn() {
        await step('Click on the "Delete" tab in the Select options dropdown menu', async () => {
            await this.selectOptionsDeleteBtn.waitFor();
            await this.selectOptionsDeleteBtn.click();
        });
    }

}