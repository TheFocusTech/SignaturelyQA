import SettingsHorizontalMenuComponent from "../../components/settingsHorizontalMenuComponent";
import SideMenuComponent from "../../components/sideMenuComponent";
import SideMenuSettingsComponent from "../../components/sideMenuSettingsComponent";
import ToastComponent from "../../components/toastComponent";
import { step } from "allure-js-commons";

export default class SettingsCompanyPage {
    constructor(page) {
        this.page = page;

        this.toast = new ToastComponent(this.page);
        this.horizontalMenu = new SettingsHorizontalMenuComponent(this.page);
        this.sideMenuSettings = new SideMenuSettingsComponent(this.page);
        this.sideMenu = new SideMenuComponent(this.page);

        this.inputFile = this.page.locator('input[type="file"]');
        this.companyName = this.page.getByPlaceholder('Company Name');
        this.emailClosingSignature = this.page.getByPlaceholder(
            'A brief closing signature for signature request emails.'
        );
        this.fromEmail = this.page.getByPlaceholder("From' Email Name");
        this.redirectionPage = this.page.getByPlaceholder('https://yourcompany.com');
        this.checkboxActivate = this.page.getByText('Activate custom redirection page');
        this.saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
        this.documentsCheckbox = this.page.locator('p').filter({ hasText: 'Documents' });
        this.templatesCheckbox = this.page.locator('p').filter({ hasText: 'Templates' });
        this.formsCheckbox = this.page.locator('p').filter({ hasText: 'Forms' });
        this.enable1Checkbox = this.page.getByText('Enable').nth(1);
        this.enable2Checkbox = this.page.getByText('Enable').nth(2);
        this.enable3Checkbox = this.page.getByText('Enable').nth(3);
    }

    async logoUpLoadFile(file) {
        await step('Upload File.', async () => {
            await this.inputFile.setInputFiles(file);
        });
    }

    async fillCompanyName(name) {
        await step('Fill in "Company Name" input field.', async () => {
            await this.companyName.fill(name);
        });
    }

    async fillFromEmail(email) {
        await step('Fill in "From Email Name" input field.', async () => {
            await this.fromEmail.fill(email);
        });
    }

    async fillEmailClosingSignature(email) {
        await step('Fill in "Email Closing Signature" input field.', async () => {
            await this.emailClosingSignature.fill(email);
        });
    }

    async fillRedirectionPage(url) {
        await step('Fill in "Redirection Page" input field.', async () => {
            await this.redirectionPage.fill(url);
        });
    }

    async checkActivateCheckbox() {
        await step('Check "Activate" checkbox.', async () => {
            await this.checkboxActivate.click();
        });
    }

    async clickSaveBtn() {
        await step('Click on "Save" button.', async () => {
            await this.saveBtn.click();
        });
    }

    async checkDocumentsCheckbox() {
        await step('Check "Documents" checkbox.', async () => {
            await this.documentsCheckbox.click();
        });
    }

    async checkTemplateCheckbox() {
        await step('Check "Templates" checkbox.', async () => {
            await this.templatesCheckbox.click();
        });
    }

    async checkFormsCheckbox() {
        await step('Check "Forms" checkbox.', async () => {
            await this.formsCheckbox.click();
        });
    }

    async checkEnable1Checkbox() {
        await step('Check "Enable" checkbox in "Independent Audit Trail".', async () => {
            await this.enable1Checkbox.click();
        });
    }

    async checkEnable2Checkbox() {
        await step('Check "Enable" checkbox in "Allow signers to download original document".', async () => {
            await this.enable2Checkbox.click();
        });
    }

    async checkEnable3Checkbox() {
        await step('Check "Enable" checkbox in "Independent Requests".', async () => {
            await this.enable3Checkbox.click();
        });
    }

    async reloadPage() {
        await step('Refresh page.', async () => {
            await this.page.reload();
            await this.page.waitForTimeout(1000);
        });
    }
}
