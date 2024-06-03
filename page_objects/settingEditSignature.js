import SignPage from "./signPage";

class SettingEditSignature {
    constructor(page){
        this.page = page;
    }

    locators = {
      getBurgerMenuSignature: () => this.page.locator('.settingsSignature__dropDown-trigger').first(),
      getDeleteDropItem: () => this.page.locator('.settingsSignature__dropDown-item--delete'),
      getDeleteBtn: () => this.page.getByRole('button', {name: 'Delete'}),
      getSignSidebarLink: () => this.page.getByRole('link', { name: 'Sign', exact: true }),
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

}
export default SettingEditSignature;