import SettingsHorizontalMenuComponent from "../../components/settingsHorizontalMenuComponent";
import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";
import ToastComponent from "../../components/toastComponent";
import {test} from "../../../fixtures/base";

export default class NewSettingsCompanyPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);

        this.horizontalMenu = new SettingsHorizontalMenuComponent(this.page);
        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);
        this.sideMenu = new SideMenuComponent(this.page);

        this.inputFile = this.page.locator('input[type="file"]');
        this.companyName = this.page.getByPlaceholder('Company Name');
        this.emailClosingSignature = this.page.getByPlaceholder('A brief closing signature for signature request emails.');
        this.fromEmailName = this.page.getByPlaceholder("From' Email Name");
        this.redirectionPage = this.page.getByPlaceholder('https://yourcompany.com');
        this.checkboxActivate = this.page.getByText('Activate custom redirection page');
        this.saveBtn = this.page.getByRole('button', {name: 'Save', exact: true});
        this.toastPopup = this.page.locator('.Toastify__toast-body');
    }

    async logoUpLoadFile(file) {
        await test.step('Upload File', async () => {
            await this.inputFile.setInputFiles(file)
        });
    }

    async fillCompanyName(email) {
        await test.step('Fill company name field', async () => {
            await this.companyName.fill(email)
        });
    }

    async fillFromEmail(email) {
        await test.step('Fill  fromEmail field', async () => {
            await this.fromEmailName.fill(email)
        });
    }

    async fillEmailClosingSignature(email) {
        await test.step('Fill emailClosingSignature  field', async () => {
            await this.emailClosingSignature.fill(email)
        });
    }

    async  fillRedirectionPage(url) {
        await test.step('Fill redirectionPage field', async () => {
            await this.redirectionPage.fill(url)
        });
    }

    async checkActivateCheckbox() {
        await test.step('Check aktivate checkbox', async () => {
            await this.checkboxActivate.click()
        });
    }

    async clickSaveBtn() {
        await test.step('Click on Save btn', async () => {
            await this.saveBtn.click()
        });
    }
}
