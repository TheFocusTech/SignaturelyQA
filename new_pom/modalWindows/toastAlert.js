export default class ToastAlert {
  constructor(page) {
    this.page = page;

    this.toast = this.page.locator("div[role='alert']+div");
  }

  async waitForToastVisible() {
    await this.toast.waitFor({ state: 'visible'});
  }
  
  async waitForToastHidden() {
    await this.toast.waitFor({ state: 'hidden' });
  }

}