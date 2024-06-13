export default class SideMenu {
  constructor(page) {
    this.page = page;
    this.signMenu = this.page.getByRole('link', { name: 'Sign', exact: true });

  }
  async clickSignMenu() {
    await this.signMenu.click();
  }
}