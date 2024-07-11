import SideMenuComponent from '../../components/sideMenuComponent';
import UploadFileOnSignPage from '../../pages/sign/uploadFileOnSignPage';
import HeaderComponent from '../../components/headerComponent';
import BulkSendOnSignPage from './bulkSendOnSignPage';
import ChooseTemplateComponent from '../../components/chooseTemplateComponent';
import { step } from 'allure-js-commons'

export default class SignPage {
    constructor(page) {
        this.page = page;

        this.uploadFileTab = new UploadFileOnSignPage(this.page);
        this.sideMenu = new SideMenuComponent(this.page);
        this.header = new HeaderComponent(this.page);
        this.bulkSendTab = new BulkSendOnSignPage(this.page);

        this.bulkSendTabOnPanel = this.page.getByText('Bulk Send');
    }

    async clickBulkSendTab() {
        await step('Open the "Bulk Send" tab.', async () => {
            await this.bulkSendTabOnPanel.waitFor();
            await this.bulkSendTabOnPanel.click();
        });
    }

    async signPageReload() {
        await step('Refresh page', async () => {
            await this.page.reload();
            await this.page.waitForTimeout(1000);
        });       
    }
};
