import SignPage from "./signPage";
import CreateNewSignatureModal from "./createNewSignatureModal";

class SettingsEditSignaturePage {
    constructor(page){
        this.page = page;
    }

    locators = {
      getCreateSignatureBtn: () => this.page.getByRole('button', {name: 'Create Signature'}),
      getCardSignatureLast: () => this.page.locator('.settingsSignature__item').last(),
      getBurgerMenuSignatureLast: () => this.page.locator('.settingsSignature__dropDown-trigger').last(),
      getDeleteDropItem: () => this.page.getByText('Delete', { exact: true }),
      getDeleteBtn: () => this.page.getByRole('button', {name: 'Delete'}),
      getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
      getToastCloseBtn: () => this.page.locator('[type="success"]').first(),
      getToast: () => this.page.locator('.Toastify__toast-body'),
      getSavedSignatureArea: () => this.page.getByText('Saved Signatures', { exact: true }),
    }

    async clickCreateSignatureBtn() {
      await this.locators.getCreateSignatureBtn().click();

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