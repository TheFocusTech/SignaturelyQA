import SignPage from "./signPage";
import CreateNewSignatureModal from "./createNewSignatureModal";

class SettingsEditSignaturePage {
    constructor(page){
        this.page = page;
    }

    locators = {
      getCreateSignatureBtn: () => this.page.getByRole('button', {name: 'Create Signature'}),
      getFullNameInput: () => this.page.locator('div').filter({ hasText: /^Full Name \*$/ }).getByRole('textbox'),
      getInitialsInput:() => this.page.locator('div').filter({ hasText: /^Initials \*$/ }).getByRole('textbox'),
      getCheckboxAgree: () => this.page.getByRole('contentinfo').locator('div').nth(2),
      getCardSignatureLast: () => this.page.locator('.settingsSignature__item').last(),
      getBurgerMenuSignatureLast: () => this.page.locator('.settingsSignature__dropDown-trigger').last(),
      getDeleteDropItem: () => this.page.getByText('Delete', { exact: true }),
      getDeleteBtn: () => this.page.getByRole('button', {name: 'Delete'}),
      getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
      getToastCloseBtn: () => this.page.locator('[type="success"]').first(),
      getToast: () => this.page.locator('.Toastify__toast-body'),
    }

    async clickCreateSignatureBtn() {
      await this.locators.getCreateSignatureBtn().click();

      return this;
    }

    async fillFullNameInput(name) {
      await this.locators.getFullNameInput().fill(name);

      return this;
    }

    async fillInitialsInput(initials) {
      await this.locators.getInitialsInput().fill(initials);

      return this;
    }

    async clickCheckboxAgree() {
      await this.locators.getCheckboxAgree().click();

      return this;
    }

    async clickBurgerMenuSignature() {
      await this.locators.getBurgerMenuSignatureLast().click();

      return this;
    }

    async clickDeleteDropItem() {
      await this.locators.getDeleteDropItem().click();

      return this;
    }

    async clickButtonDelete() {
      await this.locators.getDeleteBtn().click();

      return this;
    }

    async clickSignSidebarLinkAndGoSignPage() {
      await this.locators.getSignSidebarLink().click();

      return new SignPage(this.page);
  }

  async clickToastCloseBtn() {
    await this.locators.getToastCloseBtn().click();

    return this;
  }

  async clickCreateSignatureAndGoCreateNewSignatureModal() {
    await this.locators.getCreateSignatureBtn().click();

    return new CreateNewSignatureModal(this.page);
  }
}
export default SettingsEditSignaturePage;