import SettingsHorizontalMenuComponent from "../../components/settingsHorizontalMenuComponent";
import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";

export default class NewSettingsCompanyPage {
    constructor(page) {
        this.page = page;

        this.horizontalMenu = new SettingsHorizontalMenuComponent(this.page);
        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);

        this.selectLogoUpLoadFile = this.page.locator('input[type="file"]');
        this.companyName = this.page.getByPlaceholder('Company Name');
        this.emailClosingSignature = this.page.getByPlaceholder('A brief closing signature for signature request emails.');
        this.fromEmailName = this.page.getByPlaceholder("From' Email Name");
        this.redirectionPage = this.page.getByPlaceholder('https://yourcompany.com');
        this.checkboxActivate = this.page.getByText('Activate custom redirection page');
        this.toastPopup = this.page.locator('.Toastify__toast-body');
        this.saveBtn = this.page.getByRole('button', {name: 'Save', exact: true});
    }

    async logoUpLoadFile(file) {
        await this.selectLogoUpLoadFile().setInputFiles(file);
    }

    async fillCompanyName() {
        await this.companyName().fill(COMPANY_INFO.companyName);
    }

    async fillFromEmail() {
        await this.fromEmailName().fill(COMPANY_INFO.emailFrom);
    }

    async fillEmailClosingSignatureField() {
        await this.emailClosingSignature().fill(COMPANY_INFO.emailTo);
    }

    async  fillRedirectionPage() {
        await this.redirectionPage().fill(COMPANY_INFO.redirectionPage);
    }

    async checkActivateCheckbox() {
        await this.checkboxActivate().click();
    }

    async clickSaveBtn() {
        await this.saveBtn().click();
    }
};
