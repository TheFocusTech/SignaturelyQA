import SettingsHorizontalMenuComponent from "../../components/settingsHorizontalMenuComponent";
import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";
import ToastComponent from "../../components/toastComponent";


export default class NewSettingsCompanyPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.horizontalMenu = new SettingsHorizontalMenuComponent(this.page);
        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);

        this.fileInput = this.page.locator('input[type = "file"]');
        this.companyName = this.page.getByPlaceholder('Company Name');
        this.emailClosingSignature = this.page.getByPlaceholder('A brief closing signature for signature request emails.');
        this.fromEmailName = this.page.getByPlaceholder("From' Email Name");
        this.redirectionPage = this.page.getByPlaceholder('https://yourcompany.com');
        this.checkboxActivate = this.page.getByText('Activate custom redirection page');
        this.toastPopup = this.page.locator('.Toastify__toast-body');
        this.saveBtn = this.page.getByRole('button', {name: 'Save', exact: true});
    }

    async logoUpLoadFile(file) {
        await this.fileInput.setInputFiles(file);
    }
    
    async fillCompanyName(email) {
        await this.companyName.fill(email);
    }

    async fillFromEmail(email) {
        await this.fromEmailName.fill(email);
    }

    async fillEmailClosingSignature(email) {
        await this.emailClosingSignature.fill(email);
    }

    async  fillRedirectionPage(url) {
        await this.redirectionPage.fill(url);
    }

    async checkActivateCheckbox() {
        await this.checkboxActivate.click();
    }

    async clickSaveBtn() {
        await this.saveBtn.click();
    }
};
