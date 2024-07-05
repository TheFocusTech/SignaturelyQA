import SideMenuComponent from '../../components/sideMenuComponent';
import UploadFileOnSignPage from '../../pages/sign/uploadFileOnSignPage';
import HeaderComponent from '../../components/headerComponent';
import { step } from 'allure-js-commons'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class SignPage {
    constructor(page) {
        this.page = page;

        this.uploadFileTab = new UploadFileOnSignPage(this.page);
        this.sideMenu = new SideMenuComponent(this.page);
        this.header = new HeaderComponent(this.page);

        this.chooseTemplateField = this.page.locator("div.uiSelect__select-inner ");
        this.titleTemplate = this.page.locator('p.uiSelect__select-row');
        this.inputName = this.page.getByPlaceholder('Name');
        this.inputEmail = this.page.getByPlaceholder('Email');
        this.editTemplateBtn = this.page.getByRole('button', { name: 'Edit template' });

    }

    async clickChooseTemplateField() {
        await step('Click the "Choose a Template" field.', async () => {
            await this.chooseTemplateField.waitFor();
            await this.chooseTemplateField.hover();
            await delay(1000);
            await this.chooseTemplateField.click();
        });
    };

    async clickTitleTemplate() {
        await step('Click the "title template" row.', async () => {
            await this.titleTemplate.click();
        });
    };

    async fillSignerName(name, i) {
        await step("fill Signer's name in the field 'Name'", async () => {
            await this.inputName.nth(i).fill(name);
        });
    }

    async fillSignerEmail(email, i) {
        await step("fill Signer's email in the field 'Email' ", async () => {
            await this.inputEmail.nth(i).fill(email);
        });
    }

    async clickEditTemplateBtn() {
        await step("Click the button 'Edit Template'", async () => {
            await this.editTemplateBtn.click();
        });
    };
}
