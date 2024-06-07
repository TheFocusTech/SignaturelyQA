import SettingsBillingPage from "./settingsBillingPage";
import { COMPANY_INFO } from '../testData';
import SettingsAPIPage from "./settingsAPIPage";

class SettingsCompanyPage {
    constructor(page){
        this.page = page;
    }

    locators = {
        getSettingsBillingSidebarLink: () => this.page.getByRole('link', {name: 'Billing', exact: true}).first(),
        getSelectLogoUpLoadFile: () => this.page.locator('input[type="file"]'),
        getCompanyNameField: () => this.page.getByPlaceholder('Company Name'),
        getEmailClosingSignatureField: () => this.page.getByPlaceholder('A brief closing signature for signature request emails.'),
        getFromEmailNameField: () => this.page.getByPlaceholder("From' Email Name"),
        getRedirectionPageField: () => this.page.getByPlaceholder('https://yourcompany.com'),
        getCheckboxActivate: () => this.page.getByText('Activate custom redirection page'),
        getSaveBtn: () => this.page.getByRole('button', {name: 'Save', exact: true}),
        getToasterPopup: () => this.page.getByRole('alert'),
        getAPILink: () => this.page.getByRole('link', { name: 'API' }),
    }
   
    async clickSettingsBillingSidebarLinkAngGoSettingsBillingPage() {
        await this.locators.getSettingsBillingSidebarLink().click();

        return new SettingsBillingPage(this.page);
    }

    
    async LogoUpLoadFile(file) {
        await this.locators.getSelectLogoUpLoadFile().setInputFiles(file)

        return this;
    }

    async fillCompanyNameField() {
        await this.locators.getCompanyNameField().fill(COMPANY_INFO.companyName)

        return this;
    }

    async fillFromEmailField() {
        await this.locators.getFromEmailNameField().fill(COMPANY_INFO.emailFrom)
        
        return this;
    }

    async fillEmailClosingSignatureField() {
        await this.locators.getEmailClosingSignatureField().fill(COMPANY_INFO.emailTo)
        
        return this;
    }

    async  fillRedirectionPage() {
        await this.locators.getRedirectionPageField().fill(COMPANY_INFO.redirectionPage)

        return this;
    }

    async checkActivateCheckbox() {
        await this.locators.getCheckboxActivate().click()

        return this;
    }

    async clickSaveBtn() {
        await this.locators.getSaveBtn().click()
        
        return this;
    }

    async clickAPILinkAndGoAPIPage(){
        await this.locators.getAPILink().click();

        return new SettingsAPIPage(this.page);
    }
}
export default SettingsCompanyPage;