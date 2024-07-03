import SideMenuComponent from "../../components/sideMenuComponent";
import TableComponent from "../../components/tableComponent";
import SideMenuDocumentsComponent from "../../components/sideMenuDocumentsComponent";
import ToastComponent from "../../components/toastComponent";
import { step } from "allure-js-commons";
import { reloadPage, getRandomIndexInRange } from "../../../helpers/utils";

export default class DocumentsPage {
    constructor(page) {
        this.page = page;
        this.range = [];
        this.randomIndex1 = 1;
        this.randomIndex2 = 1;

        this.sideMenu = new SideMenuComponent(this.page);
        this.table = new TableComponent(this.page);
        this.sideMenuDocuments = new SideMenuDocumentsComponent(this.page);
        this.toast = new ToastComponent(this.page);

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

    async waitForDocumentsUpload() {
        await step('Wait for the upload of the created documents.', async () => {
            await this.page.waitForTimeout(10000);

            let number = "0";
            while(number === "0") {
                await reloadPage(this.page, 2000);
                await this.numberOfDocuments.waitFor({ state: 'visible' });
                number = await this.numberOfDocuments.innerText();
            }
        });
    }

    async getRange() {
        await step('Get the range of the number of displayed documents.', async() => {
            await this.documentsShown.waitFor();
            const text = await this.documentsShown.innerText();
            const rangeText =
                text
                    .trim()
                    .replace(/\xA0/g, ' ')
                    .split(" ");
            this.range = rangeText[0].split("-");
        });
    }

    async getRandomIndexForShownDocuments() {
        await step('Get a random index within the range.', async() => {
            await this.getRange();
            const min = Number(this.range[0]);
            const max = Number(this.range[1]);
            this.randomIndex1 = await getRandomIndexInRange(min, max);
            this.randomIndex2 = await getRandomIndexInRange(min, max);
        });
    }

    async clickPage2Btn() {
        await step('Open page 2.', async() => {
            await this.page2Btn.click();
            await this.table.waitForTable(3000);
        });
    }
}