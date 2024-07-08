import SideMenuComponent from '../../components/sideMenuComponent';
import TableComponent from '../../components/tableComponent';
import SideMenuDocumentsComponent from '../../components/sideMenuDocumentsComponent';
import ToastComponent from '../../components/toastComponent';
import { step } from 'allure-js-commons';
import { reloadPage, getRandomIndexInRange } from '../../../helpers/utils';

export default class DocumentsPage {
    constructor(page) {
        this.page = page;

        this.sideMenu = new SideMenuComponent(this.page);
        this.table = new TableComponent(this.page);
        this.sideMenuDocuments = new SideMenuDocumentsComponent(this.page);
        this.toast = new ToastComponent(this.page);
      
        this.selectOptionsBtn = this.page.getByText('Select options', {exact: true});
        this.selectOptionsDeleteBtn = this.page.getByText('Delete', {exact: true});   
        this.createFolderBtn = this.page.getByRole('button', { name: 'Create Folder' });
        this.numberOfDocuments = this.page.locator('p.tableControls__pagingCounter>span');
        this.documentsShown = this.page.locator('p.tableControls__pagingCounter');
        this.page2Btn = this.page.getByLabel('Page 2');
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

    async getRange() {
        return await step('Get the range of the number of displayed documents.', async () => {
            await this.documentsShown.waitFor();
            const text = await this.documentsShown.innerText();
            const rangeText = text.trim().replace(/\xA0/g, ' ').split(' ');
            const range = rangeText[0].split('-');
            return range;
        });
    }

    async getRandomIndexForShownDocuments() {
        return await step('Get a random index within the range.', async () => {
            const range = await this.getRange();
            const min = Number(range[0]);
            const max = Number(range[1]);
            const randomIndex1 = await getRandomIndexInRange(min, max);
            const randomIndex2 = await getRandomIndexInRange(min, max);
            return [randomIndex1, randomIndex2];
        });
    }

    async clickPage2Btn() {
        await step('Open page 2.', async () => {
            await this.page2Btn.click();
            await this.table.waitForTable(3000);
        });
    }

    async reloadPage() {
        await step('Refresh the page', async () => {
            await this.page.reload();
            await this.page.waitForTimeout(1000);
        });
    }
}
