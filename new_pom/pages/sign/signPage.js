import SideMenuComponent from '../../components/sideMenuComponent';
import UploadFileOnSignPage from '../../pages/sign/uploadFileOnSignPage';
import HeaderComponent from '../../components/headerComponent';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class SignPage {
    constructor(page) {
        this.page = page;

        this.uploadFileTab = new UploadFileOnSignPage(this.page);
        this.sideMenu = new SideMenuComponent(this.page);
        this.header = new HeaderComponent(this.page);

        this.chooseTemplateField = this.page.locator("p.uiSelect__select-placeholder");
        this.titleTemplate = this.page.locator('p.uiSelect__select-row');
        this.inputName = this.page.getByPlaceholder('Name');
        this.inputEmail = this.page.getByPlaceholder('Email');
        this.editTemplateBtn = this.page.getByRole('button', {name: 'Edit template'});

    }

    async clickChooseTemplateField() {
        await this.chooseTemplateField.hover();
        await delay(1000);
        await this.chooseTemplateField.click();

    };

    async clickTitleTemplate() {
        await this.titleTemplate.click();

    };

    async fillSignerName(name, i) {
        await this.inputName.nth(i).fill(name);

    }

    async fillSignerEmail(email, i) {
        await this.inputEmail.nth(i).fill(email);

    }

    async clickEditTemplateBtn() {
        await this.editTemplateBtn.click();

    };

}
